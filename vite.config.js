import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import fs from 'fs';
import path from 'path';

const MUSIC_DIR = path.resolve('public/music');

function getSortedFiles(dirPath, regexFilter) {
  if (!fs.existsSync(dirPath)) return [];
  try {
    return fs.readdirSync(dirPath)
      .map(name => {
        const fullPath = path.join(dirPath, name);
        const stat = fs.statSync(fullPath);
        return { name, fullPath, mtime: stat.mtimeMs, isFile: stat.isFile() };
      })
      .filter(item => item.isFile && (!regexFilter || regexFilter.test(item.name)))
      .sort((a, b) => b.mtime - a.mtime)
      .map(item => item.name);
  } catch (e) {
    return [];
  }
}

function scanMusicDirectory() {
  if (!fs.existsSync(MUSIC_DIR)) {
    fs.mkdirSync(MUSIC_DIR, { recursive: true });
  }

  const songsJsonPath = path.join(MUSIC_DIR, 'songs.json');
  let songs = [];
  if (fs.existsSync(songsJsonPath)) {
    try {
      songs = JSON.parse(fs.readFileSync(songsJsonPath, 'utf-8'));
    } catch (e) {
      songs = [];
    }
  }

  const dirs = fs.readdirSync(MUSIC_DIR, { withFileTypes: true })
    .filter(dirent => dirent.isDirectory())
    .map(dirent => dirent.name);

  const scannedSongs = [];

  for (const songTitle of dirs) {
    const songPath = path.join(MUSIC_DIR, songTitle);
    
    // 1. Read lyrics
    let lyrics = '';
    const lyricsPath = path.join(songPath, 'letra.txt');
    if (fs.existsSync(lyricsPath)) {
      lyrics = fs.readFileSync(lyricsPath, 'utf-8');
    }

    // 2. Scan covers in CAPA/
    const capaPath = path.join(songPath, 'CAPA');
    const covers = getSortedFiles(capaPath, /\.(jpe?g|png|webp|gif)$/i)
      .map(f => `/music/${songTitle}/CAPA/${f}`);

    // 3. Scan encartes in ENCARTE/
    const encartePath = path.join(songPath, 'ENCARTE');
    const encartes = getSortedFiles(encartePath, /\.(jpe?g|png|webp|pdf)$/i)
      .map(f => `/music/${songTitle}/ENCARTE/${f}`);

    // 4. Scan photos in FOTOS/
    const fotosPath = path.join(songPath, 'FOTOS');
    const photos = getSortedFiles(fotosPath, /\.(jpe?g|png|webp|gif)$/i)
      .map(f => `/music/${songTitle}/FOTOS/${f}`);

    // 5. Scan sheet music in PARTITURA/
    const partituraPath = path.join(songPath, 'PARTITURA');
    const sheetMusic = getSortedFiles(partituraPath, /\.(pdf|jpe?g|png|webp)$/i)
      .map(f => `/music/${songTitle}/PARTITURA/${f}`);

    // 6. Find all audio versions in MUSICA/
    const musicaPath = path.join(songPath, 'MUSICA');
    const audioVersions = getSortedFiles(musicaPath, /\.(mp3|wav|mpeg|m4a|ogg)$/i)
      .map(f => ({
        name: f,
        file: `/music/${songTitle}/MUSICA/${f}`
      }));
    const mainFile = audioVersions[0]?.file || '';

    // 7. Find styles in ESTILOS/
    const styles = [];
    const estilosPath = path.join(songPath, 'ESTILOS');
    if (fs.existsSync(estilosPath)) {
      const styleDirs = fs.readdirSync(estilosPath, { withFileTypes: true })
        .filter(dirent => dirent.isDirectory())
        .map(dirent => dirent.name);

      for (const styleName of styleDirs) {
        const stylePath = path.join(estilosPath, styleName);
        const styleAudios = getSortedFiles(stylePath, /\.(mp3|wav|mpeg|m4a|ogg)$/i);
        
        if (styleAudios.length > 0) {
          const audioFile = styleAudios[0];
          
          // Look for style-specific sheet music in stylePath/PARTITURA/ or stylePath/
          let styleSheetMusic = getSortedFiles(path.join(stylePath, 'PARTITURA'), /\.(pdf|jpe?g|png|webp)$/i)
            .map(f => `/music/${songTitle}/ESTILOS/${styleName}/PARTITURA/${f}`);
          if (styleSheetMusic.length === 0) {
            styleSheetMusic = getSortedFiles(stylePath, /\.(pdf|jpe?g|png|webp)$/i)
              .map(f => `/music/${songTitle}/ESTILOS/${styleName}/${f}`);
          }
          
          styles.push({
            name: styleName,
            file: `/music/${songTitle}/ESTILOS/${styleName}/${audioFile}`,
            sheetMusic: styleSheetMusic
          });
        }
      }
    }

    // Try to find if this song already exists in songs.json to preserve metadata
    const existingSong = songs.find(s => s.title.toLowerCase() === songTitle.toLowerCase());
    
    scannedSongs.push({
      title: songTitle,
      tag: existingSong?.tag || 'Faixa Autoral',
      mood: existingSong?.mood || 'Romântico e dançante',
      bpm: existingSong?.bpm || 120,
      duration: existingSong?.duration || '3:00',
      lyrics: lyrics || existingSong?.lyrics || '',
      chords: existingSong?.chords || '',
      concept: existingSong?.concept || '',
      composer: existingSong?.composer || (songTitle.toLowerCase() === 'opcao dois' ? 'Hosana Maria Elias dos Santos' : ''),
      mainFile: mainFile,
      audioVersions: audioVersions,
      covers: covers,
      encartes: encartes,
      photos: photos,
      sheetMusic: sheetMusic,
      styles: styles
    });
  }

  fs.writeFileSync(songsJsonPath, JSON.stringify(scannedSongs, null, 2), 'utf-8');
  return scannedSongs;
}

// Scan on startup/build
try {
  scanMusicDirectory();
} catch (e) {
  console.error("Failed to scan music directory on startup/build:", e);
}

export default defineConfig({
  plugins: [
    react(),
    {
      name: 'music-api-middleware',
      configureServer(server) {
        server.middlewares.use(async (req, res, next) => {
          const url = new URL(req.url, 'http://localhost');
          
          if (url.pathname === '/api/songs') {
            res.setHeader('Content-Type', 'application/json');
            
            try {
              if (req.method === 'GET') {
                const songs = scanMusicDirectory();
                res.writeHead(200);
                res.end(JSON.stringify(songs));
                return;
              }
              
              if (req.method === 'DELETE') {
                const titleToDelete = url.searchParams.get('title');
                if (!titleToDelete) {
                  res.writeHead(400);
                  res.end(JSON.stringify({ error: 'Missing title parameter' }));
                  return;
                }
                
                const targetDir = path.join(MUSIC_DIR, titleToDelete);
                if (fs.existsSync(targetDir)) {
                  fs.rmSync(targetDir, { recursive: true, force: true });
                }
                
                const songs = scanMusicDirectory();
                res.writeHead(200);
                res.end(JSON.stringify(songs));
                return;
              }
            } catch (err) {
              res.writeHead(500);
              res.end(JSON.stringify({ error: err.message }));
              return;
            }
          }
          
          if (url.pathname === '/api/upload' && req.method === 'POST') {
            res.setHeader('Content-Type', 'application/json');
            
            try {
              // Read raw request body chunks
              const chunks = [];
              for await (const chunk of req) {
                chunks.push(chunk);
              }
              const buffer = Buffer.concat(chunks);
              
              // Map headers for Request
              const headers = new Headers();
              for (const [key, value] of Object.entries(req.headers)) {
                if (Array.isArray(value)) {
                  for (const v of value) headers.append(key, v);
                } else if (value !== undefined) {
                  headers.append(key, value);
                }
              }
              
              // Create Web API Request
              const webReq = new Request(`http://localhost${req.url}`, {
                method: 'POST',
                headers,
                body: buffer
              });
              
              const formData = await webReq.formData();
              
              const title = formData.get('title')?.toString().trim();
              if (!title) {
                res.writeHead(400);
                res.end(JSON.stringify({ error: 'Title is required' }));
                return;
              }
              
              const tag = formData.get('tag')?.toString().trim() || 'Faixa Autoral';
              const mood = formData.get('mood')?.toString().trim() || 'Romântico e dançante';
              const bpm = parseInt(formData.get('bpm')?.toString() || '120', 10);
              const duration = formData.get('duration')?.toString().trim() || '3:00';
              const lyrics = formData.get('lyrics')?.toString().trim() || '';
              const chords = formData.get('chords')?.toString().trim() || '';
              const concept = formData.get('concept')?.toString().trim() || '';
              
              const songFolder = path.join(MUSIC_DIR, title);
              fs.mkdirSync(songFolder, { recursive: true });
              
              // Save lyrics to letra.txt
              fs.writeFileSync(path.join(songFolder, 'letra.txt'), lyrics, 'utf-8');
              
              // Handle main file upload
              const mainFile = formData.get('mainFile');
              if (mainFile && mainFile instanceof File && mainFile.size > 0) {
                const musicaFolder = path.join(songFolder, 'MUSICA');
                fs.mkdirSync(musicaFolder, { recursive: true });
                
                const mainFileBuffer = Buffer.from(await mainFile.arrayBuffer());
                fs.writeFileSync(path.join(musicaFolder, mainFile.name), mainFileBuffer);
              }
              
              // Handle styles upload
              let i = 0;
              while (true) {
                const styleName = formData.get(`style_name_${i}`)?.toString().trim();
                const styleFile = formData.get(`style_file_${i}`);
                
                if (!styleName && !styleFile) {
                  // No more styles passed
                  break;
                }
                
                if (styleName && styleFile && styleFile instanceof File && styleFile.size > 0) {
                  const styleFolder = path.join(songFolder, 'ESTILOS', styleName.toUpperCase());
                  fs.mkdirSync(styleFolder, { recursive: true });
                  
                  const styleFileBuffer = Buffer.from(await styleFile.arrayBuffer());
                  fs.writeFileSync(path.join(styleFolder, styleFile.name), styleFileBuffer);
                }
                
                i++;
              }
              
              // We also want to seed/update songs.json metadata BEFORE scanning
              const songsJsonPath = path.join(MUSIC_DIR, 'songs.json');
              let songs = [];
              if (fs.existsSync(songsJsonPath)) {
                try {
                  songs = JSON.parse(fs.readFileSync(songsJsonPath, 'utf-8'));
                } catch (e) {
                  songs = [];
                }
              }
              
              const songIdx = songs.findIndex(s => s.title.toLowerCase() === title.toLowerCase());
              const updatedSongMeta = {
                title,
                tag,
                mood,
                bpm,
                duration,
                lyrics,
                chords,
                concept
              };
              
              if (songIdx >= 0) {
                songs[songIdx] = { ...songs[songIdx], ...updatedSongMeta };
              } else {
                songs.push(updatedSongMeta);
              }
              fs.writeFileSync(songsJsonPath, JSON.stringify(songs, null, 2), 'utf-8');
              
              // Now trigger the full scan to sync physical file paths correctly
              const scannedSongs = scanMusicDirectory();
              
              res.writeHead(200);
              res.end(JSON.stringify(scannedSongs));
              return;
            } catch (err) {
              res.writeHead(500);
              res.end(JSON.stringify({ error: err.message }));
              return;
            }
          }
          
          next();
        });
      }
    }
  ],
});

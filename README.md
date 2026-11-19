# V-Recap — Movie Recap Tool

React 18 + TypeScript + Vite + Tailwind. Movie recap studio: upload .mp4/.srt, preview 9:16 / 16:9, mute/BGM/voiceover, subtitle blur, Myanmar hard-sub preview, AssemblyAI STT → SRT, OpenRouter recap translation, Myanmar TTS sync preview, FFmpeg export.

## Run

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # tsc + vite build -> dist/
```

## Vite note

Vite needs a root `index.html` as its entry point, so this repo has one at the project root (pointing at `/src/index.tsx`) **and** the `public/index.html` from the requested tree (same content, copied to `dist/` as a static file). `vite.config.ts` is the only extra top-level file beyond the requested tree.

## API keys — bring your own

Enter keys in **Get Started**. They are stored in browser `localStorage` only (`vrecap.apiKeys`) and sent per-request to the provider. Never commit real keys: `.env` / `.env.example` contain placeholders only, and `.env` is git-ignored.

- AssemblyAI — speech-to-text with timestamps → SRT (`HH:MM:SS,mmm`)
- OpenRouter — recap translation (default `openai/gpt-4o-mini`, `:free` models available, e.g. `google/gemma-3-27b-it:free`)
- Gemini / Groq / Claude — typed clients in `src/services/api/`
- ElevenLabs — TTS audio file (device SpeechSynthesis is used for the in-app sync preview)

## Honest limits

- **No in-app final video render.** The app previews mute, blur, captions, BGM and speed live, and generates the exact FFmpeg command + `render-recap.sh` for the real render on your computer (FFmpeg must be installed).
- **TTS:** in-app preview uses the device voice; ElevenLabs returns a downloadable audio file when you supply a key. No Edge-TTS/Azure audio file is generated in-app.
- **Video files:** ~120 MB cap in the browser flow (under 100 MB recommended); no transcoding in-browser.
- **Android APK / Vercel:** not produced by this repo alone. Deploy the built `dist/` to Vercel (`vercel --prod`) or wrap the deployed URL in a WebView for an APK.

## Docker

```bash
docker compose -f docker/docker-compose.yml up --build
# http://localhost:8080
```

## Structure

See the tree in the project root — `src/components/{Common,Video,Subtitles,Dashboard,Output}`, `src/pages/`, `src/services/{api,ffmpeg,permissions}`, `src/hooks/`, `src/contexts/`, `src/types/`, `src/utils/`.

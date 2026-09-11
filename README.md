# FreeSubtitless

App de subtitulos hecha en Grok Build.

El preview `*.grok-sandbox.com` se apaga. Este repo es el codigo. Para tenerla siempre lista hay que publicarla en Vercel.

## Publicar (5 minutos)

1. Entra a https://vercel.com e inicia sesion con GitHub (`Galleton34`).
2. Add New Project → selecciona `freesubtitless`.
3. Framework: Vite (o lo que detecte).
4. Environment Variables:
   - `XAI_API_KEY` = tu key de xAI (sin esto abre la web pero no transcribe).
5. Deploy.

Te va a dar un URL tipo `https://freesubtitless.vercel.app`.
Ese si se puede poner de acceso directo en el escritorio y no se muere al cerrar Grok.

## Nota

GitHub Pages no alcanza: esta app tiene `/api/transcribe` (servidor + API de xAI).

# Running Cheeta Jewels in Antigrav

Open the project root in Antigrav IDE, unpack the companion offline media archive into that project root, and use its integrated terminal:

```bash
pnpm install
pnpm dev
```

Visit the local URL shown by Vite, usually `http://localhost:3000`. The site’s generated media is referenced through `/manus-storage/...`. For a fully offline run, create a `.env.local` file in the project root after extracting the archive:

```bash
CHEETA_LOCAL_MEDIA_DIR=./cheeta-jewels-offline-media/manus-storage
CHEETA_OFFLINE=1
```

The local Vite server will then serve every image, video, audio track, and bundled font from the extracted folder. No hosted fallback is used while `CHEETA_OFFLINE=1` is set.

If you choose not to unpack the offline archive and instead want the hosted media fallback, create a `.env.local` file in the project root and set the current hosted origin:

```bash
CHEETA_ASSET_ORIGIN=https://your-current-project-preview-domain
```

Restart `pnpm dev` after changing `.env.local`. For a production build check, run:

```bash
pnpm check
pnpm build
```

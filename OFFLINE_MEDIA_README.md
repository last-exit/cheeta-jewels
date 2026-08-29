# Cheeta Jewels Offline Media Package

Extract `cheeta-jewels-offline-media.zip` directly into the root of the Cheeta Jewels project. It creates a `cheeta-jewels-offline-media/manus-storage/` folder with the same path layout already used by the application.

Create a project-root `.env.local` file with the following values before starting the local server:

```bash
CHEETA_LOCAL_MEDIA_DIR=./cheeta-jewels-offline-media/manus-storage
CHEETA_OFFLINE=1
```

Run `pnpm install` once, then run `pnpm dev`. The opening film, CJ monogram, collection imagery, ambient audio, and locally bundled typography will resolve without internet access. `CHEETA_OFFLINE=1` makes missing local assets fail loudly instead of silently falling back to hosted media.

The archive contains only assets needed by the current site. When new media is added, create a refreshed package before moving development to an offline machine.

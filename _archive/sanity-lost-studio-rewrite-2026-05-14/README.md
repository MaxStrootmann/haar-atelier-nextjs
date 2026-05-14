# Archived Sanity Schema Rewrite Attempt

Archived on 2026-05-14 during the Payload migration branch work.

This directory is **not** the original Sanity Studio schema for the live Haar Atelier dataset. It was a later rewrite attempt after the original Studio source was lost.

Do not use these files as the source of truth for Payload modeling. Infer the real model from:

- live/exported Sanity data,
- production GROQ queries in `src/lib/sanity/queries/*`,
- inline GROQ usage in pages and contexts,
- current deployed UI behavior.

The current Vercel deployment remains production until the Payload migration is validated and explicitly cut over.

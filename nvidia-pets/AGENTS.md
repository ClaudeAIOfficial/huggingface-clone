# Four-agent runtime

The NVIDIA Pets demo runs four independent browser agents at once. Each agent is a small state machine with personality-specific dialogue.

## Agent lifecycle

Each pet has:
- An independent `id`, species and personality profile.
- Separate `x/y` position and destination.
- A movement speed.
- Mood and needs: `energy`, `happiness`.
- Action state: `following`, `playing`, `napping`.
- Its own browser-local chat transcript and optionally remembered human name.

The scene updates from `requestAnimationFrame` with frame-time integration. Roaming targets are chosen independently, with drift constrained to the garden boundaries. Direct manipulation with pointer events temporarily overrides roaming.

## Chat behavior

The starter chat is a *simulation*. It selects per-agent answers using keyword-based intent matching and personality templates. User names and dialogue histories are stored separately in localStorage; there is no remote inference in this version.

For a real language model integration:
1. Add a serverless `/api/pets/chat` endpoint.
2. Use server-side secrets, not client-side keys.
3. Send the active agent's system profile and that pet's conversation history.
4. Use bounded context windows and provider rate limits.
5. Replace the simulated response function only after the endpoint returns successfully.
6. Surface model failures clearly; never fabricate backend responses.

## Asset loading

Transparent WEBP sprites were prepared from the four rendered animal images. The demo animates these images in 2D screen space. They are not rigged GLB meshes. For true 3D navigation, replace the sprite renderer with a scene graph and compatible animated models.

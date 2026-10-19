---
title: NVIDIA Pets
emoji: 🐾
colorFrom: green
colorTo: blue
sdk: static
app_file: ../nvidia-pets.html
tags:
  - digital-pets
  - multi-agent
  - simulation
  - virtual-companions
  - 3d-characters
license: mit
---

# NVIDIA Pets

**Four personalities. One shared desktop.**

NVIDIA Pets is a browser-based digital companion collection with four independent pet personalities: Pip the penguin, Ollie the otter, Cappy the capybara, and Rumi the red panda. The pets wander around a shared scene, respond when selected, and remember their own conversations locally.

**[Launch the interactive demo](../nvidia-pets.html)** · [Source code](https://github.com/ClaudeAIOfficial/huggingface-clone/tree/main/nvidia-pets)

## Meet the companions

| Companion | Species | Personality | Typical activity |
| --- | --- | --- | --- |
| Pip | Penguin | Curious, cautious, imaginative | Explores, waddles, asks questions |
| Ollie | Otter | Playful, energetic, cheeky | Runs, plays, collects imaginary treasures |
| Cappy | Capybara | Calm, friendly, reflective | Takes short strolls and naps |
| Rumi | Red Panda | Clever, mischievous, opinionated | Wanders, teases, starts little adventures |

Each agent has its own movement speed, greeting, dialogue rules, energy level, happiness, activity state and chat history. Pets continue acting independently while you interact with another one.

## Release features

- **Autonomous roaming:** Four separate movement controllers choose independent destinations, then interpolate toward them with velocity scaled by elapsed frame time.
- **Drag and place:** Pointer capture lets you move each companion to another spot on the stage.
- **Separate conversations:** Each personality has its own transcript and simple browser-local memory.
- **Interactions:** Feed, Play, Nap and Follow actions affect the pet's state and movement.
- **Responsive playground:** All four companions appear simultaneously on desktop and mobile browsers.
- **Character assets:** Optimized transparent 3D-style animal renders for use as web sprites.

## Using the demo

1. Open `nvidia-pets.html` and choose **Live demo**.
2. Click a pet in the scene or select its name from the chat tabs.
3. Type a message; each pet responds in its own voice.
4. Tell a pet `My name is Alex`, then ask `Do you remember my name?`
5. Move pets around with a mouse or touch input. Use **Follow** to let one follow the cursor.
6. Try Feed, Play and Nap, then switch to another companion.

## Architecture

```
nvidia-pets.html             Repository page and live playground
nvidia-pets/
  README.md                  Release notes and usage
  AGENTS.md                  Companion agent architecture
  pets.json                  Declarative pet roster
  site.css                   Responsive UI + motion layers
  site.js                    Four independent behavior agents
  assets/
    penguin.webp             Transparent pet sprite
    otter.webp
    capybara.webp
    red-panda.webp
```

Each instance maintains its own `x/y` position, autonomous target, energy, happiness, follow state, sleep timer, and messaging context. The runtime uses `requestAnimationFrame` to advance all pet states and `localStorage` to preserve chat history on the current device.

## AI and model status

The current chat is a **local personality simulation with deterministic dialogue rules**, not a foundation model or a separately trained NVIDIA language model. It does not require API tokens. This repository contains the browser agent architecture and an upgrade path to real hosted inference. Adding a model provider requires a backend or carefully scoped API integration.

The illustrated animals are optimized rendered sprites rather than downloadable rigged 3D mesh assets. Future work can add GLB/VRM character rigs, animation states, voice synthesis, desktop overlays, and server-backed persistent memories.

## Roadmap

- Proper skeletal animation and state-based walk, idle, and sleep cycles.
- Optional LLM backend per companion with tool and personality prompts.
- Voice chat and turn-taking.
- Persistent pet homes, needs, custom cosmetics and habits.
- Interactive pet-to-pet conversations and cooperative actions.
- Desktop companion / always-on-top widget builds.

## License and attribution

Software in this repository: MIT for original project code. The project uses independent character artwork. NVIDIA Pets is an independently developed digital-pet project, not an NVIDIA product or announcement, and NVIDIA has not endorsed it. Third-party branding remains the property of its owners.

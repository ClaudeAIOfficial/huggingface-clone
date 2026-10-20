---
title: NVIDIA Pets
emoji: 🐾
colorFrom: green
colorTo: gray
sdk: static
app_file: ../nvidia-pets.html
tags:
  - robotics
  - robot-companions
  - industrial-design
  - embodied-ai
  - product-concepts
license: mit
---

# NVIDIA Pets

**Animal-inspired robots, designed for the real world.**

NVIDIA Pets explores a new family of small physical robot companions. The collection currently includes a robotic penguin and a robotic turtle. Both designs use off-white protective shells, orange highlights, camera-like eyes and visible mechanical joints.

[View the product design page](../nvidia-pets.html) · [Read the accompanying design report](../papers/nvidia-pets.html)

## Companion lineup

| Concept | Body | Design features | Proposed movement |
| --- | --- | --- | --- |
| Robotic Penguin | Upright, two-legged | Optical face, orange beak, articulated flippers, low-profile feet | Controlled waddle, head turns and gestures |
| Robotic Turtle | Four-legged, low center of gravity | Segmented white shell, articulated neck, optical eye and sturdy feet | Slow crawling and head tilts |

## Product direction

NVIDIA Pets is designed around the idea of robotic companions that inhabit the same physical spaces as people, rather than software pets roaming around a computer screen. Intended capabilities for future engineering prototypes include expressive movement, vision and proximity sensing, speech interaction, personality-based responses and user-controlled memory.

## Current status

The robot designs and demonstration video are CGI. Physical production units, tested hardware, mechanical specifications, batteries, autonomy benchmarks, voice assistants, and launch dates have **not** been established. This project is an independent robotics-inspired concept, not an official NVIDIA hardware release.

An earlier experimental browser animation demonstrated independent on-screen characters and rule-based chat. That experiment is no longer featured in the product website. The current direction is physical robot design.

## Proposed engineering workflow

1. Refine the two industrial designs and mechanical dimensions.
2. Produce CAD, joints and kinematic designs for each body type.
3. Prototype controlled locomotion using appropriate motors and electronics.
4. Add onboard sensors and safe local control.
5. Test stability, obstacle avoidance and human-safe interactions.
6. Prototype optional AI-assisted speech and behavioral systems.
7. Publish measured results only after actual testing.

## Repository contents

- `robot-repo.css` and `robot-repo.js`: physical robot concept website styling and navigation.
- `assets/robot-penguin.webp` and `assets/robot-turtle.webp`: concept renders.
- `pets.json`: two-robot design manifest.
- `AGENTS.md`: proposed robotics software and hardware architecture.
- `../papers/nvidia-pets.html`: accompanying design report and embedded video.

The older web-only prototype files remain in Git history for reference, but they do not form part of the current product presentation.

## Attribution and licensing

Original project code is under MIT. The images are concept artwork. NVIDIA Pets is an independently developed design exploration and is not an NVIDIA-manufactured, verified, or endorsed product.

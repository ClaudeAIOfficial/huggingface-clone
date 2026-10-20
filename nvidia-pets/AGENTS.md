# Proposed Robot Companion Architecture

## Status

This document describes prospective hardware and software design goals for the NVIDIA Pets physical robot companion project. It does not document an implemented robotic hardware platform or a trained autonomous AI system.

## Robot bodies

**Penguin:** Upright bipedal design with two feet, expressive optical face, limited-rotation flippers and compact neck assembly. Candidate movements include stable short steps, head turns and flipper gestures.

**Turtle:** Four-legged quadrupedal design with a segmented protective upper shell, four large contact feet and a mobile head or neck assembly. Candidate movements include low-speed stable crawling, small pivots and head tilts.

## Proposed embedded architecture

- Motion control loop with actuator torque and range limits
- Short-range perception through suitable cameras and proximity sensors
- Human input via buttons, gesture detection and optional microphones
- Behavior layer for safe idle, follow, approach, retreat and rest states
- Optional language-model interface gated by physical safety constraints
- Device-level authentication and opt-in settings for any persistent memories
- Battery, charge and temperature management

## Safety requirements before physical demonstrations

Test a physical prototype for balance, stability, falls, collision forces, joint pinch hazards, audible noise, heat, charging safety, motor longevity and obstacle avoidance. No feature should be described as working until validated in actual hardware.

## Demonstration media

The NVIDIA Pets video is CGI and depicts plausible design direction, not empirical evidence of physical actuation or autonomous movement.

## Project files

- `README.md`: design overview
- `pets.json`: current penguin and turtle concepts
- `robot-repo.css`, `robot-repo.js`: presentation layer
- `assets/robot-penguin.webp`, `assets/robot-turtle.webp`: robot renders

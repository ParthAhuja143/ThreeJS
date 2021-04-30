# Three.js Journey

## Setup

Download [Node.js](https://nodejs.org/en/download/).
Run this followed commands:

```bash
# Install dependencies (only the first time)
npm install

# Run the local server at localhost:8080
npm run dev

# Build for production in the dist/ directory
npm run build
```

# CAMERA

It is an abstract class.

## Array Camera

Used to render a scene from multiple cameras on specific areas of the render

## Stereo Camera

Renders through two cameras mimicing eyes and create a parallax effect(Used for VR Experiences)

## Cube Camera

This does 6 renders .. each one facing in different dirrections

## Orthographic Camera

Used to render the scene without percpective

## Perspective Camera

Used to render the scene with perspective

# Controls

Changes the orientation of camera .. without the help of position and rendering

1. Fly Control

2. Device Orientation Control

3. First Person Control

4. Pointer Lock Control

5. Orbit Control

6. TrackBall Control

7. Transform Control

8. Drag Control

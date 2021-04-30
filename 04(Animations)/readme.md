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

# Animation

Animation is like doing stop motion ->

- First move the object
- Take a picture
- Move the object more
- Take a picture
- Repeat

Most screens can run at 60 frames per second, but ot always.

Your animation should look the same irrespective of the frame rate

We can use the difference between two frames to do this

## Time method

Subtract current time - previous time and multiply it to the changes in transform

## Clock method

Returns time elapsed between two frames
You can assign this increasing time to transform

# GSAP

It is a library used to create timelines

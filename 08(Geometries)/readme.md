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

# Geometry

It is composed on vertices in 3D space. They are linked to create faces.

It can be used to create partices and meshes

Each vertex has -

1.  Position
2.  UV
3.  Normal
4.  etc

## Built-In Geometries

Inherits form class geometries

1.  BoxGeometry
2.  PlaneGeometry
3.  CircleGeometry
4.  ConeGeometry
5.  CyclinderGeometry
6.  RingGeometry
7.  TorusGeometry
8.  TourusKnotGeometry
9.  DodecahedronGeometry
10. OctahedronGeometry
11. TetrahedronGeometry
12. IcosahedronGeometry
13. SphereGeometry
14. ShapeGeometry
15. TubeGeometry
16. ExtrudeGeometry
17. LatheGeometry
18. TextGeoemtry

Each geometry is based on triangles , we can create our own geometries or use any 3D Software if the geometry is too complex

# Transform

All classes that inherit from Object3D have the following properties ->

1. position
2. rotation
3. scale
4. quaternion

# POSITION

Inherits from Vector3

1. Adding positon
   mesh.position.y = value
   mesh.position.x = value
   mesh.position.z = value
   OR
   mesh.position.set(xval , yval , zval)

2. Length
   Gives length of vector
   mesh.position.length()

3. Distance
   Calculates distance between two Vector3D inherited objects
   mesh.position.distanceTo(camera)

4. Normalise
   Reduces vector length to 1
   mesh.position.normalize()

# CLASS AXES

It helps in by providing an axes
const axesHelper = new THREE.AxesHelper(xscale , yscale , zscale)
scene.add(axesHelper)

# SCALE

Inherits from Vector3

1. Adding positon
   mesh.scale.y = value
   mesh.scale.x = value
   mesh.scale.z = value
   OR
   mesh.scale.set(xval , yval , zval)

2. Length
   Gives length of vector
   mesh.scale.length()

3. Distance
   Calculates distance between two Vector3D inherited objects
   mesh.scale.distanceTo(camera)

4. Normalise
   Reduces vector length to 1
   mesh.scale.normalize()

# ROTATION

To rotate we need to know the axis to rotate upon . Not a Vector3D inherited class

If we rotate upon x then the y axis also changes for the object

# SCENE GRAPH

If you have lot of objects .. you'll have to transform each one of them ..

Instead you can put then into Group class and each object moves

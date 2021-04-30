import './style.css'
import * as THREE from 'three'
import { Mesh } from 'three'

console.log(THREE)

//Creating scene(contains actors , objects , lights etc)
const scene = new THREE.Scene()

const group = new THREE.Group()
//applies on all of the group
group.position.set(-1,-1,-2)
scene.add(group)

const cube1 = new THREE.Mesh(
    new THREE.BoxGeometry(1,1,1) ,
    new THREE.MeshBasicMaterial({color : 'indigo'})
)

const cube2 = new THREE.Mesh(
    new THREE.BoxGeometry(1,1,1) ,
    new THREE.MeshBasicMaterial({color : 'purple'})
)

const cube3 = new THREE.Mesh(
    new THREE.BoxGeometry(1,1,1) ,
    new THREE.MeshBasicMaterial({color : 'orange'})
)

cube1.position.set(3,1,-1)
cube2.position.set(-2,2,-1)
cube3.position.set(2,-2,-1)


group.add(cube1)
group.add(cube2)
group.add(cube3)

//Creating object(We need to create a mesh -> mesh is a combination of geometry and material)
const geaometry = new THREE.BoxGeometry(1,1,1)  // passing size
const material = new THREE.MeshBasicMaterial({color: 'cyan'})
const mesh = new THREE.Mesh(geaometry , material)
mesh.position.y = 0 
mesh.position.x = 0 
mesh.position.z = -1
//mesh.position.set(0,1,-1)


//SCALE
mesh.scale.x = 2
//mesh.scale.set(0.5,0.5,0.5)

//ROTATION(In radians) use Math.PI for PI 
mesh.rotation.reorder('YXZ') // REORDER BASED ON IMPORTANCE .. Y ROTATES BEFORE X
mesh.rotation.y = 1
mesh.rotation.x = 0.5

console.log(mesh.position.length()) // 1.4142135623730951
console.log(mesh.position.distanceTo(new THREE.Vector4(0,1,2))) //3
//Add mesh to the scene
scene.add(mesh)

mesh.position.normalize() // reduces vector length to 1
console.log(mesh.position.length()) //0.9999999999999999 reduced length to close to 1

//Axes Helper new THREE.AxesHelper(scalex , scaley , scalez)
const axesHelper = new THREE.AxesHelper()
scene.add(axesHelper)

//Provide camera - there are differnet types of camera
// parameters -> field of view(vertical) in degrees , aspect ratio(size of viewport)
const size = {
    width: 800 , 
    height: 600
}
const camera = new THREE.PerspectiveCamera(75 , size.width/size.height)
camera.position.z = 3
camera.position.y = 1

console.log(mesh.position.distanceTo(camera.position)) //4.242640687119285 distance between camera and object

scene.add(camera)
camera.lookAt(mesh.position) // looks at center of a vector3 based object ... without any vector calculation for you

//Renderer (renders scene from the camera POV , result is drawn in a canvas)
const canvas = document.querySelector('.webgl')

const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})

renderer.setSize(size.width , size.height)

renderer.render(scene , camera)


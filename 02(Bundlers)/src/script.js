import './style.css'
import * as THREE from 'three'

console.log(THREE)

//Creating scene(contains actors , objects , lights etc)
const scene = new THREE.Scene()

//Creating object(We need to create a mesh -> mesh is a combination of geometry and material)
const geaometry = new THREE.BoxGeometry(1,1,1)  // passing size
const material = new THREE.MeshBasicMaterial({color: 'cyan'})
const mesh = new THREE.Mesh(geaometry , material)

//Add mesh to the scene
scene.add(mesh)

//Provide camera - there are differnet types of camera
// parameters -> field of view(vertical) in degrees , aspect ratio(size of viewport)
const size = {
    width: 800 , 
    height: 600
}
const camera = new THREE.PerspectiveCamera(75 , size.width/size.height)
camera.position.z = 3
camera.position.x = 1
scene.add(camera)

//Renderer (renders scene from the camera POV , result is drawn in a canvas)
const canvas = document.querySelector('.webgl')

const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})

renderer.setSize(size.width , size.height)

renderer.render(scene , camera)


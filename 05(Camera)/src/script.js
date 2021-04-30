import './style.css'
import * as THREE from 'three'

/**
 * Base
 */
// Canvas
const canvas = document.querySelector('canvas.webgl')

// Sizes
const sizes = {
    width: 800,
    height: 600
}

// Scene
const scene = new THREE.Scene()

// Object
const mesh = new THREE.Mesh(
    new THREE.BoxGeometry(1, 1, 1, 5, 5, 5),
    new THREE.MeshBasicMaterial({ color: 0xff0000 })
)
scene.add(mesh)

const cursor = {
    x : 0 , 
    y : 0 
}

window.addEventListener('mousemove' , (event) => {
    //console.log(event.clientX , event.clientY);
    cursor.x = event.clientX / sizes.width - 0.5
    cursor.y = event.clientY / sizes.height -0.5
})

//Perspective Camera parameters -> field of view , aspect ratio , near , far -> numbers between near and far are rendered only
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height , 0.1 , 100)
camera.position.z = 2
camera.lookAt(mesh.position)
scene.add(camera)

// Orthographic Camera parameters -> left , right , top , bottom , near , far
// const aspectRatio = sizes.width / sizes.height
// const camera = new THREE.OrthographicCamera(-1*aspectRatio , 1*aspectRatio , 1 , -1 , 0.1 , 100)
// camera.position.x = 2
// camera.position.y = 1
// camera.position.z = 1
// camera.lookAt(mesh.position)
// scene.add(camera)

//Axes
const axes = new THREE.AxesHelper()
scene.add(axes)

// Renderer
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)

// Animate
const clock = new THREE.Clock()

const tick = () =>
{
    const elapsedTime = clock.getElapsedTime()

    // Update objects
    // mesh.rotation.y = elapsedTime;

    //Update Camera
    // camera.position.x = cursor.x*3
    // camera.position.y = -cursor.y*3
    // camera.lookAt(mesh.position)

    //Update Camera
    camera.position.x = Math.sin(cursor.x * Math.PI * 2)*3
    camera.position.z = Math.cos(cursor.x* Math.PI * 2)*3
    camera.position.y = -cursor.y*5
    camera.lookAt(mesh.position)


    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()
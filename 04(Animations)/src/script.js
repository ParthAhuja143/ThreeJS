import './style.css'
import * as THREE from 'three'
import gsap from 'gsap'

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

// Object
const geometry = new THREE.BoxGeometry(1, 1, 1)
const material = new THREE.MeshBasicMaterial({ color: 0xff0000 })
const mesh = new THREE.Mesh(geometry, material)
scene.add(mesh)

// Sizes
const sizes = {
    width: 800,
    height: 600
}

// Camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height)
camera.position.z = 3
scene.add(camera)

const axes = new THREE.AxesHelper()
scene.add(axes)

// Renderer
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)

//Time
let previousTime = Date.now()
//Clock
const clock = new THREE.Clock()

//GSAP
gsap.to(mesh.position , {
    x : 1 ,
    duration : 1,
    delay: 1
})

//Animations
const tick = () => {
    //console.log('tick')

    //Time
    // const currentTime = Date.now()
    // const deltaTime = currentTime - previousTime
    // previousTime = currentTime

    // //Clock
     const elapsedTime = clock.getElapsedTime()
    // console.log(elapsedTime)

    //console.log(deltaTime) // time between two frames

    //Update Objects with time
    // mesh.position.x += 0.001*deltaTime
    // mesh.rotation.y +=0.001*deltaTime
    // mesh.rotation.x +=0.001*deltaTime
    // mesh.rotation.z += 0.001*deltaTime

    //Update Objects with clock
    // mesh.position.x = elapsedTime*0.1
    // mesh.rotation.x = elapsedTime*0.1
    // mesh.rotation.y = elapsedTime*0.1
    // mesh.rotation.z = elapsedTime*0.1

    //Using maths
    // mesh.position.x = Math.sin(elapsedTime)
    // mesh.position.y = Math.cos(elapsedTime)
    // mesh.rotation.x = elapsedTime*Math.PI*2*0.5 // one rotation per second

    camera.position.x = Math.sin(elapsedTime)
    camera.position.y= Math.cos(elapsedTime)
    
    camera.lookAt(mesh.position)

    //Render
    renderer.render(scene, camera)

    window.requestAnimationFrame(tick)
}

tick()

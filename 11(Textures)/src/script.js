import './style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import colorImageSource from '../static/textures/door/color.jpg'
import alphaImageSource from '../static/textures/door/alpha.jpg'
import ambientOcclusionImageSource from  '../static/textures/door/ambientOcclusion.jpg'
import heightImageSource from '../static/textures/door/height.jpg'
import metalnessImageSource from '../static/textures/door/metalness.jpg'
import normalImageSource from '../static/textures/door/normal.jpg'
import roughnessImageSource from '../static/textures/door/roughness.jpg'
import { NearestFilter } from 'three'

// Textures
const loadingManager = new THREE.LoadingManager()

loadingManager.onStart = () => {
    console.log('started')
}

loadingManager.onLoad = () => {
    console.log('loading')
}

loadingManager.onProgress = () => {
    console.log('progress')
}

loadingManager.onError = () => {
    console.log('error')
}

const textureLoader = new THREE.TextureLoader(loadingManager)
const colorTexture = textureLoader.load(colorImageSource)
const alphaTexture = textureLoader.load(alphaImageSource)
const heightTexture = textureLoader.load(heightImageSource)
const ambientOcclusionTexture = textureLoader.load(ambientOcclusionImageSource)
const metalnessTexture = textureLoader.load(metalnessImageSource)
const normalTexture = textureLoader.load(normalImageSource)
const roughnessTexture = textureLoader.load(roughnessImageSource)

// Transformations
// colorTexture.repeat.x = 2
// colorTexture.repeat.y = 3
// colorTexture.wrapS = THREE.RepeatWrapping
// colorTexture.wrapT = THREE.RepeatWrapping

// colorTexture.offset.x = 0.5
// colorTexture.center.x = 0.5
// colorTexture.center.y = 0.5
// colorTexture.rotation = Math.PI*0.25
colorTexture.minFilter = NearestFilter
/**
 * Base
 */
// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

/**
 * Object
 */
const geometry = new THREE.BoxBufferGeometry(1, 1, 1)
const material = new THREE.MeshStandardMaterial({ map : colorTexture ,
                                                  aoMap : ambientOcclusionTexture ,
                                                  displacementMap : heightTexture ,
                                                  displacementScale : 1 ,
                                                  alphaMap : alphaTexture ,
                                                  metalnessMap : metalnessTexture ,
                                                  normalMap : normalTexture ,
                                                  roughnessMap : roughnessTexture,
                                                  roughness : 1 })

const mesh = new THREE.Mesh(geometry, material)
scene.add(mesh)

const light = new THREE.DirectionalLight(0xFFFFFF , 1)
scene.add(light)

const ambientLight = new THREE.AmbientLight(0xFFFFFF , 0.6)
scene.add(ambientLight)

/**
 * Sizes
 */
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

window.addEventListener('resize', () =>
{
    // Update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    // Update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    // Update renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
camera.position.x = 1
camera.position.y = 1
camera.position.z = 2
scene.add(camera)

// Controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

/**
 * Animate
 */
const clock = new THREE.Clock()

const tick = () =>
{
    const elapsedTime = clock.getElapsedTime()

    // Update controls
    controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()
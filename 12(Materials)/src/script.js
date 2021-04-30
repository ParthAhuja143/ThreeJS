import './style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { CubeTextureLoader, NearestFilter, PlaneBufferGeometry, SphereBufferGeometry } from 'three'
import matCapImageSource from '../static/textures/matcaps/8.png'

import colorImageSource from '../static/textures/door/color.jpg'
import alphaImageSource from '../static/textures/door/alpha.jpg'
import ambientOcclusionImageSource from  '../static/textures/door/ambientOcclusion.jpg'
import heightImageSource from '../static/textures/door/height.jpg'
import metalnessImageSource from '../static/textures/door/metalness.jpg'
import normalImageSource from '../static/textures/door/normal.jpg'
import roughnessImageSource from '../static/textures/door/roughness.jpg'

import gradientImageSource from '../static/textures/gradients/3.jpg'

import environmentImageSourcePX from '../static/textures/environmentMaps/1/px.jpg'
import environmentImageSourceNX from '../static/textures/environmentMaps/1/nx.jpg'
import environmentImageSourcePY from '../static/textures/environmentMaps/1/py.jpg'
import environmentImageSourceNY from '../static/textures/environmentMaps/1/ny.jpg'
import environmentImageSourcePZ from '../static/textures/environmentMaps/1/pz.jpg'
import environmentImageSourceNZ from '../static/textures/environmentMaps/1/nz.jpg'
import * as dat from 'dat.gui'

//Debug UI 
const gui = new dat.GUI()

//Texture
const textureLoader = new THREE.TextureLoader()
const colorTexture = textureLoader.load(colorImageSource)
const alphaTexture = textureLoader.load(alphaImageSource)
const heightTexture = textureLoader.load(heightImageSource)
const ambientOcclusionTexture = textureLoader.load(ambientOcclusionImageSource)
const metalnessTexture = textureLoader.load(metalnessImageSource)
const normalTexture = textureLoader.load(normalImageSource)
const roughnessTexture = textureLoader.load(roughnessImageSource)

const matCapTexture = textureLoader.load(matCapImageSource)

const gradientTexture = textureLoader.load(gradientImageSource)

const environmentMap = new THREE.CubeTextureLoader().load([
    environmentImageSourcePX ,
    environmentImageSourceNX ,
    environmentImageSourcePY ,
    environmentImageSourceNY ,
    environmentImageSourcePZ ,
    environmentImageSourceNZ
])
// If your texture is too small or too large .. the GPU tries to stretch it resulting in blurs .. if 
// you don't want it .. set min and max to nearest filter
gradientTexture.minFilter = NearestFilter
gradientTexture.magFilter = NearestFilter
gradientTexture.generateMipmaps = false

/**
 * Base
 */
// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()
scene.background = new THREE.CubeTextureLoader().load([
    environmentImageSourcePX ,
    environmentImageSourceNX ,
    environmentImageSourcePY ,
    environmentImageSourceNY ,
    environmentImageSourcePZ ,
    environmentImageSourceNZ
])
// Basic Material is the most basic type of material
// const material = new THREE.MeshBasicMaterial()
// material.side  = THREE.DoubleSide
// material.wireframe = true
// material.map = colorTexture
// material.alphaMap = alphaTexture
// material.transparent= true
// Opacity
// material.opacity = 0.5
// material.transparent = true

// Normal Material stores information about what side faces what direction with color coding
// Useful in reflection , refraction , lighting , shadows
// const material = new THREE.MeshNormalMaterial()
// material.wireframe = true
// material.flatShading = true

// MatCap material displays a color by using normals as reference to pick the right color on a texture
// const material = new THREE.MeshMatcapMaterial()
// material.matcap = matCapTexture

// Color white if near and black if far
// const material = new THREE.MeshDepthMaterial()

// Mesh Lambert Material reacts to light
// const material = new THREE.MeshLambertMaterial()

// Mesh Phong Material also reacts to light and also has reflection 
//  const material = new THREE.MeshPhongMaterial()
//  material.shininess = 100
//  material.specular = new THREE.Color(0xff0000)

// Mesh Toon Material is for cartoonish elements
// can be given gradient map 
// const material = new THREE.MeshToonMaterial()
// material.gradientMap = gradientTexture

// Mesh Standard Material is like mesh phong and toon but more realistic and has roughness and metalness attributes to 
const material = new THREE.MeshStandardMaterial()
 material.roughness = 0.1
 material.metalness = 0.9
// material.map = colorTexture
// material.aoMap = ambientOcclusionTexture
// material.aoMapIntensity = 1
// material.displacementMap = heightTexture
// material.displacementScale = 0.06
// material.metalnessMap = metalnessTexture
// material.roughnessMap = roughnessTexture
// material.normalMap = normalTexture
material.envMap = environmentMap

// works only if transparent is set to true
// material.alphaMap = alphaTexture
// material.transparent = true
//material.wireframe = true

gui.add(material , 'metalness').min(0).max(1).step(0.001)
gui.add(material , 'roughness').min(0).max(1).step(0.001)
gui.add(material , 'aoMapIntensity').min(0).max(3).step(0.001)
gui.add(material , 'displacementScale').min(0).max(1).step(0.001)
const sphere = new THREE.Mesh(
    new SphereBufferGeometry(0.5 , 16 , 16) ,
    material
)
sphere.position.x = -1.5
// for ambient occlusion
sphere.geometry.setAttribute('uv2' , new THREE.BufferAttribute(sphere.geometry.attributes.uv.array , 2))

const plane = new THREE.Mesh(
    new THREE.PlaneBufferGeometry(1,1,100 , 100) , 
    material
)
// for ambient occlusion
plane.geometry.setAttribute('uv2' , new THREE.BufferAttribute(plane.geometry.attributes.uv.array , 2))

const torus = new THREE.Mesh(
    new THREE.TorusBufferGeometry(0.3 , 0.2 , 64 , 128) ,
    material
)
// for ambient occlusion 
torus.geometry.setAttribute('uv2' , new THREE.BufferAttribute(torus.geometry.attributes.uv.array , 2))

//Lights
const ambientLight = new THREE.AmbientLight(0xffffff , 0.5)
scene.add(ambientLight)

const pointLight = new THREE.PointLight(0xffffff , 0.5)
pointLight.position.set(2,3,4)
scene.add(pointLight)

torus.position.x = 1.5

scene.add(sphere)
scene.add(plane)
scene.add(torus)

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

    //Update Objects
    sphere.rotation.y = 0.5*elapsedTime
    sphere.rotation.x = 0.3*elapsedTime
    sphere.rotation.z = 0.2*elapsedTime

    plane.rotation.z = 0.2*elapsedTime

    torus.rotation.y = 0.5*elapsedTime
    torus.rotation.x = 0.3*elapsedTime
    torus.rotation.z = 0.2*elapsedTime

    // Update controls
    controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()
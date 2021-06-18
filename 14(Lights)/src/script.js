/** @format */

import "./style.css"
import * as THREE from "three"
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js"
import * as dat from "dat.gui"
import { SpotLightHelper } from "three"
import { RectAreaLightHelper } from "three/examples/jsm/helpers/RectAreaLightHelper.js"

/**
 * Base
 */
// Debug
const gui = new dat.GUI()

// Canvas
const canvas = document.querySelector("canvas.webgl")

// Scene
const scene = new THREE.Scene()

/**
 * Lights
 */
const ambientLight = new THREE.AmbientLight(0xffffff, 0.5)
scene.add(ambientLight)
gui.add(ambientLight, "intensity").min(0).max(1).step(0.01)

const directionalLight = new THREE.DirectionalLight(0x00ffff, 0.05)
scene.add(directionalLight)
gui.add(directionalLight, "intensity").min(0).max(1).step(0.01)

const hemisphereLight = new THREE.HemisphereLight(0xff0000, 0x0000ff, 0.3)
scene.add(hemisphereLight)
gui.add(hemisphereLight, "intensity").min(0).max(1).step(0.01)

const pointLight = new THREE.PointLight(0xff9000, 0.3, 10, 2)
pointLight.position.set(1, -0.5, 1)
scene.add(pointLight)
gui.add(pointLight, "intensity").min(0).max(1).step(0.01)

const rectAreaLight = new THREE.RectAreaLight(0x4e00ff, 2, 1, 1)
rectAreaLight.position.set(-1.5, 0, 1, 5)
rectAreaLight.lookAt(new THREE.Vector3())
scene.add(rectAreaLight)
gui.add(rectAreaLight, "intensity").min(0).max(1).step(0.01)

const spotLight = new THREE.SpotLight(0x78ff00, 0.5, 10, Math.PI * 0.1, 0.25, 0.1)
spotLight.position.set(0, 2, 3)
scene.add(spotLight)
gui.add(spotLight, "intensity").min(0).max(1).step(0.01)

spotLight.target.position.x = -0.75
scene.add(spotLight.target)

//Helpers
const hemisphereHelper = new THREE.HemisphereLightHelper(hemisphereLight, 0.2)
scene.add(hemisphereHelper)

const pointHelper = new THREE.PointLightHelper(pointLight, 0.2)
scene.add(pointHelper)

const directionalHelper = new THREE.DirectionalLightHelper(directionalLight, 0.2)
scene.add(directionalHelper)

const spotLightHelper = new THREE.SpotLightHelper(spotLight)
scene.add(spotLightHelper)

window.requestAnimationFrame(() => {
	spotLightHelper.update() // the helper isnt with sync with the light
})

const rectHelper = new RectAreaLightHelper(rectAreaLight)
scene.add(rectHelper)

window.requestAnimationFrame(() => {
	rectHelper.position.copy(rectAreaLight.position)
	rectHelper.quaternion.copy(rectAreaLight.quaternion)
	// rectHelper.position.x = rectAreaLight.position.x
	// rectHelper.position.y = rectAreaLight.position.y
	// rectHelper.position.z = rectAreaLight.position.z
	rectHelper.update()
})
/**
 * Objects
 */
// Material
const material = new THREE.MeshStandardMaterial()
material.roughness = 0.4

// Objects
const sphere = new THREE.Mesh(new THREE.SphereBufferGeometry(0.5, 32, 32), material)
sphere.position.x = -1.5

const cube = new THREE.Mesh(new THREE.BoxBufferGeometry(0.75, 0.75, 0.75), material)

const torus = new THREE.Mesh(new THREE.TorusBufferGeometry(0.3, 0.2, 32, 64), material)
torus.position.x = 1.5

const plane = new THREE.Mesh(new THREE.PlaneBufferGeometry(5, 5), material)
plane.rotation.x = -Math.PI * 0.5
plane.position.y = -0.65

scene.add(sphere, cube, torus, plane)

/**
 * Sizes
 */
const sizes = {
	width: window.innerWidth,
	height: window.innerHeight,
}

window.addEventListener("resize", () => {
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
	canvas: canvas,
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

/**
 * Animate
 */
const clock = new THREE.Clock()

const tick = () => {
	const elapsedTime = clock.getElapsedTime()

	// Update objects
	sphere.rotation.y = 0.1 * elapsedTime
	cube.rotation.y = 0.1 * elapsedTime
	torus.rotation.y = 0.1 * elapsedTime

	sphere.rotation.x = 0.15 * elapsedTime
	cube.rotation.x = 0.15 * elapsedTime
	torus.rotation.x = 0.15 * elapsedTime

	// Update controls
	controls.update()

	// Render
	renderer.render(scene, camera)

	// Call tick again on the next frame
	window.requestAnimationFrame(tick)
}

tick()

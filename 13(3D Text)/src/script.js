import './style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import * as dat from 'dat.gui'
import { TextGeometry } from 'three'

/**
 * Base
 */
// Debug
const gui = new dat.GUI()

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

/**
 * Textures
 */
const textureLoader = new THREE.TextureLoader()
const matCapTexture = textureLoader.load('/textures/matcaps/8.png')


//Font 
const fontLoader = new THREE.FontLoader()
fontLoader.load(
    '/fonts/helvetiker_regular.typeface.json' ,
    (font) => {
        console.log('Loaded')
        const textGoemetry = new THREE.TextBufferGeometry(
            'PARTH AHUJA' , {
                font:font,
                size:0.5,
                height:0.2,
                curveSegments:3 ,
                bevelEnabled:true,
                bevelThickness:0.03,
                bevelSize:0.02,
                bevelOffset:0,
                bevelSegments: 5
            }
        )
        // textGoemetry.computeBoundingBox()
        // textGoemetry.translate(
        //     textGoemetry.boundingBox.max.x * -0.5 ,
        //     textGoemetry.boundingBox.max.y * -0.5 ,
        //     textGoemetry.boundingBox.max.z * -0.5
        // )

        textGoemetry.center()

        const textMaterial = new THREE.MeshMatcapMaterial({matcap : matCapTexture})
        const text = new THREE.Mesh(textGoemetry , textMaterial)
        scene.add(text)
    }
)

//Axes
// const axes = new THREE.AxesHelper()
// scene.add(axes)


    const donutGeometry = new THREE.TorusBufferGeometry(0.3,0.2,20,45)
    const donutMaterial = new THREE.MeshMatcapMaterial({matcap : matCapTexture})

for(let i = 0 ; i<500; i++){
    const donut = new THREE.Mesh(donutGeometry, donutMaterial)

    donut.position.x = (Math.random() - 0.5) * 20
    donut.position.y = (Math.random() - 0.5) * 20
    donut.position.z = (Math.random() - 0.5) * 20

    donut.rotation.x = Math.random()*Math.PI*0.5
    donut.rotation.z = Math.random()*Math.PI*0.5
    donut.rotation.y = Math.random()*Math.PI*0.5

    const scale = Math.random()
    donut.scale.set(scale , scale , scale)

    scene.add(donut)
}

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
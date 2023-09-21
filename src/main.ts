import * as THREE from "three"
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls"
import planetCreate from "./planet"
import textures from "./textures"
import planets from "./planets"

const scene = new THREE.Scene()
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
)

// Load background
const bgScene = new THREE.Scene()
let bgMesh: THREE.Mesh
{
  const loader = new THREE.TextureLoader()
  const texture = loader.load(textures.background)
  texture.magFilter = THREE.LinearFilter
  texture.minFilter = THREE.LinearFilter
  const shader = THREE.ShaderLib.equirect
  const material = new THREE.ShaderMaterial({
    fragmentShader: shader.fragmentShader,
    vertexShader: shader.vertexShader,
    uniforms: shader.uniforms,
    depthWrite: false,
    side: THREE.BackSide,
  })
  material.uniforms.tEquirect.value = texture
  const plane = new THREE.BoxBufferGeometry(2, 2, 2)
  bgMesh = new THREE.Mesh(plane, material)
  bgScene.add(bgMesh)
}

// Sun
const texture = new THREE.TextureLoader().load(textures.sun)
const sunGeometry = new THREE.SphereGeometry(64, 64, 32)
const sunMaterial = new THREE.MeshBasicMaterial({ map: texture })
const sun = new THREE.Mesh(sunGeometry, sunMaterial)
scene.add(sun)

let planetObjects: Map<string, object> = new Map<string, object>()

planets.forEach((planet) => {
  const planetObj = {
    scene,
    texture: planet.texture,
    normal: planet.normal ? textures[planet.normal] : undefined,
    size: planet.size,
    position: planet.position,
    rotation: planet.rotation,
  }
  console.log(planetObj)
  const { mesh, obj } = planetCreate(planetObj)
  console.log(mesh, obj)
  planetObjects.set(planet.name, { mesh, obj })
})

const renderer = new THREE.WebGLRenderer()
renderer.setSize(window.innerWidth, window.innerHeight)
document.body.appendChild(renderer.domElement)

const light = new THREE.PointLight(0xffffff, 1, 0)
scene.add(light)
const ambientLight = new THREE.AmbientLight(0x111111)
scene.add(ambientLight)

const controls = new OrbitControls(camera, renderer.domElement)
camera.position.set(300, 20, 100)
controls.update()
renderer.autoClearColor = false

function animate() {
  requestAnimationFrame(animate)
  bgMesh.position.copy(camera.position)
  renderer.render(bgScene, camera)

  sun.rotation.y += 0.001

  for (let key of planetObjects.keys()) {
    console.log()
    console.log()
    planetObjects.get(key)!.obj.rotation.y += planets.find(
      (e) => key.toLowerCase() === e.name.toLowerCase()
    )!.orbit
    planetObjects.get(key)!.mesh.rotation.y += planets.find(
      (e) => key.toLowerCase() === e.name.toLowerCase()
    )!.rotation
  }

  controls.update()

  renderer.render(scene, camera)
}

animate()

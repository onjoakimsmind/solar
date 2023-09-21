import * as THREE from "three"

interface Ring {
  texture: THREE.Texture
  innerRad: number
  outerRad: number
  position: number
}

interface Moon {
  texture: THREE.Texture
  normal: THREE.Texture | undefined
  size: number
  position: number
  rotation: number
}

interface Params {
  scene: THREE.Scene
  size: number
  position: number
  texture: string
  normal?: string | undefined
  moon?: Moon | undefined
  ring?: Ring | undefined
}

const planetCreate = ({
  scene,
  texture,
  normal,
  size,
  position,
  moon,
  ring,
}: Params) => {
  let pNormal: THREE.Texture | undefined
  if (normal) {
    pNormal = new THREE.TextureLoader().load(normal)
  }

  const materialObj = {
    map: new THREE.TextureLoader().load(texture),
    normalMap: normal ? pNormal : null,
  }

  const geo = new THREE.SphereGeometry(size, 64, 32)
  const mat = new THREE.MeshStandardMaterial(materialObj)
  const mesh = new THREE.Mesh(geo, mat)
  const obj = new THREE.Object3D()
  obj.add(mesh)

  if (moon) {
    const moonGeometry: THREE.SphereGeometry = new THREE.SphereGeometry(
      moon.size,
      64,
      32
    )
    const moonMaterial: THREE.MeshBasicMaterial = new THREE.MeshBasicMaterial({
      map: moon.texture,
    })
    const moon: THREE.Mesh = new THREE.Mesh(moonGeometry, moonMaterial)
    const moonObj = new THREE.Object3D()
    moonObj.add(moon)
    obj.add(moonObj)
  }

  scene.add(obj)
  mesh.position.x = position
  return { mesh, obj }
}

export default planetCreate

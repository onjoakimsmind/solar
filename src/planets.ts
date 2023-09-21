import textures from "./textures"

const planets = [
  {
    name: "Mercury",
    rings: false,
    moons: false,
    size: 10,
    position: 128,
    texture: textures.mercury,
    normal: undefined,
    orbit: 0.009,
    rotation: 0.006,
  },
  {
    name: "Venus",
    rings: false,
    moons: false,
    size: 10,
    position: 190,
    texture: textures.venus,
    normal: undefined,
    orbit: 0.002,
    rotation: 0.005,
  },
  {
    name: "Earth",
    rings: false,
    moons: true,
    size: 10,
    position: 300,
    texture: textures.earth,
    normal: textures.earthNormal,
    orbit: 0.001,
    rotation: 0.005,
  },
]

export default planets

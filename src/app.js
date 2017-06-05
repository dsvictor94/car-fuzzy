import GameLoop from './app/engine'
import Simulator from './app/simulator'
import Map from './app/map'

const canvas = document.getElementById('canvas')
const context = canvas.getContext('2d')

const map = new Map(canvas)

canvas.addEventListener('mousemove', map.move, false)

canvas.addEventListener('mousedown', map.start, false)

canvas.addEventListener('mouseup', map.end, false)

const game = new GameLoop()
  .fps(60)
  .scene(new Simulator(map))
  .attach(context)
  .run()

window.game = game // to debug

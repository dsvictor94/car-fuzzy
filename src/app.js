import GameLoop from './app/engine'
import Simulator from './app/simulator'

const canvas = document.getElementById('canvas')
const context = canvas.getContext('2d');

var game = new GameLoop()
  .fps(60)
  .scene(new Simulator())
  .attach(context)
  .run()
  

window.game = game; //to debug

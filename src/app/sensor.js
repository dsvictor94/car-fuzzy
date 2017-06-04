import segmentColide from './colide'

export default class Sensor {
  constructor (simulator, size, angle) {
    this.simulator = simulator
    this.size = size
    this.angle = angle

    this.dist = 255
  }

  sensorSegment () {
    const {x, y} = this.simulator
    const {size: s, angle: a} = this
    return { from: {x, y}, to: { x: x+s*Math.cos(a), y: y+s*Math.sin(a) }}
  }

  update() {
    const segA = this.sensorSegment()
    const {x, y} = segA.from

    let dist = this.size
    for (let segB of this.simulator.map.path) {
      const point = segmentColide(segA, segB)
      if (point === false) continue
      if (point === true) return 0
      const {x:cx, y:cy} = point
      const segDist = Math.sqrt((cx-x)**2 + (cy-y)**2)
      if (segDist < dist) dist = segDist
    }
    this.dist = parseInt(255*dist/this.size)
  }

  render(ctx) {
    const {from, to} = this.sensorSegment()
    ctx.beginPath()
    ctx.moveTo(from.x, from.y)
    ctx.lineTo(to.x, to.y)
    ctx.strokeStyle=`rgb(${255 - this.dist}, 0, 0)`;
    ctx.stroke()
  }


}

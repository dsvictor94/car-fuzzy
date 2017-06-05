import segmentColide from './colide'

export default class Sensor {
  constructor (simulator, size, angle) {
    this.simulator = simulator
    this.size = size
    this.angle = angle

    this.dist = 255
  }

  sensorSegment () {
    let {x, y, a: ca} = this.simulator
    x += 20 * Math.cos(ca)
    y += 20 * Math.sin(ca)
    const {size: s, angle: a} = this
    return { from: { x, y }, to: { x: x + s * Math.cos(a + ca), y: y + s * Math.sin(a + ca) } }
  }

  update () {
    const segA = this.sensorSegment()
    const {x, y} = segA.from

    let dist = this.size
    for (let segB of this.simulator.map.path) {
      const point = segmentColide(segA, segB)
      if (point === false) continue
      if (point === true) return 0
      const {x: cx, y: cy} = point
      const segDist = Math.sqrt((cx - x) ** 2 + (cy - y) ** 2)
      if (segDist < dist) dist = segDist
    }
    this.dist = parseInt(255 * dist / this.size)
  }

  render (ctx) {
    const {from, to} = this.sensorSegment()
    ctx.save()
    ctx.beginPath()
    ctx.strokeStyle = `rgb(${255 - this.dist}, 0, 0)`

    ctx.moveTo(from.x, from.y)
    ctx.lineTo(to.x, to.y)
    ctx.stroke()
    ctx.beginPath()
    ctx.restore()
  }
}

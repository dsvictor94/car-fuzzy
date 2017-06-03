import segmentColide from './colide'

export default class Simulator {
  constructor (map) {
    this.x = 40
    this.y = 200
    this.map = map
  }

  settup () {

  }

  update (dt) {
    const {x, y, map} = this
    const newX = x + 80*dt
    if (!this.colide({x: newX, y})) {
      this.x = newX
    }
  }

  colide (to) {
    const segA  = { from: { x: this.x, y: this.y }, to }
    for (let segB of this.map.path) {
      if (segmentColide(segA, segB)) return true
    }
    return false
  }

  render (ctx, dt) {
    ctx.font = "14px Arial";
    ctx.fillText(`fps: ${Math.round(1/dt)}`,2,14);
    this.drawCar(ctx, dt)
    this.drawMap(ctx, dt)
  }

  drawCar(ctx, dt) {
    const {x, y} = this
    ctx.rect(x-13, y-7, 26, 14);
    ctx.fill();
  }

  drawMap(ctx, dt) {
    for (let {from, to} of this.map.path) {
      ctx.moveTo(from.x, from.y)
      ctx.lineTo(to.x, to.y)
    }
    if (this.map.drawing != null) {
      const {from, to} = this.map.drawing
      ctx.moveTo(from.x, from.y)
      ctx.lineTo(to.x, to.y)
    }
    ctx.stroke();
  }
}

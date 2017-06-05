import segmentColide from './colide'
import Sensor from './sensor'
import Brain from './brain'

const SENSOR_RANGE = 100
const CAR_LENGTH = 36
const CAR_WIDTH = 14

export default class Simulator {
  constructor (map) {
    this.x = 40
    this.y = 20
    this.a = Math.PI / 6 // car angle
    this.o = 0 // steering wheel angle
    this.velocity = 40

    this.map = map
    this.brain = new Brain(this)

    this.sensorA = new Sensor(this, SENSOR_RANGE, 0)
    this.sensorB = new Sensor(this, SENSOR_RANGE, Math.PI / 4)
    this.sensorC = new Sensor(this, SENSOR_RANGE, -Math.PI / 4)

    window.simulator = this
  }

  settup () {

  }

  update (dt) {
    const { x, y, a, velocity, o } = this
    const radiosOfRotation = (CAR_LENGTH / 2) / Math.tan(o)
    const newX = x + dt * velocity * Math.cos(a + velocity * dt / radiosOfRotation)
    const newY = y + dt * velocity * Math.sin(a + velocity * dt / radiosOfRotation)
    if (!this.colide({ x: newX, y: newY })) {
      this.x = newX
      this.y = newY
      this.a += velocity * dt / radiosOfRotation

      this.sensorA.update()
      this.sensorB.update()
      this.sensorC.update()
    }

    this.brain.think()
  }

  colide (to) {
    const segA = { from: { x: this.x, y: this.y }, to }
    for (let segB of this.map.path) {
      if (segmentColide(segA, segB)) return true
    }
    return false
  }

  render (ctx, dt) {
    ctx.font = '14px Arial'
    ctx.fillText(`fps: ${Math.round(1 / dt)}`, 2, 14)

    this.sensorA.render(ctx)
    this.sensorB.render(ctx)
    this.sensorC.render(ctx)

    this.drawCar(ctx, dt)
    this.drawMap(ctx, dt)
  }

  drawCar (ctx, dt) {
    const {x, y, a, o} = this

    const r = (CAR_LENGTH / 2) / Math.tan(o)

    ctx.save()
    ctx.translate(x, y)
    ctx.rotate(a)

    // car body
    ctx.rect(-7, -CAR_WIDTH / 2, CAR_LENGTH, CAR_WIDTH)
    // rear wheels
    ctx.rect(-3, -CAR_WIDTH / 2 - 2, 6, 2)
    ctx.rect(-3, CAR_WIDTH / 2, 6, 2)

    // ctx.moveTo(0, 0)
    // ctx.lineTo(0, r)

    ctx.save()
    ctx.translate(CAR_LENGTH - 14, -CAR_WIDTH / 2 - 1)
    ctx.rotate(Math.atan((CAR_LENGTH - 14) / (r + CAR_WIDTH)))
    // ctx.moveTo(0, 0)
    // ctx.lineTo(0, r-10)
    ctx.rect(-3, -1, 6, 2)
    ctx.restore()
    ctx.save()
    ctx.translate(CAR_LENGTH - 14, CAR_WIDTH / 2 + 1)
    ctx.rotate(Math.atan((CAR_LENGTH - 14) / r))
    // ctx.moveTo(0, 0)
    // ctx.lineTo(0, r)
    ctx.rect(-3, -1, 6, 2)
    ctx.restore()

    ctx.fill()
    ctx.restore()
  }

  drawMap (ctx, dt) {
    for (let { from, to } of this.map.path) {
      ctx.moveTo(from.x, from.y)
      ctx.lineTo(to.x, to.y)
    }
    if (this.map.drawing != null) {
      const {from, to} = this.map.drawing
      ctx.moveTo(from.x, from.y)
      ctx.lineTo(to.x, to.y)
    }
    ctx.stroke()
  }
}

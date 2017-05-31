
export default class Simulator {
  constructor () {
    this.x = 0
    this.y = 20
  }

  settup () {

  }

  update (dt) {
    this.x += 50*dt
  }

  render (ctx, dt) {
    ctx.font = "14px Arial";
    ctx.fillText(`fps: ${Math.round(1/dt)}`,2,14);
    const {x, y} = this
    ctx.rect(x, y, 15, 10);
    ctx.fill();
  }
}

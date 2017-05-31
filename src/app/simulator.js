const map = (`
╔══════════════════════════════════════╗
║                                      ║
║                                      ║
║                                      ║
║           ╔══════════════╗           ║
║           ║              ║           ║
║           ║   ╔═    ═╗   ║           ║
║           ║   ╚═    ═╝   ║           ║
║           ║              ║           ║
║           ╚══════════════╝           ║
║                                      ║
║                                      ║
║                                      ║
╚══════════════════════════════════════╝
`).split("\n").map(l => l.match(/.{1,2}/g))



export default class Simulator {
  constructor () {
    this.x = 0
    this.y = 20
    this.map = map
  }

  settup () {

  }

  update (dt) {
    this.x += 80*dt
  }

  render (ctx, dt) {
    ctx.font = "14px Arial";
    ctx.fillText(`fps: ${Math.round(1/dt)}`,2,14);
    const {x, y, map} = this
    ctx.rect(x, y, 15, 10);
    ctx.fill();
    for (let i = 1; i<map.length-1; i++) {
      for (let j = 0; j<map[i].length; j++) {
        if (map[i][j] != '  ')
          ctx.rect(j*40, i*40, 40, 40);
      }
    }
    ctx.stroke();
  }
}

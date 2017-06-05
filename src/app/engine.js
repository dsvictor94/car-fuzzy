export default class GameLoop {
  constructor () {
    this.running = false
    this.id = null
    // binds
    this.fps = this.fps.bind(this)
    this.scene = this.scene.bind(this)
    this.attach = this.attach.bind(this)
    this.run = this.run.bind(this)
  }

  fps (fps) {
    this._fps = fps
    return this
  }

  scene (scene) {
    this._scene = scene
    return this
  }

  attach (context) {
    this._context = context
    return this
  }

  run () {
    this.running = true
    let now
    let dt
    let last = window.performance.now()

    this._scene.settup()

    const frame = () => {
      const { _context, _scene, running } = this
      now = window.performance.now()
      dt = (now - last) / 1000    // duration in seconds
      if (dt < 1) { // if too slow skip render and update
        _scene.update(dt)
        _context.clearRect(0, 0, _context.canvas.width, _context.canvas.height)
        _context.beginPath()
        _context.save()
        _scene.render(_context, dt)
        _context.restore()
      }
      last = now
      if (running) { this.id = window.requestAnimationFrame(frame) } else { this.id = null }
    }

    this.id = window.requestAnimationFrame(frame)
    return this
  }

  pause () {
    this.running = false
    return this
  }
}

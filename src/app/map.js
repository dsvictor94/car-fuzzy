function toPoint (canvas, evt) {
  const rect = canvas.getBoundingClientRect()
  return {
    x: evt.clientX - rect.left,
    y: evt.clientY - rect.top
  }
}

export default class Map {
  constructor (canvas) {
    this.canvas = canvas
    this.at = {x: 0, y: 0}
    this.drawing = null
    this.path = []

    this.move = this.move.bind(this)
    this.start = this.start.bind(this)
    this.end = this.end.bind(this)
  }

  move (e) {
    if (this.drawing != null) {
      this.drawing.to = toPoint(this.canvas, e)
    }
  }

  start (e) {
    const point = toPoint(this.canvas, e)
    this.drawing = { from: point, to: point }
  }

  end (e) {
    if (this.drawing != null) {
      this.drawing.to = toPoint(this.canvas, e)
      this.path.push(this.drawing)
      this.drawing = null
    }
  }
}


export default class Brain {

  constructor (simulator) {
    this.simulator = simulator
  }

  think () {
    const { sensorA: A, sensorB: B, sensorC: C, o, velocity: v } = this.simulator

    if (B.dist < C.dist) {
      if (B.dist < 150 && v > 0) this.simulator.o = -Math.PI/6
      if (B.dist < 150 && v < 0) this.simulator.o = Math.PI/6
    } else {
      if (C.dist < 150 && v > 0) this.simulator.o = Math.PI/6
      if (C.dist < 150 && v < 0) this.simulator.o = -Math.PI/6
    }

    if (A.dist < 50) {
      this.simulator.velocity = -30
      if (B.dist > 150 && C.dist > 150) this.simulator.o = -Math.PI/6
    }
    if (A.dist > 200) {
      this.simulator.velocity = 40
    }

    if (B.dist > 150 && C.dist > 150 && A.dist > 200) this.simulator.o = 0
  }
}

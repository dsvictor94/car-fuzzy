import * as fuzzy from './fuzzy'

export default class Brain {

  constructor (simulator) {
    this.simulator = simulator
  }

  think () {
    const { sensorA: F, sensorB: R, sensorC: L, o, velocity: v } = this.simulator
    // variavel: objeto a frente -> quantificadores (MP, P, D, MD)
    const MPF = fuzzy.reverseGrade(F.dist, 0, 70)
    const  PF = fuzzy.triangle(F.dist,  50, 100, 150)
    const  DF = fuzzy.triangle(F.dist, 100, 150, 200)
    const MDF = fuzzy.grade(F.dist, 150, 200)
    // variavel: objeto a direita -> quantificadores (MP, P, D, MD)
    const MPD = fuzzy.reverseGrade(R.dist, 0, 70)
    const  PD = fuzzy.triangle(R.dist,  50, 100, 150)
    const  DD = fuzzy.triangle(R.dist, 100, 150, 200)
    const MDD = fuzzy.grade(R.dist, 150, 200)
    // variavel: objeto a esquerda -> quantificadores (MP, P, D, MD)
    const MPE = fuzzy.reverseGrade(L.dist, 0, 70)
    const  PE = fuzzy.triangle(L.dist,  50, 100, 150)
    const  DE = fuzzy.triangle(L.dist, 100, 150, 200)
    const MDE = fuzzy.grade(L.dist, 150, 200)

    console.log("F", F.dist, MPF, PF, DF, MDF)
    console.log("D", R.dist, MPD, PD, DD, MDD)
    console.log("E", L.dist, MPE, PE, DE, MDE)
    // regras
    // variavel: girar -> quantificadores MD, D, N, E, ME
    const GMD = fuzzy.or(MPE, MPF)
    const GME = fuzzy.or(MPD)

    const  GD = fuzzy.or(PE, PF)
    const  GE = fuzzy.or(PD, PF)

    const  GN = fuzzy.or(MDF, DF)


    this.simulator.o = fuzzy.defuzzify(v => {
      const cGME = fuzzy.reverseGrade(v, -Math.PI/4, -Math.PI/6)
      const  cGE = fuzzy.triangle(v, -Math.PI/4, -Math.PI/6, 0)
      const  cGN = fuzzy.triangle(v, -Math.PI/6, 0, Math.PI/6)
      const  cGD = fuzzy.triangle(v, 0, Math.PI/4)
      const cGMD = fuzzy.grade(v, Math.PI/6, Math.PI/4)

      return fuzzy.or(
        fuzzy.and(cGME, GME),
        fuzzy.and(cGE, GE),
        fuzzy.and(cGN, GN),
        fuzzy.and(cGD, GD),
        fuzzy.and(cGMD, GMD),
      )
    }, -Math.PI/4, Math.PI/4)
  }
}

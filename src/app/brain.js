import * as fuzzy from './fuzzy'

export default class Brain {
  constructor (simulator) {
    this.simulator = simulator
  }

  think () {
    const { sensorA: F, sensorB: R, sensorC: L } = this.simulator
    // variavel: objeto a frente -> quantificadores (MP, P, D, MD)
    const MPF = fuzzy.reverseGrade(F.dist, 0, 70)
    const PF = fuzzy.triangle(F.dist, 50, 100, 150)
    const DF = fuzzy.triangle(F.dist, 100, 150, 200)
    const MDF = fuzzy.grade(F.dist, 150, 200)
    // variavel: objeto a direita -> quantificadores (MP, P, D, MD)
    const MPD = fuzzy.reverseGrade(R.dist, 0, 70)
    const PD = fuzzy.triangle(R.dist, 50, 100, 150)
    const DD = fuzzy.triangle(R.dist, 100, 150, 200)
    const MDD = fuzzy.grade(R.dist, 150, 200)
    // variavel: objeto a esquerda -> quantificadores (MP, P, D, MD)
    const MPE = fuzzy.reverseGrade(L.dist, 0, 70)
    const PE = fuzzy.triangle(L.dist, 50, 100, 150)
    const DE = fuzzy.triangle(L.dist, 100, 150, 200)
    const MDE = fuzzy.grade(L.dist, 150, 200)

    console.log('F', F.dist, MPF, PF, DF, MDF)
    console.log('D', R.dist, MPD, PD, DD, MDD)
    console.log('E', L.dist, MPE, PE, DE, MDE)
    // regras
    // variavel: girar -> quantificadores MD, D, N, E, ME

    // MPF MPD MPE => ME ok
    // MPF MPD  PE => ME ok
    // MPF MPD  DE => ME ok
    // MPF MPD MDE => ME ok
    // MPF  PD MPE => MD ok
    // MPF  PD  PE => ME ok
    // MPF  PD  DE => ME ok
    // MPF  PD MDE => ME ok
    // MPF  DD MPE => MD ok
    // MPF  DD  PE => MD ok
    // MPF  DD  DE => MD ok
    // MPF  DD MDE => ME ok
    // MPF MDD MPE => MD ok
    // MPF MDD  PE => MD ok
    // MPF MDD  DE => MD ok
    // MPF MDD MDE => MD ok

    //  PF MPD MPE => N  ok
    //  PF MPD  PE => E  ok
    //  PF MPD  DE => E  ok
    //  PF MPD MDE => E  ok
    //  PF  PD MPE => D  ok
    //  PF  PD  PE => D  ok
    //  PF  PD  DE => E  ok
    //  PF  PD MDE => E  ok
    //  PF  DD MPE => D  ok
    //  PF  DD  PE => D  ok
    //  PF  DD  DE => D  ok
    //  PF  DD MDE => E  ok
    //  PF MDD MPE => D  ok
    //  PF MDD  PE => D  ok
    //  PF MDD  DE => MD ok
    //  PF MDD MDE => MD ok

    //  DF MPD MPE => N  ok
    //  DF MPD  PE => N  ok
    //  DF MPD  DE => E  ok
    //  DF MPD MDE => E  ok
    //  DF  PD MPE => N  ok
    //  DF  PD  PE => N  ok
    //  DF  PD  DE => E  ok
    //  DF  PD MDE => E  ok
    //  DF  DD MPE => D  ok
    //  DF  DD  PE => D  ok
    //  DF  DD  DE => N  ok
    //  DF  DD MDE => E  ok
    //  DF MDD MPE => MD ok
    //  DF MDD  PE => D  ok
    //  DF MDD  DE => D  ok
    //  DF MDD MDE => D  ok

    // MDF MPD MPE => N  ok
    // MDF MPD  PE => D  ok
    // MDF MPD  DE => ME ok
    // MDF MPD MDE => ME ok
    // MDF  PD MPE => D  ok
    // MDF  PD  PE => N  ok
    // MDF  PD  DE => E  ok
    // MDF  PD MDE => E  ok
    // MDF  DD MPE => MD ok
    // MDF  DD  PE => D  ok
    // MDF  DD  DE => N  ok
    // MDF  DD MDE => E  ok
    // MDF MDD MPE => MD ok
    // MDF MDD  PE => MD ok
    // MDF MDD  DE => D  ok
    // MDF MDD MDE => N  ok

    const GMD = fuzzy.or(
      fuzzy.and(MPF, DD, MPE),
      fuzzy.and(MPF, DD, PE),
      fuzzy.and(MPF, DD, DE),
      fuzzy.and(MPF, MDD, MPE),
      fuzzy.and(MPF, MDD, PE),
      fuzzy.and(MPF, MDD, DE),
      fuzzy.and(MPF, MDD, MDE),
      fuzzy.and(PF, MDD, DE),
      fuzzy.and(PF, MDD, MDE),
      fuzzy.and(MDF, DD, MPE),
      fuzzy.and(MDF, MDD, MPE),
      fuzzy.and(MDF, MDD, PE),
      fuzzy.and(MPF, PD, MPE)
    )

    const GME = fuzzy.or(
      fuzzy.and(MPF, MPD, MPE),
      fuzzy.and(MPF, MPD, PE),
      fuzzy.and(MPF, MPD, DE),
      fuzzy.and(MPF, PD, PE),
      fuzzy.and(MPF, PD, DE),
      fuzzy.and(MPF, PD, MDE),
      fuzzy.and(MPF, DD, MDE),
      fuzzy.and(MPF, MPD, DE),
      fuzzy.and(MPF, MPD, MDE)
    )

    const GD = fuzzy.or(
      fuzzy.and(PF, PD, MPE),
      fuzzy.and(PF, PD, PE),
      fuzzy.and(PF, DD, MPE),
      fuzzy.and(PF, DD, PE),
      fuzzy.and(PF, DD, DE),
      fuzzy.and(PF, MDD, MPE),
      fuzzy.and(PF, MDD, PE),
      fuzzy.and(DF, DD, MPE),
      fuzzy.and(DF, DD, PE),
      fuzzy.and(DF, MDD, PE),
      fuzzy.and(DF, MDD, DE),
      fuzzy.and(DF, MDD, MDE),
      fuzzy.and(MDF, MPD, PE),
      fuzzy.and(MDF, PD, MPE),
      fuzzy.and(MDF, DD, PE),
      fuzzy.and(MDF, MDD, DE)
    )

    const GE = fuzzy.or(
      fuzzy.and(PF, MPD, PE),
      fuzzy.and(PF, MPD, DE),
      fuzzy.and(PF, MPD, MDE),
      fuzzy.and(PF, PD, DE),
      fuzzy.and(PF, PD, MDE),
      fuzzy.and(PF, DD, MDE),
      fuzzy.and(DF, MPD, DE),
      fuzzy.and(DF, MPD, MPE),
      fuzzy.and(DF, PD, DE),
      fuzzy.and(DF, PD, MDE),
      fuzzy.and(DF, DD, MDE),
      fuzzy.and(MDF, PD, DE),
      fuzzy.and(MDF, PD, MDE),
      fuzzy.and(MDF, DD, MDE)
    )

    const GN = fuzzy.or(
      fuzzy.and(PF, MPD, MPE),
      fuzzy.and(DF, MPD, MPE),
      fuzzy.and(PF, MPD, PE),
      fuzzy.and(DF, PD, MPE),
      fuzzy.and(DF, PD, PE),
      fuzzy.and(DF, DD, DE),
      fuzzy.and(MDF, MPD, MPE),
      fuzzy.and(MDF, PD, PE),
      fuzzy.and(MDF, DD, DE),
      fuzzy.and(MDF, MDD, MDE)
    )

    this.simulator.o = fuzzy.defuzzify(v => {
      const cGME = fuzzy.reverseGrade(v, -Math.PI / 4, -Math.PI / 6)
      const cGE = fuzzy.triangle(v, -Math.PI / 4, -Math.PI / 6, 0)
      const cGN = fuzzy.triangle(v, -Math.PI / 6, 0, Math.PI / 6)
      const cGD = fuzzy.triangle(v, 0, Math.PI / 6, Math.PI / 4)
      const cGMD = fuzzy.grade(v, Math.PI / 6, Math.PI / 4)

      return fuzzy.or(
        fuzzy.and(cGME, GME),
        fuzzy.and(cGE, GE),
        fuzzy.and(cGN, GN),
        fuzzy.and(cGD, GD),
        fuzzy.and(cGMD, GMD)
      )
    }, -Math.PI / 4, Math.PI / 4)
  }
}

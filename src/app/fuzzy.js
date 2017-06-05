export function grade (value, p1, p2) {
  if (value < p1) return 0
  if (value > p2) return 1
  return (value - p1) / (p2 - p1)
}

export function reverseGrade (value, p1, p2) {
  return 1 - grade(value, p1, p2)
}

export function triangle (value, p1, p2, p3) {
  if (value < p2) return grade(value, p1, p2)
  return reverseGrade(value, p2, p3)
}

export function trapezoid (value, p1, p2, p3, p4) {
  if (value < p2) return grade(value, p1, p2)
  return reverseGrade(value, p3, p4)
}

export function and (...values) {
  return Math.min(...values)
}

export function or (...values) {
  return Math.max(...values)
}

export function not (a) {
  return 1 - a
}

const DEFAULT_ITERATIONS = 100
export function defuzzify (f, min, max, iterations) {
  const step = (max - min) / (iterations || DEFAULT_ITERATIONS)
  let num = 0
  let den = 0
  for (let i = min; i < max; i += step) {
    const v = f(i)
    num += v * i
    den += v
  }
  return num / den
}

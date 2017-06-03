import {checkIntersection, colinearPointWithinSegment} from 'line-intersect'

export default function colide (a, b) {
  const { type, point } = checkIntersection(
    a.from.x, a.from.y, a.to.x, a.to.y,
    b.from.x, b.from.y, b.to.x, b.to.y
  )

  if (type == 'colinear') return true

  if (type == 'intersecting') return true

  return false
}

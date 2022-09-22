interface GetDuplicatesAcc<T> {
  value: T
  count: number
}

/**
 * 중복된 데이터들을 반환하는 함수
 */
export function getDuplicates<T>(array: T[]): T[] {
  return array
    .reduce((acc: GetDuplicatesAcc<T>[], current: T) => {
      if (acc.some(({ value }) => value === current)) {
        return acc.map((item) =>
          item.value === current
            ? {
                ...item,
                count: item.count + 1,
              }
            : item
        )
      } else {
        return acc.concat({
          value: current,
          count: 1,
        })
      }
    }, [])
    .reduce((acc: T[], current: GetDuplicatesAcc<T>) => {
      if (current.count > 1) {
        return acc.concat(current.value)
      }

      return acc
    }, [])
}

export function scaleForDomain(domain: [number, number], value: number) {
  const [min, max] = domain

  const gap = max - min

  const scale = value / max

  return min + gap * scale
}

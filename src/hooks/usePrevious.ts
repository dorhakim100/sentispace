import { useState } from 'react'

export const usePrevious = <T>(state: T): T | null => {
  const [tuple, setTuple] = useState<[T | null, T]>([null, state])

  if (tuple[1] !== state) {
    setTuple([tuple[1], state])
  }

  return tuple[0]
}

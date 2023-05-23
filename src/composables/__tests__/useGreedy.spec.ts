import { describe, it, expect } from 'vitest'

import useGreedy, { CoinListInvalidError } from '@/composables/useGreedy'

describe('useClickOutside', () => {
  describe('find minimum number of coins', () => {
    it.each([
      ['initial sample', [1, 5, 10, 25, 50], 63, 5],
      ['imperfect scenario', [1, 5, 6, 9], 11, 3],
      ['change iz zero', [1, 5, 6, 9], 0, 0]
    ])(
      'should find right amount for %s',
      (_, coinList: number[], change: number, expectedAmount: number) => {
        const { findMinimumNumberOfCoins } = useGreedy()

        const coinsForChange = findMinimumNumberOfCoins(coinList, change)

        expect(coinsForChange).toBe(expectedAmount)
      }
    )

    describe('when coin list is empty', () => {
      it('should throw an error', () => {
        const { findMinimumNumberOfCoins } = useGreedy()

        try {
          findMinimumNumberOfCoins([], 10)
        } catch (err) {
          expect(err).toBeInstanceOf(CoinListInvalidError)
        }
      })
    })
  })
})

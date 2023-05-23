type UseGreedyAPI = {
  /**
   * FindMinimumNumberOfCoins defines the minimum number of coins needed
   * for a specific change.
   *
   * @param coinList - list of coins used to find the combination that sums the change
   * @param change - value used to compute combination of coins
   */
  findMinimumNumberOfCoins: (coinList: number[], change: number) => number
  // TODO: add/improve implementation to handle special cases and get the best output
}

/**
 * CoinListInvalidError is a custom error class to identify
 * when coin list parameter is NOT valid
 */
export class CoinListInvalidError extends Error {
  constructor(message: string) {
    super(message)
  }
}

/**
 * useGreedy is a composable that exposes functions implementing greedy algorithms
 * to solve specific cases and scenarios
 */
const useGreedy = (): UseGreedyAPI => {
  const findMinimumNumberOfCoins = (coinList: number[], change: number): number => {
    if (change <= 0) {
      return 0
    }

    if (coinList.length <= 0) {
      throw new CoinListInvalidError('coin list is empty')
    }

    let coinsForChange = 0

    let remainingChange = change

    for (let i = coinList.length - 1; i >= 0; i--) {
      const biggestCoin = coinList[i]

      while (remainingChange >= biggestCoin) {
        coinsForChange++
        remainingChange -= biggestCoin
      }
    }

    return coinsForChange
  }

  return {
    findMinimumNumberOfCoins
  }
}

export default useGreedy

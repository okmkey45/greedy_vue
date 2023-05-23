import { describe, expect, it, afterEach, beforeEach, vi } from 'vitest'
import { DOMWrapper, VueWrapper, shallowMount } from '@vue/test-utils'

const mockFindMinimumNumberOfCoins = vi.fn()
vi.mock('@/composables/useGreedy', () => ({
  default: () => ({
    findMinimumNumberOfCoins: mockFindMinimumNumberOfCoins
  })
}))

import FindMinimumNumberOfCoins from '@/components/organisms/FindMinimumNumberOfCoins.vue'

describe('FindMinimumNumberOfCoins', () => {
  let wrapper: VueWrapper

  const elements = {
    get theInstructions(): VueWrapper {
      return wrapper.findComponent(
        '[data-test-id="FindMinimumNumberOfCoins_theInstructions"]'
      ) as VueWrapper
    },
    get coinListInput(): VueWrapper {
      return wrapper.findComponent(
        '[data-test-id="FindMinimumNumberOfCoins_coinListInput"]'
      ) as VueWrapper
    },
    get changeInput(): VueWrapper {
      return wrapper.findComponent(
        '[data-test-id="FindMinimumNumberOfCoins_changeInput"]'
      ) as VueWrapper
    },
    get errorMessage(): DOMWrapper<HTMLParagraphElement> {
      return wrapper.find('[data-test-id="FindMinimumNumberOfCoins_errorMessage"]')
    },
    get computeButton(): VueWrapper {
      return wrapper.findComponent(
        '[data-test-id="FindMinimumNumberOfCoins_computeButton"]'
      ) as VueWrapper
    },
    get coinsForChangeOutput(): VueWrapper {
      return wrapper.findComponent(
        '[data-test-id="FindMinimumNumberOfCoins_coinsForChangeOutput"]'
      ) as VueWrapper
    }
  }

  const render = () => {
    wrapper = shallowMount(FindMinimumNumberOfCoins, {
      global: {
        stubs: {
          CoinsForChangeOutput: {
            template: '<div><slot name="output" /></div>'
          }
        }
      }
    })
  }

  afterEach(() => {
    vi.resetAllMocks()
  })

  it('should display instructions', () => {
    render()

    expect(elements.theInstructions.exists()).toBe(true)
  })

  it('should display coin list input', () => {
    render()

    expect(elements.coinListInput.exists()).toBe(true)
  })

  it('should display change input', () => {
    render()

    expect(elements.changeInput.exists()).toBe(true)
  })

  it('should display compute button', () => {
    render()

    expect(elements.computeButton.exists()).toBe(true)
  })

  it('should NOT display error message', () => {
    render()

    expect(elements.errorMessage.exists()).toBe(false)
  })

  it('should NOT disable compute button', () => {
    render()

    expect(elements.computeButton.props('disabled')).toBe(false)
  })

  describe('when coin list is empty', () => {
    beforeEach(() => {
      render()

      elements.coinListInput.vm.$emit('update:coinList', [])
    })

    it('should display error message', () => {
      expect(elements.errorMessage.exists()).toBe(true)
    })

    it('should disable compute button', () => {
      expect(elements.computeButton.props('disabled')).toBe(true)
    })
  })

  it('should display output', () => {
    render()

    expect(elements.coinsForChangeOutput.exists()).toBe(true)
  })

  describe('when compute button is clicked', () => {
    const expectedCoinsForChange = 35

    beforeEach(async () => {
      mockFindMinimumNumberOfCoins.mockReturnValue(expectedCoinsForChange)

      render()

      await elements.computeButton.trigger('click')
    })

    it('should display computed coins for change', () => {
      expect(elements.coinsForChangeOutput.text()).toContain(expectedCoinsForChange)
    })
  })
})

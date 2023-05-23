import { describe, it, expect } from 'vitest'
import { DOMWrapper, shallowMount, VueWrapper } from '@vue/test-utils'

import CoinsForChangeOutput from '@/components/organisms/CoinsForChangeOutput.vue'

describe('CoinsForChangeOutput', () => {
  let wrapper: VueWrapper

  const elements = {
    get output(): DOMWrapper<HTMLSpanElement> {
      return wrapper.find('[data-test-id="CoinsForChangeOutput_output"]')
    }
  }

  const defaultProps = (): Params => ({
    outputSlot: '10'
  })

  type Params = {
    outputSlot?: string
  }

  const render = (params: Params = {}) => {
    const { outputSlot = defaultProps().outputSlot } = params

    // TODO: solve lint issue
    wrapper = shallowMount(CoinsForChangeOutput, {
      slots: {
        output: outputSlot
      }
    })
  }

  it('should display output', () => {
    const expectedText = '10000'

    render({ outputSlot: expectedText })

    expect(elements.output.exists()).toBe(true)
    expect(elements.output.text()).toBe(expectedText)
  })
})

import { describe, it, expect } from 'vitest'
import { VueWrapper, shallowMount } from '@vue/test-utils'

import CoinListInput from '@/components/molecules/CoinListInput.vue'

describe('CoinListInput', () => {
  let wrapper: VueWrapper

  const elements = {
    get input(): VueWrapper {
      return wrapper.findComponent('[data-test-id="CoinListInput_input"]') as VueWrapper
    }
  }

  const defaultProps = (): Params => ({
    coinList: [1, 5, 10, 25, 50]
  })

  type Params = {
    coinList: number[]
  }

  const render = (params: Params = defaultProps()) => {
    const { coinList = defaultProps().coinList } = params

    wrapper = shallowMount(CoinListInput, {
      props: { coinList },
      global: {
        stubs: {
          TextInput: {
            props: {
              name: { type: String },
              modelValue: { type: String }
            },
            template: '<div></div>'
          }
        }
      }
    })
  }

  it('should display text input', () => {
    render()

    expect(elements.input.exists()).toBe(true)
  })

  it('should pass a proper string to text input', () => {
    render()

    expect(elements.input.props('modelValue')).toBe('1,5,10,25,50')
  })

  describe('when text input is modified', () => {
    describe('when new value is an empty string', () => {
      it('should emit an event with an empty array', () => {
        render()

        elements.input.vm.$emit('update:modelValue', '')

        expect(wrapper.emitted()).toHaveProperty('update:coinList')

        const updateCoinList = wrapper.emitted('update:coinList') as unknown[][]
        expect(updateCoinList[0]).toEqual([[]])
      })
    })

    describe('when new value is NOT an empty string', () => {
      it('should emit an event with the new value', () => {
        render()

        elements.input.vm.$emit('update:modelValue', '1,5,6,9')

        expect(wrapper.emitted()).toHaveProperty('update:coinList')

        const updateCoinList = wrapper.emitted('update:coinList') as unknown[][]
        expect(updateCoinList[0]).toEqual([[1, 5, 6, 9]])
      })
    })
  })
})

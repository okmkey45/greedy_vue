import { describe, it, expect } from 'vitest'
import { DOMWrapper, shallowMount, VueWrapper } from '@vue/test-utils'

import AppButton from '@/components/atoms/AppButton.vue'

describe('AppButton', () => {
  let wrapper: VueWrapper

  const elements = {
    get button(): DOMWrapper<HTMLTableCellElement> {
      return wrapper.find('[data-test-id="AppButton_button"]')
    }
  }

  const defaultProps = (): Params => ({
    disabled: false,
    defaultSlot: 'some text'
  })

  type Params = {
    disabled?: boolean
    defaultSlot?: string
  }

  const render = (params: Params = {}) => {
    const { disabled = defaultProps().disabled, defaultSlot = defaultProps().defaultSlot } = params

    // TODO: solve lint issue
    wrapper = shallowMount(AppButton, {
      props: { disabled },
      slots: {
        default: defaultSlot
      }
    })
  }

  it('should display button', () => {
    const expectedText = 'click me'

    render({ defaultSlot: expectedText })

    expect(elements.button.exists()).toBe(true)
    expect(elements.button.text()).toBe(expectedText)
  })

  it('should NOT disable button', () => {
    render()

    expect(elements.button.attributes('disabled')).toBeUndefined()
  })

  describe('when disabled prop is true', () => {
    it('should disable button', () => {
      render({ ...defaultProps(), disabled: true })

      expect(elements.button.attributes('disabled')).toBeDefined()
    })
  })
})

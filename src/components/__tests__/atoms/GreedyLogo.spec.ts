import { describe, it, expect } from 'vitest'
import { DOMWrapper, VueWrapper, shallowMount } from '@vue/test-utils'

import GreedyLogo from '@/components/atoms/GreedyLogo.vue'

describe('GreedyLogo', () => {
  let wrapper: VueWrapper

  const elements = {
    get image(): DOMWrapper<HTMLImageElement> {
      return wrapper.find('[data-test-id="GreedyLogo_image"]')
    }
  }

  const render = () => {
    wrapper = shallowMount(GreedyLogo)
  }

  it('should display logo properly', () => {
    render()

    expect(elements.image.exists()).toBe(true)
  })
})

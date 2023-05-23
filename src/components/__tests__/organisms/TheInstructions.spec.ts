import { describe, it, expect } from 'vitest'
import { shallowMount, VueWrapper } from '@vue/test-utils'

import TheInstructions from '@/components/organisms/TheInstructions.vue'

describe('AppButton', () => {
  let wrapper: VueWrapper

  const render = () => {
    wrapper = shallowMount(TheInstructions)
  }

  it('should render component properly', () => {
    render()

    expect(wrapper.exists()).toBe(true)
  })
})

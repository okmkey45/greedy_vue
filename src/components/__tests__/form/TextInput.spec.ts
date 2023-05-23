import { describe, it, expect } from 'vitest'
import { DOMWrapper, VueWrapper, shallowMount } from '@vue/test-utils'

import TextInput from '@/components/form/TextInput.vue'

describe('TextInput', () => {
  let wrapper: VueWrapper

  const elements = {
    get label(): DOMWrapper<HTMLLabelElement> {
      return wrapper.find('[data-test-id="TextInput_label"]')
    },
    get input(): DOMWrapper<HTMLInputElement> {
      return wrapper.find('[data-test-id="TextInput_input"]')
    }
  }

  const defaultProps = (): Params => ({
    name: 'name',
    modelValue: 'greedy smurf',
    labelSlot: 'Name'
  })

  type Params = {
    name: string
    modelValue: string
    labelSlot?: string
  }

  const render = (params: Params = defaultProps()) => {
    const {
      name = defaultProps().name,
      modelValue = defaultProps().modelValue,
      labelSlot = defaultProps().labelSlot
    } = params

    // TODO: solve lint issue
    wrapper = shallowMount(TextInput, {
      props: { name, modelValue },
      slots: {
        label: labelSlot
      }
    })
  }

  it('should display label', () => {
    const expectedLabelContent = 'some custom content for label'

    render({
      ...defaultProps(),
      labelSlot: expectedLabelContent
    })

    expect(elements.label.exists()).toBe(true)
    expect(elements.label.text()).toBe(expectedLabelContent)
  })

  it('should display input', () => {
    const expectedName = 'some custom name for input'

    render({
      ...defaultProps(),
      name: expectedName
    })

    expect(elements.input.exists()).toBe(true)
    expect(elements.input.attributes('type')).toBe('text')
    expect(elements.input.attributes('name')).toBe(expectedName)
    expect(elements.input.attributes('id')).toBe(expectedName)
  })

  describe('when model value is set', () => {
    it('should set value for input', () => {
      const expectedModelValue = 'some other smurf'

      render({
        ...defaultProps(),
        modelValue: expectedModelValue
      })

      expect(elements.input.element.value).toBe(expectedModelValue)
    })
  })

  describe('when input is modified', () => {
    it('should emit an event with the new value', async () => {
      render()

      const expectedModelValue = 'some new value for input'

      await elements.input.setValue(expectedModelValue)

      expect(wrapper.emitted()).toHaveProperty('update:modelValue')

      const updateModelValue = wrapper.emitted('update:modelValue') as unknown[][]
      expect(updateModelValue[0]).toEqual([expectedModelValue])
    })
  })
})

import { describe, it, expect, beforeEach } from 'vitest'
import { DOMWrapper, VueWrapper, shallowMount } from '@vue/test-utils'

import NumberInput from '@/components/form/NumberInput.vue'
import { before } from 'node:test'

describe('NumberInput', () => {
  let wrapper: VueWrapper

  const elements = {
    get label(): DOMWrapper<HTMLLabelElement> {
      return wrapper.find('[data-test-id="NumberInput_label"]')
    },
    get input(): DOMWrapper<HTMLInputElement> {
      return wrapper.find('[data-test-id="NumberInput_input"]')
    }
  }

  const defaultProps = (): Params => ({
    name: 'age',
    modelValue: 10,
    labelSlot: 'Age'
  })

  type Params = {
    name: string
    modelValue: number
    labelSlot?: string
  }

  const render = (params: Params = defaultProps()) => {
    const {
      name = defaultProps().name,
      modelValue = defaultProps().modelValue,
      labelSlot = defaultProps().labelSlot
    } = params

    // TODO: solve lint issue
    wrapper = shallowMount(NumberInput, {
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
    expect(elements.input.attributes('type')).toBe('number')
    expect(elements.input.attributes('name')).toBe(expectedName)
    expect(elements.input.attributes('id')).toBe(expectedName)
  })

  describe('when model value is set', () => {
    it('should set value for input', () => {
      const expectedModelValue = 20

      render({
        ...defaultProps(),
        modelValue: expectedModelValue
      })

      expect(elements.input.element.value).toBe(String(expectedModelValue))
    })
  })

  describe('when input is modified', () => {
    describe('when new is empty', () => {
      const expectedModelValue = ''

      beforeEach(async () => {
        render()

        await elements.input.setValue(expectedModelValue)
      })

      it('should NOT emit an event', () => {
        expect(wrapper.emitted()).not.toHaveProperty('update:modelValue')
      })

      describe('when input is blurred', () => {
        beforeEach(async () => {
          await elements.input.trigger('blur')
        })

        it('should emit an event with zero', () => {
          expect(wrapper.emitted()).toHaveProperty('update:modelValue')

          const updateModelValue = wrapper.emitted('update:modelValue') as unknown[][]
          expect(updateModelValue[0]).toEqual([0])
        })
      })
    })

    describe('when new is NOT empty', () => {
      const expectedModelValue = 20

      beforeEach(async () => {
        render()

        await elements.input.setValue(expectedModelValue)
      })

      it('should emit an event with the new value', () => {
        expect(wrapper.emitted()).toHaveProperty('update:modelValue')

        const updateModelValue = wrapper.emitted('update:modelValue') as unknown[][]
        expect(updateModelValue[0]).toEqual([expectedModelValue])
      })

      describe('when input is blurred', () => {
        beforeEach(async () => {
          await elements.input.trigger('blur')
        })

        it('should NOT emit more events', () => {
          expect(wrapper.emitted()).toHaveProperty('update:modelValue')

          const updateModelValue = wrapper.emitted('update:modelValue') as unknown[][]
          // Note: having length of 1 means that only previous input modification triggered this event
          expect(updateModelValue).toHaveLength(1)
        })
      })
    })
  })
})

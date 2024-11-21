import {
  required,
  min,
  max,
  email,
  confirmed,
  alpha_spaces as alphaSpaces,
  min_value as minValue,
  max_value as maxValue,
} from '@vee-validate/rules'
import {
  Form as VeeForm,
  Field as VeeField,
  ErrorMessage,
  defineRule,
  configure,
} from 'vee-validate'

export default {
  install(app) {
    app.component('VeeForm', VeeForm)
    app.component('VeeField', VeeField)
    app.component('ErrorMessage', ErrorMessage)

    // Define the validation rules
    defineRule('required', required)
    defineRule('tos', required)
    defineRule('min', min)
    defineRule('max', max)
    defineRule('email', email)
    defineRule('confirmed', confirmed)
    defineRule('alphaSpaces', alphaSpaces)
    defineRule('minValue', minValue)
    defineRule('maxValue', maxValue)

    configure({
      generateMessage: (ctx) => {
        const messages = {
          required: `The field ${ctx.field} is required.`,
          min: `The field ${ctx.field} is too short.`,
          max: `The field ${ctx.field} is too long.`,
          email: `The field ${ctx.field} must be a valid email.`,
          confirmed: `The field ${ctx.field} does not match.`,
          alphaSpaces: `The field ${ctx.field} may only contain alphabetic characters and spaces.`,
          minValue: `The field ${ctx.field} is too low.`,
          maxValue: `The field ${ctx.field} is too high.`,
          tos: `You must accept the Terms of Service.`,
        }

        const message = messages[ctx.rule.name]
          ? messages[ctx.rule.name]
          : `The field ${ctx.field} is invalid.`

        return message
      },
      validateOnBlur: true,
      validateOnChange: true,
      validateOnInput: false,
      validateOnModelUpdate: true,
    })
  },
}

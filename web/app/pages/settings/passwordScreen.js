import ATV from 'atvjs'
import password from './passwordTemplate.hbs'

let data

const PasswordScreen = ATV.Page.create({
  name: 'password',
  template: password,
  ready (options, resolve, reject) {
    data = {
      username: options.username,
      pass: ''
    }
    resolve(options)
  },
  onSelect: function (e) {
    let element = e.target
    let elementType = element.nodeName.toLowerCase()
  },
  afterReady (doc) {
    const backFunction = () => {
      console.log('Neco se deje')
      ATV.Navigation.navigate('settings', {}, true)
    }

    const nextFunction = () => {
      let textField = doc.getElementsByTagName('textField').item(0)
      let keyboard = textField.getFeature('Keyboard')

      data.pass = keyboard.text
      ATV.Navigation.navigate('settings', data, true)
    }
    doc
      .getElementById('back')
      .addEventListener('select', backFunction)

    doc
      .getElementById('next')
      .addEventListener('select', nextFunction)
  }
})

export default PasswordScreen

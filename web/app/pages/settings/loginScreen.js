import ATV from 'atvjs'
import login from './loginTemplate.hbs'

import PasswordScreen from './passwordScreen.js'

const LoginScreen = ATV.Page.create({
  name: 'login',
  template: login,
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
      ATV.Navigation.navigate('password', {username: keyboard.text}, true)
    }
    doc
      .getElementById('back')
      .addEventListener('select', backFunction)

    doc
      .getElementById('next')
      .addEventListener('select', nextFunction)
  }
})

export default LoginScreen

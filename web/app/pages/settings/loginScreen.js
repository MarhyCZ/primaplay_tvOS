import ATV from 'atvjs'
import login from './loginTemplate.hbs'

import PasswordScreen from './passwordScreen.js'

const LoginScreen = ATV.Page.create({
  name: 'login',
  template: login,
  afterReady (doc) {
    let textField = doc.getElementsByTagName('textField').item(0)
    let keyboard = textField.getFeature('Keyboard')
    keyboard.text = ATV.Settings.get('username')

    const nextFunction = () => {
      let textField = doc.getElementsByTagName('textField').item(0)
      let keyboard = textField.getFeature('Keyboard')
      ATV.Navigation.navigate('password', {'username' : keyboard.text})
    }

    doc
      .getElementById('next')
      .addEventListener('select', nextFunction)
  }
})

export default LoginScreen

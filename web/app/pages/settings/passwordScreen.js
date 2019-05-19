import ATV from 'atvjs'
import API from 'lib/prima.js'
import password from './passwordTemplate.hbs'

const PasswordScreen = ATV.Page.create({
  name: 'password',
  template: password,
  ready (options, resolve, reject) {
    this.username = options['username']
    let data = {
      username: options['username']
    }
    resolve(data)
  },
  afterReady (doc) {
    const nextFunction = () => {
      let textField = doc.getElementsByTagName('textField').item(0)
      let keyboard = textField.getFeature('Keyboard')

      let username = this.username
      let password = keyboard.text
      try {
        API.loginAndGetRefreshToken(username, password);
        ATV.Settings.set('username', username)
        ATV.Settings.set('password', password)
        ATV.Navigation.clear()
        ATV.Navigation.navigate('settings')
      }
      catch (ex) {
        ATV.Navigation.showError({
          data: {
            title: 'Chyba při přihlášení',
            message: ex.userMessage
          }
        })
      }
    }

    doc
      .getElementById('next')
      .addEventListener('select', nextFunction)
  }
})

export default PasswordScreen

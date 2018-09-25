import ATV from 'atvjs'
import password from './passwordTemplate.hbs'

const PasswordScreen = ATV.Page.create({
  name: 'password',
  template: password,
  ready (options, resolve, reject) {
    let data = {
      username: ATV.Settings.get('refresh_token')
    }
    resolve(data)
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

      ATV.Settings.set('password', keyboard.text)
      ATV.Navigation.navigate('settings', {}, true)
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

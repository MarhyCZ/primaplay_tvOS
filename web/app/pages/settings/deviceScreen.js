import ATV from 'atvjs'
import device from './deviceTemplate.hbs'

import API from 'lib/prima.js'

const DeviceScreen = ATV.Page.create({
  name: 'device',
  template: device,
  ready (options, resolve, reject) {
    let data = {
      username: ATV.Settings.get('refresh_token')
    }
    resolve(data)
  },
  afterReady (doc) {
    let textField = doc.getElementsByTagName('textField').item(0)
    let keyboard = textField.getFeature('Keyboard')
    keyboard.text = 'Apple TV'

    const nextFunction = () => {
      let textField = doc.getElementsByTagName('textField').item(0)
      let keyboard = textField.getFeature('Keyboard')

      try {
        if (API.registerDevice('Apple TV') === true) {
          ATV.Navigation.clear()
          ATV.Navigation.navigate('settings')
        }
      }
      catch (ex) {
        ATV.Navigation.showError({
          data: {
            title: 'Chyba při registraci',
            message: ex.userMessage
          },
            type: 'document'
          })
      }
    }

    doc
      .getElementById('next')
      .addEventListener('select', nextFunction)
  }
})

export default DeviceScreen

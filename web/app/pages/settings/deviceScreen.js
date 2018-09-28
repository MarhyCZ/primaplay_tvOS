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

    const backFunction = () => {
      console.log('Neco se deje')
      ATV.Navigation.navigate('settings', {}, true)
    }

    const nextFunction = () => {
      let textField = doc.getElementsByTagName('textField').item(0)
      let keyboard = textField.getFeature('Keyboard')

      if (API.registerDevice('Apple TV') === true) {
        ATV.Navigation.navigate('settings', { deviceTitle: keyboard.text }, true)
      } else {
        ATV.Navigation.showError({
          data: {
            title: 'Chyba',
            message: 'Chyba pri registraci'
          },
          type: 'document'
        })
      }
    }

    doc
      .getElementById('back')
      .addEventListener('select', backFunction)

    doc
      .getElementById('next')
      .addEventListener('select', nextFunction)
  }
})

export default DeviceScreen

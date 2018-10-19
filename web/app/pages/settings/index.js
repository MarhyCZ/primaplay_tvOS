import ATV from 'atvjs'
import template from './template.hbs'

import LoginScreen from './loginScreen.js'
import DeviceScreen from './deviceScreen.js'

import API from 'lib/prima.js'
const _ = ATV._
let premium = false

const SettingsPage = ATV.Page.create({
  name: 'settings',
  template: template,
  ready (options, resolve, reject) {
    if (_.isUndefined(ATV.Settings.get('password'))) {
      resolve(template)
    } else {
      // let login = ATV.Ajax
      //   .post(API.url.token, API.xhrOptions({
      //     grant_type: 'password',
      //     password: options.pass,
      //     username: options.username
      //   }))

      let login = API.makeToken()
      let getUserInfo = ATV.Ajax.get(API.url.profile, API.primaGet())

      Promise
        .all([getUserInfo])
        .then((xhrs) => {
          let response = xhrs[0].response
          console.log(response)
          let premiumInfo = {}
          if (response.level.localeCompare('PREMIUM') === 0) {
            premium = true
            let registerState = _.isEmpty(ATV.Settings.get('SlotID')) ? 'Registrováno' : 'Neregistrováno'
            premiumInfo.registerState = registerState
          }

          resolve({
            response,
            premium: premiumInfo
          })
        }, (xhr) => {
          let response = xhr.response
          // error
          ATV.Navigation.showError({
            data: {
              title: 'Chyba',
              message: response.userMessage
            },
            type: 'modal'
          })
        })
    }
  },
  onSelect: function (e) {
    let element = e.target
    let elementType = element.nodeName.toLowerCase()
  },
  afterReady (doc) {
    const beginLogin = () => {
      ATV.Navigation.navigate('login', {}, true)
    }

    const backToMenu = () => {
      ATV.Navigation.navigateToMenuPage()
    }

    const registerDevice = () => {
      ATV.Navigation.navigate('device', {}, true)
    }

    doc
      .getElementById('login')
      .addEventListener('select', beginLogin)

    doc
      .getElementById('menu')
      .addEventListener('select', backToMenu)

    if (premium) {
      doc
        .getElementById('device')
        .addEventListener('select', registerDevice)
    }
  }
})

export default SettingsPage

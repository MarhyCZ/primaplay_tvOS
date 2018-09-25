import ATV from 'atvjs'
import template from './template.hbs'

import LoginScreen from './loginScreen.js'

import API from 'lib/prima.js'
const _ = ATV._

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
          resolve(response)
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

    doc
      .getElementById('login')
      .addEventListener('select', beginLogin)

    doc
      .getElementById('menu')
      .addEventListener('select', backToMenu)
  }
})

export default SettingsPage

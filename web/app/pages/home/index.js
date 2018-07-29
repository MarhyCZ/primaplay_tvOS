import ATV from 'atvjs'
import template from './template.hbs'

import API from 'lib/prima.js'

const HomePage = ATV.Page.create({
  name: 'home',
  template: template,
  ready (options, resolve, reject) {
    console.log(API.url.homescreen)
    let homescreen = ATV.Ajax.get(API.url.homescreen)

    // Then resolve them at once
    Promise
      .all([homescreen])
      .then((xhrs) => {
        let homescreen = xhrs[0].response

        resolve({
          categories: API.get.categories,
          banner: homescreen.result[0].result,
          doporucujeme: homescreen.result[1].result,
          porady: homescreen.result[2].result,
          primaFilmy: homescreen.result[3].result,
          primaVareni: homescreen.result[4].result,
          dokumenty: homescreen.result[5].result,
          coolSerose: homescreen.result[6].result,
          primaZpravy: homescreen.result[7].result,
          nejnovejsiEpizody: homescreen.result[8].result

        })
      }, (xhr) => {
        // error
        reject()
      })
  }
})

export default HomePage

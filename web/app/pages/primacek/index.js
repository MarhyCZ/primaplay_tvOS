import ATV from 'atvjs'
import template from './template.hbs'

import API from 'lib/prima.js'

const PrimacekPage = ATV.Page.create({
  name: 'primacek',
  template: template,
  ready (options, resolve, reject) {
    let primacek = ATV.Ajax.get(API.url.primacek)

    // Then resolve them at once
    Promise
      .all([primacek])
      .then((xhrs) => {
        let primacek = xhrs[0].response

        resolve({
          banner: primacek.result[0].result,
          proNejmensi: primacek.result[1].result,
          filmy: primacek.result[2].result,
          serialy: primacek.result[3].result

        })
      }, (xhr) => {
        // error
        reject()
      })
  }
})

export default PrimacekPage

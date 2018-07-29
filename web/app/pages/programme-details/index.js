import ATV from 'atvjs'

import template from './template.hbs'
import API from 'lib/prima.js'

// const _ = ATV._

var ProgrammeDetailsPage = ATV.Page.create({
  name: 'programme-details',
  template: template,
  ready: function (options, resolve, reject) {
    // get data from multiple requests
    // ATV.Navigation.showLoading({data : {message: 'Načítání'}});

    let getProgrammeDetails = ATV.Ajax.get(API.url.itemDetail(options.id))

    // Then resolve them at once
    Promise
      .all([getProgrammeDetails])
      .then((xhrs) => {
        // Modifikace detailů
        let details = xhrs[0].response

        resolve({
          details: details
        })
      }, (xhr) => {
        // error
        reject()
      })
  }
})

export default ProgrammeDetailsPage

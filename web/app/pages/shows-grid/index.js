import ATV from 'atvjs'
import template from './template.hbs'

import API from 'lib/prima.js'

const ShowsGridPage = ATV.Page.create({
  name: 'shows-grid',
  template: template,
  ready (options, resolve, reject) {
    let getShows = ATV.Ajax.get(API.url.itemsList({
      filter: options.parameters.filter,
      limit: 60,
      offset: 0
    }))

    // Then resolve them at once
    Promise
      .all([getShows])
      .then((xhrs) => {
        let shows = xhrs[0].response

        resolve({
          shows: shows.result,
          options: options

        })
      }, (xhr) => {
        // error
        reject()
      })
  }
})

export default ShowsGridPage

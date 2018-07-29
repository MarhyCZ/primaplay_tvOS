import ATV from 'atvjs'
import template from './template.hbs'

import API from 'lib/prima.js'

const EpisodesPage = ATV.Page.create({
  name: 'episodes-list',
  template: template,
  ready (options, resolve, reject) {
    let product
    let order
    if (options.key) {
      product = options.key
      order = 'first'
    } else {
      product = options.id
      order = 'latest'
    }
    let getEpisodes = ATV.Ajax.get(API.url.itemsList({
      category: 'EPISODE',
      limit: 20,
      offset: 0,
      relProduct: product,
      order: order
    }))

    // Then resolve them at once
    Promise
      .all([getEpisodes])
      .then((xhrs) => {
        let episodes = xhrs[0].response

        resolve({
          episodes: episodes.result

        })
      }, (xhr) => {
        // error
        reject()
      })
  }
})

export default EpisodesPage

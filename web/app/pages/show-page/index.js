import ATV from 'atvjs'

import template from './template.hbs'
import API from 'lib/prima.js'

var AlphabetLetterPage = ATV.Page.create({
  name: 'show-page',
  template: template,
  ready: function (options, resolve, reject) {
    let getShowInfo = ATV.Ajax.get(API.url.itemDetail(options.id))
    let getShowContent = ATV.Ajax.get(API.url.itemContent(options.id))
    let getShowSeasons = ATV.Ajax.get(API.url.seasonsList(options.id))

    // Then resolve them at once
    // Old template {{{programmeImg ../showInfo.ID ID}}}
    Promise
      .all([getShowInfo, getShowContent, getShowSeasons])
      .then((xhrs) => {
        let showInfo = xhrs[0].response
        let showContent = xhrs[1].response
        let showSeasons = xhrs[2].response
        console.log(showInfo)
        // console.log(xhrs[0].response)

        resolve({
          showInfo: showInfo,
          episodes: showContent.result[0].result,
          bonuses: showContent.result[1].result,
          recommended: showContent.result[2].result,
          seasons: showSeasons.result

        })
      }, (xhr) => {
        // error
        reject()
      })
  }
})

export default AlphabetLetterPage

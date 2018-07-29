import ATV from 'atvjs'

import template from './template.hbs'
import API from 'lib/prima.js'

const LivePage = ATV.Page.create({
  name: 'live',
  template,
  ready (options, resolve, reject) {
    // get data from multiple requests
    let channels = API.get.liveChannels
    let getEpg = ATV.Ajax.get(API.url.epg('now'))
    let getProgress = ATV.Ajax.get(API.url.progress)

    // Then resolve them at once
    Promise
      .all([getEpg, getProgress])
      .then((xhrs) => {
        // Modifikace kanálů
        let epg = xhrs[0].response
        let progress = xhrs[1].response
        // console.log(channels)
        // console.log(xhrs[1].response)

        // Merge percentage progress from iPrima with channels object by creating new key e.g. channels[1].progress
        Object.entries(channels).forEach(([key, value]) => {
          value.progress = progress[value.progressTitle].percentage
          value.epg = epg[value.epgOrder].days[0].programs[0]
          console.log(value)
        })

        resolve({
          channels: channels
        })
      }, (xhr) => {
        // error
        reject(xhr)
      })
  }
})

export default LivePage

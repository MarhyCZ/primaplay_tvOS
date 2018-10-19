import ATV from 'atvjs'
import staticData from './static-data'
import uuidv4 from 'uuid/v4'

const _ = ATV._ // lodash

// import qs from 'qs';

const BASE_URL = 'https://api.play-backend.iprima.cz/api/v1'

const toQueryString = obj => (
  _.map(obj, (v, k) => {
    if (_.isArray(v)) {
      return (_.map(v, av => `${k}[]=${av}`)).join('&')
    }
    return `${encodeURIComponent(k)}=${encodeURIComponent(v)}`
  })
).join('&')

const makeToken = () => {
  let user = ATV.Settings.get('username')
  let pass = ATV.Settings.get('password')
  const params = `grant_type=password&username=${user}&password=${pass}`

  const http = new XMLHttpRequest()
  http.open('POST', url.token, false)
  http.responseType = 'json'
  http.setRequestHeader('Content-type', 'application/x-www-form-urlencoded')
  http.send(params)

  if (http.status === 200) {
    const token = http.response.access_token
    const refreshID = http.response.refresh_token
    console.log('ref:' + refreshID)
    // Save to Apple TV localStorage
    ATV.Settings.set('refresh_token', refreshID)
    console.log(http.response)
    return token
  }
  return 'Neco se pokazilo'
}

const refreshToken = () => {
  const refreshID = ATV.Settings.get('refresh_token')
  const body = `grant_type=refresh_token&refresh_token=${refreshID}`
  console.log('refreshParameters: ' + body)

  const http = new XMLHttpRequest()
  http.open('POST', url.token, false)
  http.responseType = 'json'
  http.setRequestHeader('Content-type', 'application/x-www-form-urlencoded')
  http.send(body)

  if (http.status === 200) {
    const token = http.response.access_token
    console.log('Refreshuji:')
    console.log(token)
    return token
  }
  return ''
}

const registerDevice = (title) => {
  let uid = ATV.Settings.get('deviceUID')
  if (uid === undefined) {
    uid = uuidv4()
    ATV.Settings.set('deviceUID', uid)
  }
  let body = JSON.stringify({
    'title': title,
    'deviceUID': uid,
    'slotType': 'IOS'
  })

  let access_token = refreshToken()
  const http = new XMLHttpRequest()
  http.open('POST', url.slots, false)
  http.responseType = 'json'
  http.setRequestHeader('Content-type', 'application/json')
  http.setRequestHeader('X-OTT-Access-Token', access_token)
  http.send(body)

  if (http.status === 200) {
    const slotId = http.response.slotId
    console.log('Ziskavam a ukladam slotID:')
    console.log(slotId)
    ATV.Settings.set('slotID', slotId)
    return true
  }
  console.log(http.response)
  return false
}

const primaGet = () => {
  let slotId = ATV.Settings.get('slotID')
  let refreshID = ATV.Settings.get('refresh_token')

  let headers
  if (_.isEmpty(slotId) && !_.isEmpty(refreshID)) {
    headers = {
      'X-OTT-Access-Token': refreshToken()
    }
  }
  if (!_.isEmpty(slotId)) {
    headers = {
      'X-OTT-Access-Token': refreshToken(),
      'X-OTT-Device': slotId
    }
  }
  return {
    responseType: 'json',
    headers: headers
  }
}

const xhrOptions = (params) => {
  // const baseParams = {
  //   token: makeToken()
  // }
  console.log(`${toQueryString()}&${toQueryString(params)}`)
  return {
    data: `${toQueryString(params)}`,
    headers: {
      'Content-type': 'application/x-www-form-urlencoded'
    },
    responseType: 'json'
  }
}

const url = {
  // URLS Generators
  get homescreen () {
    return `${BASE_URL}/lists/carousels/avod`
  },
  get primacek () {
    return `${BASE_URL}/lists/carousels/kids`
  },
  itemDetail (id) {
    return `${BASE_URL}/products/id-${id}/detail`
  },
  play (id) {
    return `${BASE_URL}/products/id-${id}/play`
  },
  // Episodes, bonuses, recommended
  itemContent (id) {
    return `${BASE_URL}/lists/carousels/prod-${id}`
  },
  seasonsList (id) {
    return `${BASE_URL}/codebook/seasons/ser-${id}`
  },
  // category=EPISODE&limit=20&offset=0&relProduct=p14877&order=latest
  itemsList (obj) {
    return `${BASE_URL}/products/?${toQueryString(obj)}`
  },
  // 2018-07-09
  epg (time) {
    return `${BASE_URL}/epg/${time}`
  },
  get progress () {
    return 'https://www.iprima.cz/iprima-api/TvProgram/LivePreview/PercentageUpdate?' +
            'ids[]=prima&ids[]=max&ids[]=cool&ids[]=krimi&ids[]=love&ids[]=zoom'
  },
  get token () {
    return `${BASE_URL}/oauth/token`
  },
  get profile () {
    return `${BASE_URL}/user/profile`
  },
  get slots () {
    return `${BASE_URL}/user/slots`
  },
  search (query) {
    return `${BASE_URL}/search/products/?limit=10&offset=0&query=${query}`
  }
}

const get = {
  get categories () {
    return staticData.categories
  },
  get liveChannels () {
    return staticData.liveChannels
  }
}

export default {
  xhrOptions,
  primaGet,
  makeToken,
  registerDevice,
  url,
  get
}

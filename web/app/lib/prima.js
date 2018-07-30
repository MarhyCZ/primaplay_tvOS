import ATV from 'atvjs'
import staticData from './static-data'

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
  const params = `grant_type=password&username=${neco}&password=${neco}`

  const http = new XMLHttpRequest()
  http.open('POST', url.token, false)
  http.setRequestHeader('Content-type', 'application/x-www-form-urlencoded')
  http.send(params)

  if (http.status === 200) {
    const token = http.response.access_token
    console.log(token)
    return token
  }
  return 'Neco se pokazilo'
}

const xhrOptions = (params) => {
  const baseParams = {
    token: makeToken()
  }
  console.log(`${toQueryString(baseParams)}&${toQueryString(params)}`)
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
  url,
  get
}

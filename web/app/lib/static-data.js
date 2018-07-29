export const categories = [
  { title: 'Oblíbené seriály', parameters: { filter: 'allSeries' } },
  { title: 'Oblíbené pořady', parameters: { filter: 'allShows' } },
  { title: 'Minulý týden v TV', parameters: { availability: 'catchUp', section: 'HOME' } }
]
const THUMB_BASE_URL = 'http://prima-ott-live.ssl.cdn.cra.cz/channels'

export const liveChannels = [
  { title: 'Prima Family',
    id: 'p111013',
    channelLogo: '/img/channels/prima.png',
    tintColor: '#f47a20',
    progressTitle: 'prima',
    epgOrder: 0,
    thumb: `${THUMB_BASE_URL}/prima_family/thumbnail.jpg`
  },
  { title: 'Prima COOL',
    id: 'p111014',
    channelLogo: '/img/channels/primacool.png',
    tintColor: '#13dc13',
    progressTitle: 'cool',
    epgOrder: 2,
    thumb: `${THUMB_BASE_URL}/prima_cool/thumbnail.jpg`
  },
  { title: 'Prima MAX',
    id: 'p111017',
    channelLogo: '/img/channels/primamax.png',
    tintColor: '#c3242a',
    progressTitle: 'max',
    epgOrder: 1,
    thumb: `${THUMB_BASE_URL}/prima_max/thumbnail.jpg`
  },
  { title: 'Prima Krimi',
    id: 'p432829',
    channelLogo: '/img/channels/primakrimi.png',
    tintColor: '#bfa301',
    progressTitle: 'krimi',
    epgOrder: 5,
    thumb: `${THUMB_BASE_URL}/prima_krimi/thumbnail.jpg`
  },
  { title: 'Prima Love',
    id: 'p111016',
    channelLogo: '/img/channels/primalove.png',
    tintColor: '#ee4d9b',
    progressTitle: 'love',
    epgOrder: 4,
    thumb: `${THUMB_BASE_URL}/prima_love/thumbnail.jpg`
  },
  { title: 'Prima ZOOM',
    id: 'p111015',
    channelLogo: '/img/channels/primazoom.png',
    tintColor: '#0096ec',
    progressTitle: 'zoom',
    epgOrder: 3,
    thumb: `${THUMB_BASE_URL}/prima_zoom/thumbnail.jpg`
  }
]
export default {
  categories,
  liveChannels
}

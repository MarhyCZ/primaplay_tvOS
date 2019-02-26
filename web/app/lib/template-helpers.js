import ATV from 'atvjs'
import Handlebars from 'handlebars'

const _ = ATV._

function assetUrl (name) {
  return `${ATV.launchOptions.BASEURL}assets/${name}`
}

// deprecated
function programmeImage (showId, programmeId) {
  if (typeof programmeId === 'object') {
    return `${imageBaseUrl}program/porady/${showId}/foto/uni.jpg?`
  }
  return `${imageBaseUrl}program/porady/${showId}/foto/uni_${programmeId}.jpg?`
}

const helpers = {
  toJSON (obj = {}) {
    let str
    try {
      str = JSON.stringify(obj)
    } catch (ex) {
      str = '{}'
    }
    return str
  },
  asset_url (asset) {
    return new Handlebars.SafeString(assetUrl(asset))
  },
  // 680x384
  cover169 (imageID) {
    let url = `https://static.play-backend.iprima.cz/cdn/img/cover169/${imageID}/p_xxxhdpi`
    return new Handlebars.SafeString(url)
  },
  // 440x520
  coverWeb (imageID) {
    let url = `https://static.play-backend.iprima.cz/cdn/img/coverWeb/${imageID}/big`
    return new Handlebars.SafeString(url)
  },
  // 1920x1080
  splash169 (imageID) {
    let url = `https://static.play-backend.iprima.cz/cdn/img/splash169/${imageID}/l_xxxhdpi`
    return new Handlebars.SafeString(url)
  },
  // 1920x880, medium = 960x440
  splashAWeb (imageID) {
    let url = `https://static.play-backend.iprima.cz/cdn/img/splashAWeb/${imageID}/big`
    return new Handlebars.SafeString(url)
  },
  // 1600x550
  splashWeb (imageID) {
    let url = `https://static.play-backend.iprima.cz/cdn/img/splashWeb/${imageID}/big`
    return new Handlebars.SafeString(url)
  },
  showOrMovie (productCategory) {
    let page = productCategory === 'MOVIE' ? 'programme-details' : 'show-page'
    return new Handlebars.SafeString(page)
  }
}

// register all helpers
_.each(helpers, (fn, name) => Handlebars.registerHelper(name, fn))

export default helpers

/* Unused

function imageUrl(name) {
    return ((_.startsWith(name, 'http://') || _.startsWith(name, 'https://')) ? name : `${ATV.launchOptions.BASEURL}assets/img/${name}`);
}

function backgroundImage(img = '', className = '') {
    return `<background><img class="${className}" src="${imageUrl(img)}" /></background>`;
}

img_url(img) {
  return new Handlebars.SafeString(imageUrl(img));
},
background_image(img) {
  return new Handlebars.SafeString(backgroundImage(img));
},
poster_url(size) {
  return new Handlebars.SafeString(`${imageBaseUrl}${size}`);
},
duration(duration) {
  return new Handlebars.SafeString(formatDuration(duration));
},
toFixed(popularity) {
  return Number.prototype.toFixed.call(popularity, 2);
},
pushJSON(obj1 = {}, obj2 = {}) {
  obj1.push(obj2);
  return toJSON(obj1);
}
 */

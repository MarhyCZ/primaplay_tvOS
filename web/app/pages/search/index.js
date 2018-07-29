import ATV from 'atvjs'
import template from './template.hbs'

import API from 'lib/prima.js'

const SearchPage = ATV.Page.create({
  name: 'search',
  template: template,
  events: {
    select: 'onSelect',
    highlight: 'onHighlight',
    change: 'onChange'
  },
  onSelect (e) {
    let element = e.target
    console.log(element)
  },
  onChange (e) {
    let element = e.target
    console.log(element)
  },
  afterReady (doc) {
    const makeSearch = (text) => {
      console.log(text)
      let getResults = function (callback) {
        ATV.Ajax
          .get(API.url.search(text))
          .then(function (xhr) {
            // xhr succeeded
            var vysledky = xhr.response
            console.log('Response')
            console.log(vysledky)
            // call resolve with the data that will be applied to the template
            // you can even call resolve with false to skip navigation
            callback(vysledky)
          }, function (xhr) {
            // xhr failed
            var response = xhr.response

            console.log(response)
          })
      }
      getResults(function (currentResponse) {
        // ATV.Navigation.navigate(doc, ATV._.extend(currentResponse), true)
        ATV.Navigation.navigate('search', ATV._.extend(currentResponse), true)
      })
    }

    var searchField = doc.getElementById('searchField') // get the searchField element
    var keyboard = searchField.getFeature('Keyboard') // get the keyboard of the searchField
    keyboard.onTextChange = function () { // register listener on event onTextChange
      makeSearch(keyboard.text) // do something with the current text
    }
  }

})

export default SearchPage

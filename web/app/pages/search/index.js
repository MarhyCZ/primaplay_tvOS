import ATV from 'atvjs'
import template from './template.hbs'
import resultsTemplate from './resultsTemplate.hbs'

import API from 'lib/prima.js'

const SearchPage = ATV.Page.create({
  name: 'search',
  template: template,
  afterReady (doc) {
    var searchField = doc.getElementById('searchField') // get the searchField element
    var keyboard = searchField.getFeature('Keyboard') // get the keyboard of the searchField
    keyboard.onTextChange = function () { // register listener on event onTextChange
      makeSearch(keyboard.text) // do something with the current text
    }

    const makeSearch = (text) => {
      console.log(text)

      let getResults = function (callback) {
        ATV.Ajax
          .get(API.url.search(text))
          .then(function (xhr) {
            // xhr succeeded
            var vysledky = xhr.response
            // console.log('Response')
            // console.log(vysledky)
            callback(vysledky)
          }, function (xhr) {
            // xhr failed
            var response = xhr.response
            console.log(response)
          })
      }
      getResults(function (currentResponse) {
        doc.getElementById('results').innerHTML = 'Výsledky'
        // let parsed = ATV.Page.makeDom({
        //  template: resultsTemplate,
        //  data: currentResponse
        // })
        let parsed = resultsTemplate(currentResponse)
        console.log('Ted to prijde')
        console.log(parsed)
        doc.getElementById('replace').innerHTML = parsed
        // ATV.Navigation.navigate('search', ATV._.extend(currentResponse), true)
      })
    }
  }

})

export default SearchPage

import ATV from 'atvjs'

import API from 'lib/prima.js'

// const _ = ATV._;

const PlayPage = ATV.Page.create({
  name: 'play',
  ready (options, resolve, reject) {
    const getPlaylistUrl = ATV.Ajax.get(API.url.play(options.id), API.primaGet())

    // Then resolve them at once
    Promise
      .all([getPlaylistUrl])
      .then((xhrs) => {
        const playlistUrl = xhrs[0].response.streamInfos[0].url
        console.log(playlistUrl)

        // Iterate and stack up the playlist queue [0].streamUrls.main

        const player = new Player()
        const tvosPlaylist = new Playlist()
        const mediaItem = new MediaItem('video', playlistUrl)
        // mediaItem.artworkImageURL = value.previewImageUrl
        // mediaItem.title = value.title

        tvosPlaylist.push(mediaItem)
        player.playlist = tvosPlaylist
        player.play()

        resolve(false)
      }, (xhr) => {
        // error
        let response = xhr.response
        ATV.Navigation.showError({
          data: {
            title: 'Chyba',
            message: response.userMessage
          },
          type: 'document'
        })
      })
  }
})

export default PlayPage

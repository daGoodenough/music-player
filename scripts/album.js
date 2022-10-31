var createSongRow = function (songNumber, songName, songLength) {
  var template =
    '<tr class="album-view-song-item">' +
    '  <td class="song-item-number" data-song-number="' +
    songNumber +
    '">' +
    songNumber +
    "</td>" +
    '  <td class="song-item-title">' +
    songName +
    "</td>" +
    '  <td class="song-item-duration">' +
    songLength +
    "</td>" +
    "</tr>";
  var $row = $(template);

  function handleSongClick() {
    clickedSongNumber = $(this).attr("data-song-number");

    if (currentlyPlayingSongNumber !== null) {
      let currentPlayingCell = $('.song-item-number[data-song-number="' + currentlyPlayingSongNumber + '"]')
      currentPlayingCell.html(currentlyPlayingSongNumber)
    }

    if (clickedSongNumber !== currentlyPlayingSongNumber) {
      $(this).html(pauseButtonTemplate);
      currentlyPlayingSongNumber = clickedSongNumber;

      setSong();
    } else {
      currentlyPlayingSongNumber = null;
      $(this).html(clickedSongNumber);
    }
  }

  function onHover() {
    let songItem = $(this).find(".song-item-number");

    if (songItem.attr("data-song-number") !== currentlyPlayingSongNumber) {
      songItem.html(playButtonTemplate);
    }
  }

  function offHover() {
    let songItem = $(this).find(".song-item-number");
    let songNumber = songItem.attr("data-song-number");
    if (songNumber !== currentlyPlayingSongNumber) {
      songItem.html(songNumber);
    }
  }

  $row.find(".song-item-number").click(handleSongClick);
  $row.hover(onHover, offHover);

  return $row;
};

function setSong() {
  
}

var setCurrentAlbum = function (album) {
  var $albumTitle = $(".album-view-title");
  var $albumArtist = $(".album-view-artist");
  var $albumReleaseInfo = $(".album-view-release-info");
  var $albumImage = $(".album-cover-art");
  var $albumSongList = $(".album-view-song-list");

  $albumTitle.text(album.title);
  $albumArtist.text(album.artist);
  $albumReleaseInfo.text(album.year + " " + album.label);
  $albumImage.attr("src", album.albumArtUrl);

  $albumSongList.empty();

  for (var i = 0; i < album.songs.length; i++) {
    var $songRow = createSongRow(
      i + 1,
      album.songs[i].title,
      album.songs[i].duration
    );
    $albumSongList.append($songRow);
  }
};

let playButtonTemplate =
  '<a class="album-song-button"><span class="ion-play"></span></a>';
var pauseButtonTemplate =
  '<a class="album-song-button"><span class="ion-pause"></span></a>';

let currentlyPlayingSongNumber = null;

setCurrentAlbum(albums[0]);

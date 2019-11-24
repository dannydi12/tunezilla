// Printing Functions

function printLyrics(lyrics, artist, song) {
    $('.js-lyrics').html(`
    <button class="js-info-button info-button animated fadeInUp">&uarr; Learn More About This Song &uarr;</button>
    <h2 class="song-title">${song} by ${artist}</h2><pre>${lyrics.lyrics}</pre>
    `);
}

function printInfo(info) {
    $('.js-info').html(`
    <img class="album-image" src="${info.strTrackThumb}" alt="Album cover for song">
    <h3>${info.strAlbum}</h3>
    <p>Genre: ${info.strStyle}</p>
    <pre>${info.strDescriptionEN}</pre>
    <iframe class="video" src="https://www.youtube.com/embed/${getURI(info.strMusicVid)}" frameborder="0" allowfullscreen></iframe>
    <p>Directed by: ${info.strMusicVidDirector}</p>
    `);
}

// Helper Functions

function showInfo() {
    if ($('.js-modal').css("display") == 'none') {
        $('.js-modal').css('display', 'block');
        $('body').css('overflow', 'hidden')
    }
    else {
        $('.js-modal').css('display', 'none');
        $('body').css('overflow', 'auto')
    }
}

function scrollDown() {
    $('html, body').animate({
        scrollTop: $(".lyrics-section").offset().top
    }, 1000);
}

function getURI(link) {
    let index = link.indexOf('=')
    return link.slice(index + 1);
}

function formatSearch(query) {
    return query.trim().toLowerCase()
}

function formatDataSearch(params) {
    return Object.keys(params).map(key => `${key.trim().replace(/ /g, '_').toLowerCase()}=${(params[key]).trim().replace(/ /g, '_').toLowerCase()}`).join('&');
}

// AJAX Calls

function fetchLyrics(artist, song, callback) {
    const url = `https://api.lyrics.ovh/v1/${formatSearch(artist)}/${formatSearch(song)}`;
    fetch(url)
        .then(request => {
            if (request.ok) {
                return request;
            }
            else {
                throw new Error('Something isn\'t working');
            }
        })
        .then(lyrics => lyrics.json())
        .then(jsonLyrics => {
            printLyrics(jsonLyrics, artist, song);
            callback();
        })
        .catch(error => {
            $('.js-lyrics').html(`<p>The lyrics for this song cannot be found at this time. Please try again later or check your spelling.</p>`);
            callback();
        });
}

function fetchSongDetails(artist, song) {
    let params = {
        s: artist,
        t: song
    }

    let queries = formatDataSearch(params);
    const url = `https://theaudiodb.com/api/v1/json/1/searchtrack.php?${queries}`;
    fetch(url)
        .then(request => {
            if (request.ok) {
                return request;
            }
            else {
                throw new Error('Something isn\'t working');
            }
        })
        .then(info => info.json())
        .then(jsonInfo => {
            printInfo(jsonInfo.track[0]);
        })
        .catch(error => {
            $('.js-info').html(`<p>Song details cannot be found at this time.</p>`);
        });
}

// Event listeners

function handleInfoClick() {
    $('.lyrics-section').on('click', '.js-info-button', function (event) {
        event.preventDefault();
        showInfo();
    });
}

function handleExitClick() {
    $('.js-modal').on('click','.js-exit', function (event) {
        event.preventDefault();
        showInfo();
    });
}

function handleSearch() {
    $('.js-search').on('submit', 'form', function (event) {
        event.preventDefault();
        let artist = $('#artist').val();
        let song = $('#song').val();
        fetchLyrics(artist, song, scrollDown);
        fetchSongDetails(artist, song);
    });
}


function main() {
    handleSearch();
    handleExitClick();
    handleInfoClick();
}

$(main);
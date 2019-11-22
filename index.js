function printLyrics(lyrics, artist, song) {
    $('.js-lyrics').html(`<h2>${song} by ${artist}</h2><pre>${lyrics.lyrics}</pre>`);
}

function printInfo(info) {
    $('.js-info').html(`
    <button class="js-exit exit">X</button>
    <img src="${info.strTrackThumb}">
    <h3>${info.strAlbum}</h3>
    <pre>${info.strDescriptionEN}</pre>
    <iframe class="video" src="https://www.youtube.com/embed/${getURI(info.strMusicVid)}" frameborder="0" allowfullscreen></iframe>
    <p>Directed by: ${info.strMusicVidDirector}</p>
    <p>Genre: ${info.strStyle}</p>
    `);
}

function showInfo() {
    if ($('.js-modal').css("display") == 'none') {
        $('.js-modal').css('display', 'block');
    }
    else {
        $('.js-modal').css('display', 'none');
    }
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

function fetchLyrics(artist, song) {
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
        })
        .catch(error => {
            $('.js-lyrics').html(`<p>The lyrics for this song cannot be found at this time. Please try again later or check your spelling</p>`);
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
            $('.js-info').html(`<button class="js-exit exit">X</button><p>Song details cannot be found at this time.</p>`);
        });
}

function handleInfoClick() {
    $('.js-info-button').on('click', function (event) {
        event.preventDefault();
        showInfo();
    });
}

function handleExitClick() {
    $('.js-info').on('click', function (event) {
        event.preventDefault();
        showInfo();
    });
}

function handleSearch() {
    $('.js-search').on('submit', 'form', function (event) {
        event.preventDefault();
        let artist = $('#artist').val();
        let song = $('#song').val();
        fetchLyrics(artist, song);
        fetchSongDetails(artist, song);
    });
}


function main() {
    handleSearch();
    handleExitClick();
    handleInfoClick();
    fetchLyrics('queen', 'bohemian rhapsody');
    fetchSongDetails('queen', 'bohemian rhapsody');
}

$(main);
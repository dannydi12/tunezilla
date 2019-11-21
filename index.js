function formatSearch(query) {
    return query.trim().toLowerCase()
}

function formatDataSearch(params) {
    return Object.keys(params).map(key => `${key.trim().replace(/ /g, '_').toLowerCase()}=${(params[key]).trim().replace(/ /g, '_').toLowerCase()}`).join('&');
}


// function fetchSpotifySongs(artists) {
//     let params = {
//         q: 'queen',
//         limit: 1,
//         type: 'artist',
//     }



//     let queries = formatParams(params);
//     const url = `https://api.spotify.com/v1/search?${queries}`;

//     console.log(url);


//     fetch(url, {headers: {
//         'Authorization': 'BQCsHMHGwa4J_Sz27nf-GPHr-3ZTRHci6S8njfJSTj9aa6xwJxxfOMm9F-RW82E9MbiG5EfNGV6Q-alNCkU'
//     }})
//     .then(request => {
//         if(request.ok) {
//             return request;
//         }
//         else {
//             throw new Error('Something isn\'t working');
//         }
//     })
//     .then(artists => artists.json())
//     .then(jsonArtists => {
//         console.log(jsonArtists);
//     })
//     .catch(error => {
//         alert('Something went wrong...');
//     });
// }
function printLyrics(lyrics) {
    console.log(lyrics);
    $('.js-results').html(`<pre>${lyrics.lyrics}</pre>`);
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
            printLyrics(jsonLyrics);
        })
        .catch(error => {
            alert('Something went wrong...');
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
        .then(lyrics => lyrics.json())
        .then(jsonLyrics => {
            console.log(jsonLyrics.track[0].strDescriptionEN);
            console.log(jsonLyrics.track[0].strMusicVidDirector);
            console.log(jsonLyrics.track[0].strMusicVid);
            console.log(jsonLyrics.track[0].strTrackThumb);
            console.log(jsonLyrics.track[0].strAlbum);
            console.log(jsonLyrics.track[0].strGenre);
            console.log(jsonLyrics.track[0].strStyle);
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
    // fetchLyrics('shawn mendes', 'stitches');
    // fetchSongDetails('shawn mendes', 'stitches');
    handleSearch();
}

$(main);
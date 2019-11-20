function formatParams(params) {
    return Object.keys(params).map(key => `${key}=${encodeURI(params[key])}`).join('&');
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
    const url = `https://api.lyrics.ovh/v1/${artist}/${song}`;
    fetch(url)
    .then(request => {
        if(request.ok) {
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

function handleSearch() {
    $('.js-search').on('submit', 'form', function (event) {
        console.log('hey')
        event.preventDefault();
        let artist = $('#search').val();
        fetchLyrics('Shawn Mendes', 'Stitches')
    });
}


function main() {
    handleSearch();
}

$(main);
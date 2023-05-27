import axios from 'axios';

const BASE_URL = "https://api.viki.io/v4/videos.json";

async function getVideos() {
    let hasMore = true;
    let page = 1
    let videos = [];

    while (hasMore) {
        const response = await axios.get(BASE_URL, {
            params: {
                app: "100250a",
                per_page: 10,
                page: page
            }
        })

        videos = [...videos, ...response.data.response];
        hasMore = response.data.more;
        page++;
    }

    return videos;
}

function getCountOfHd(videos) {
    let countOfHD = {
        hd: {
            true: 0,
            false: 0
        }
    }

    for (let i = 0; i < videos.length; i++) {
        if (videos[i].flags.hd) {
            countOfHD.hd.true++;
        } else {
            countOfHD.hd.false++;
        }
    }

    return countOfHD;
}

function getCountOfCountries(videos) {
    let countries = {};

    for (let i = 0; i < videos.length; i++) {
        if (countries[videos[i].container.origin.country]) {
            countries[videos[i].container.origin.country]++;
        } else {
            countries[videos[i].container.origin.country] = 1;
        }
    }

    return countries;
}

console.log("Executing script");
getVideos().then(videos => {
    console.log(getCountOfHd(videos));
    console.log(getCountOfCountries(videos));
});
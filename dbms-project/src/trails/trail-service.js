import axios from "axios";
export const NAPSTER_API = "https://api.napster.com/v2.2";
export const NAPSTER_KEY = process.env.REACT_APP_NAPSTER_API_KEY;
export const ALBUM_API = "http://localhost:4000/api/albums";

export const trailSearchLatLng = async (lat, lng) => {
    const options = {
        method: 'GET',
        url: 'https://trailapi-trailapi.p.rapidapi.com/trails/explore/',
        params: {lat: lat, lon: lng},
        headers: {
            'X-RapidAPI-Key': '97d117a40fmshe0afeb383725404p17efc3jsn0719314768d2',
            'X-RapidAPI-Host': 'trailapi-trailapi.p.rapidapi.com'
        }
    };

    const response = await axios.request(options);
    return response.data;
};

export const trailSearchID = async (trailID) => {
    const options = {
        method: 'GET',
        url: `https://trailapi-trailapi.p.rapidapi.com/trails/${trailID}`,
        headers: {
            'X-RapidAPI-Key': '97d117a40fmshe0afeb383725404p17efc3jsn0719314768d2',
            'X-RapidAPI-Host': 'trailapi-trailapi.p.rapidapi.com'
        }
    };

    const response = await axios.request(options);
    return response.data;
};
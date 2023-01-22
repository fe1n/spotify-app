import axios from 'axios';
import { SpotifyFeaturesApiResponse } from '../type/spotifyapi';
import getResponse from './getResponse';

const getTrack = async (token: string) => {
    const track_url = 'https://api.spotify.com/v1/tracks/11dFghVXANMlKmJXsNCbNl'
    let data = await getResponse(track_url, token);
    let img_url = data.data.album.images[0].url;
    let artist_name = data.data.artists[0].name;
    let song_name = data.data.name;
    return data
}

export default getTrack;

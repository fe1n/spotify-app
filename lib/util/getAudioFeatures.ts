import axios from 'axios';
import { SpotifyFeaturesApiResponse } from '../type/spotifyapi';

// 楽曲情報取得用の関数
const getAudioFeatures = async (id: string, accessToken: string) => {
    const featuresResponse = await axios.get(
        `https://api.spotify.com/v1/audio-features/${id}`,
        // 'https://api.spotify.com/v1/audio-features/11dFghVXANMlKmJXsNCbNl',
        {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Authorization': `Bearer ${accessToken}`
            }
        }
    ).catch();
    return featuresResponse.data;
};
export default getAudioFeatures;

import axios from 'axios';
import { SpotifyFeaturesApiResponse } from '../type/spotifyapi';

// 楽曲情報取得用の関数
const getAudioFeatures = async (ids: string[], accessToken: string) => {
    const featuresParams = new URLSearchParams();
    featuresParams.append('ids', ids.join(','));
    const featuresResponse = await axios.get(
        `https://api.spotify.com/v1/audio-features?${featuresParams.toString()}`,
        {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Authorization': `Bearer ${accessToken}`
            }
        }
    ).catch();
    return featuresResponse.data.audio_features;
};
export default getAudioFeatures;

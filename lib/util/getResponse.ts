import axios from 'axios';
import { SpotifyFeaturesApiResponse } from '../type/spotifyapi';

// 楽曲情報取得用の関数
const getResponse = async (url: string, accessToken: string) => {
    const Response = await axios.get(
        url,
        {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Authorization': `Bearer ${accessToken}`
            }
        }
    ).catch();
    return Response;
};

export default getResponse;

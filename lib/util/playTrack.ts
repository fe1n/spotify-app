import axios from 'axios';

const playTrack = async (deviceId: any, id: string, accessToken: any) => {
    const playParams = new URLSearchParams();
    playParams.append('device_id', deviceId);
    await axios.put(
        `https://api.spotify.com/v1/me/player/play?${playParams.toString()}`,
        {
            'uris': [`spotify:track:${id}`]
        },
        {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${accessToken}`
            }
        }
    ).catch();
};

export default playTrack;

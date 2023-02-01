import { AiFillPlayCircle, AiFillPauseCircle } from 'react-icons/ai';
import playTrack from '../lib/util/playTrack';

const TrackBox: React.FunctionComponent<{
    track: any,
    isPlaying: boolean,
    setIsPlaying: (b: boolean) => void,
    playingTrack?: any,
    setPlayingTrack: any,
    playerRef: React.MutableRefObject<Spotify.SpotifyPlayer | null>,
    deviceId?: string,
    token: string,
}> = ({
    track,
    isPlaying,
    setIsPlaying,
    playingTrack,
    setPlayingTrack,
    playerRef,
    deviceId,
    token,
}) => {
        console.log('inchilid', playerRef.current);
        return (
            <div className="track-box" key={track.id}>
                <img className="album-img" src={track.imgURL} />
                {(isPlaying && playingTrack && track.id === playingTrack.id) ? (
                    <AiFillPauseCircle className='play-button'
                        onClick={() => {
                            playerRef.current?.pause();
                            setIsPlaying(false);
                        }}
                    />
                ) : (
                    <AiFillPlayCircle className='play-button'
                        onClick={() => {
                            if (playingTrack?.id === track.id) {
                                playerRef.current?.togglePlay();
                                setIsPlaying(true);
                            } else {
                                playerRef.current?.pause();
                                setPlayingTrack(track);
                                try {
                                    playTrack(deviceId, track.id, token)
                                    setIsPlaying(true);
                                } catch (e) {
                                    setPlayingTrack();
                                }
                            }
                        }}
                    />
                )}
                <h3 className="name">{track.songName}</h3>
                <p className="name">{track.artistName}</p>
            </div>
        )
    };

export default TrackBox;

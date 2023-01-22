import { VFC, useState, useEffect } from "react";
import React from "react";
import { SpotifySearchApiResponse, SearchTracksResponse } from '../lib/type/spotifyapi';

import getAudioFeatures from "../lib/util/getAudioFeatures";
import getResponse from "../lib/util/getResponse";
import predict from "../lib/util/predict";
import { Tensor } from 'onnxruntime-web';
import getAFTensor from "../lib/util/getAFTensor";


type Props = {
    token: string;
};

export type AudioFeature = {
    danceability: number,
    energy: number,
    id: string,
    instrumentalness: number,
    key: number,
    liveness: number,
    loudness: number,
    mode: number,
    tempo: number,
    valence: number,
    track_href: string
}

export type SpotifyFeaturesApiResponse = {
    audio_features: AudioFeature[]
}

export const Test: VFC<Props> = ({ token }) => {
    // const playlistContentRef = useRef<HTMLDivElement>(null);
    // useEffect(() => {
    //     const ref = playlistContentRef.current;
    //     console.log(ref)
    // }, [playlistContentRef.current])

    // const playlist_id: string = '37i9dQZF1DXcBWIGoYBM5M';
    // async function myAsyncAll() {
    //     const tracks = await getTracks(playlist_id, token);
    //     const ids = [];
    //     for (var item of tracks) {
    //         ids.push(item.track.id);
    //     }
    //     console.log(ids)
    //     const audioFeatures = await getAudioFeatures(ids, token);
    //     console.log(audioFeatures)
    // }
    // myAsyncAll();

    const [style, setStyle] = useState('dropzone');
    const [url, setURL] = useState('');
    const [title, setTitle] = useState('');
    const [tracksInfo, setTracksInfo] = useState<any>([]);

    const enableDropping = (event: React.DragEvent<HTMLDivElement>) => {
        event.preventDefault();
        setStyle('dropzone-active');
    }
    const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
        event.preventDefault();
        let open_url: string = event.dataTransfer.getData('text');
        console.log(`Somebody dropped an element with id: ${open_url}`);

        let last: string = open_url.split('/').splice(-1)[0];
        let api_url: string = ['https://api.spotify.com/v1/playlists', last].join('/');
        setURL(api_url);

        setStyle('dropzone');
    }
    const handleLeave = (event: React.DragEvent<HTMLDivElement>) => {
        setStyle('dropzone');
    }

    useEffect(() => {
        const fn = async () => {
            console.log(url);
            let Response = await getResponse(url, token);
            setTitle(Response.data.name);

            let data = [];
            for (let item of Response.data.tracks.items) {
                let obj: any = { id: '', pred: 0, imgURL: '', songName: '', artistName: '' };
                obj.id = item.track.id;
                obj.imgURL = item.track.album.images[0].url;
                obj.songName = item.track.name;
                obj.artistName = item.track.artists[0].name;

                const tensor: Tensor = await getAFTensor(item.track.id, token);
                const pred = await predict(tensor);
                obj.pred = pred;

                data.push(obj);
            }
            let result = data.sort(function (a, b) {
                return (a.pred > b.pred) ? -1 : 1;  //オブジェクトの降順ソート
            });
            console.log(result);
            setTracksInfo(data);
        }
        if (url !== '') {
            fn();
        }
        console.log('hello');
    }, [url]);

    async function fn() {
        const x = new Float32Array(1 * 13).fill(0);
        const tensor = new Tensor('float32', x, [1, 13]);
        const out = await predict(tensor);
        console.log(out);
    }
    fn();

    async function fn2() {
        // const obj = {a: "hogehoge", b: 0.2, c: 1};
        const ur = 'https://api.spotify.com/v1/audio-features/11dFghVXANMlKmJXsNCbNl';
        const obj = getResponse(url, token);
        console.log(obj)
        // const items = Object.values(obj);
        // const filtered = items.filter((item) => {
        //     return typeof item === 'number';
        // })
        // console.log(filtered);
    }
    fn2();

    return (
        <>
            <div onDragLeave={handleLeave} onDragOver={enableDropping} onDrop={handleDrop} className={style}>
                <div>Drop playlist</div>
            </div>
            <div>
                <h1 className="playlist-name">{title}</h1>
                <div id="playlist-box" className="playlist-box">
                    {tracksInfo.map((track: any) => (
                        <div className="track-box">
                            <img className="album-img" src={track.imgURL} />
                            <h3 className="name">{track.songName}</h3>
                            <p className="name">{track.artistName}</p>
                        </div>
                    ))}
                </div>
            </div>
        </>
    )
};
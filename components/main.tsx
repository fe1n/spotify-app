import { VFC, useState, useEffect } from "react";
import React from "react";
import getResponse from "../lib/util/getResponse";
import predict from "../lib/util/predict";
import { Tensor } from 'onnxruntime-web';
import getAFTensor from "../lib/util/getAFTensor";
import getAudioFeatures from "../lib/util/getAudioFeatures";
import { useSession } from "next-auth/react";


export const Main = () => {

    const { data: session } = useSession()
    const token: string = session?.accessToken

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

            const ids: string[] = []
            for (let item of Response.data.tracks.items) {
                ids.push(item.track.id);
            }
            const afs = await getAudioFeatures(ids, token);

            let audioObject: { [key: string]: object } = {};
            for (let i = 0; i < ids.length; i++) {
                audioObject = { ...audioObject, [ids[i]]: afs[i] };
            }
            let data = [];
            for (let item of Response.data.tracks.items) {
                let obj: any = { id: '', pred: 0, imgURL: '', songName: '', artistName: '' };
                obj.id = item.track.id;
                obj.imgURL = item.track.album.images[0].url;
                obj.songName = item.track.name;
                obj.artistName = item.track.artists[0].name;

                const tensor: Tensor = await getAFTensor(audioObject[item.track.id]);
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
    }, [url]);

    return (
        <>
            <div onDragLeave={handleLeave} onDragOver={enableDropping} onDrop={handleDrop} className={style}>
                <div>Drop playlist</div>
            </div>
            <div>
                <h1 className="playlist-name">{title}</h1>
                <div id="playlist-box" className="playlist-box">
                    {tracksInfo.map((track: any) => (
                        <div className="track-box" key={track.id}>
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
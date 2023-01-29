import "../styles/index.css";
import "../styles/App.css";
import type { AppProps } from "next/app";
import { SessionProvider } from "next-auth/react";
import Head from "next/head";

function MyApp({ Component, pageProps }: AppProps) {
    return (
        <>
            <Head>
                <title>Spotify Web Playback Example</title>
                <meta
                    name="description"
                    content="An example app of Spotify Web Playback SDK based on Next.js and Typescript."
                />
            </Head>
            <SessionProvider>
                <Component {...pageProps} />
            </SessionProvider>
        </>
    )
}

export default MyApp;
import { withIronSessionApiRoute } from "iron-session/next";

const withSession = (handler: any) => {
    return withIronSessionApiRoute(handler, {
        cookieName: 'spotify-app',

        // process.envは環境変数
        password: `${process.env.NEXT_PUBLIC_CLIENT_ID}:${process.env.NEXT_PUBLIC_CLIENT_SECRET}`,
        cookieOptions: {
            secure: process.env.NODE_ENV === "production",
        },
    });
}

export default withSession;
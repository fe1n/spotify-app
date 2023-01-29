import { VFC, useState, useEffect } from "react";
import React from "react";
import { useSession } from "next-auth/react";


type Props = {
    token: string;
};

export const Test: VFC<Props> = () => {

    const {data} = useSession()
    console.log(data?.accessToken)
    return (
        <>
        </>
    )
};
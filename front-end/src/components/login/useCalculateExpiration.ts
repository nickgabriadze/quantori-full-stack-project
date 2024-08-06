import {useEffect, useState} from "react";
import {calculateTimeRemaining} from "./getTimeLeft.ts";
import {decodeJwt} from "jose";

export function useCalculateExpiration(token) {
    const [tillExpiry, setTillExpiry] = useState<string>('null');


    useEffect(() => {

        const oneSecondTimeout = setTimeout(() => {
            if (!token) {
                setTillExpiry('Expired')
            } else {
                setTillExpiry(calculateTimeRemaining(new Date(decodeJwt(token).exp * 1000).toISOString()))

            }
        }, 1000)


        return () => {
            clearTimeout(oneSecondTimeout)
        }
    })

    return tillExpiry


}
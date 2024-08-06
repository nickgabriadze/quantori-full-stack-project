import {useEffect, useState} from "react";
import {calculateTimeRemaining} from "./getTimeLeft.ts";
import {decodeJwt} from "jose";

export function useCalculateExpiration(token) {
    const [tillExpiry, setTillExpiry] = useState<string>('null');


    useEffect(() => {

        const oneSecondTimeout = setTimeout(() => {
            if (!token) {
                setTillExpiry('Token Expired!')
            } else {
                try{
                    const decoded = decodeJwt(token);
                    setTillExpiry(calculateTimeRemaining(new Date(decoded.exp * 1000).toISOString()))
                }catch (err){
                    setTillExpiry('Token Expired!')
                }

            }
        }, 1000)


        return () => {
            clearTimeout(oneSecondTimeout)
        }
    })

    return tillExpiry


}
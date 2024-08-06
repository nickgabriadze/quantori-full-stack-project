import dotenv from "dotenv";
import {SignJWT} from "jose";

dotenv.config()


export const generateToken = async (email: string) => {
    const secret = process.env.JWT_SECRET as string

    const encoder = new TextEncoder();
    const secretKey = encoder.encode(secret);
    const expirationTime = "1m"

    return await new SignJWT({ email })
        .setExpirationTime(expirationTime)
        .setIssuedAt()
        .setProtectedHeader({ alg: "HS256" })
        .sign(secretKey);

}

export default generateToken
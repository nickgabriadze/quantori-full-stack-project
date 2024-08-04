import dotenv from "dotenv";
import {SignJWT} from "jose";

dotenv.config()


export const generateToken = async (email: string) => {
    const secret = process.env.JWT_SECRET as string

    const encoder = new TextEncoder();
    const secretKey = encoder.encode(secret);

    return await new SignJWT({ email })
        .setExpirationTime("1m")
        .setIssuedAt()
        .setProtectedHeader({ alg: "HS256" })
        .sign(secretKey);

}

export default generateToken
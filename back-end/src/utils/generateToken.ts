import dotenv from "dotenv";
import {SignJWT} from "jose";

dotenv.config()


export const generateToken = async (id: number, email: string) => {
    const secret = process.env.JWT_SECRET as string

    const encoder = new TextEncoder();
    const secretKey = encoder.encode(secret);

    return await new SignJWT({ id, email })
        .setExpirationTime("15m")
        .setIssuedAt()
        .setProtectedHeader({ alg: "HS256" })
        .sign(secretKey);

}

export default generateToken
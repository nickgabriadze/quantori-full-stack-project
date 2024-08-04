import csv = require('csv-parser');
import * as fs from 'fs';
import {User} from "../types/user";

export async function getUser(path:string, email: string):Promise<User | undefined>{
    return await(new Promise((resolve, reject) => {
        const users = [];

        fs.createReadStream(path)
            .pipe(csv())
            .on('data', (data: any) => users.push(data))
            .on('end', () => {
                for (const user of users) {
                    if (String(user.email) === email) {
                        return resolve({
                            id: Number(user.id),
                            f_name: user.f_name,
                            l_name: user.l_name,
                            email: user.email,
                            password: user.password,
                            age: Number(user.age),
                            gender: user.gender,
                        });
                    }
                }
                resolve(undefined);
            })
            .on('error', (error) => reject(error));
    }));
}

export default getUser;

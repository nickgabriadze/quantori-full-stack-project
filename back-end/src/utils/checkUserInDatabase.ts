import csv = require('csv-parser');
import * as fs from 'fs';

export async function checkUserInDatabase(path:string, email:string, password:string):Promise<boolean>{
    return await(new Promise((resolve, reject) => {
        const users = [];

        fs.createReadStream(path)
            .pipe(csv())
            .on('data', (data: any) => users.push(data))
            .on('end', () => {
                for (const user of users) {
                    if (String(user.password) === password && String(user.email) === email) {
                        return resolve(true);
                    }
                }
                resolve(false);
            })
            .on('error', (error) => reject(error));
    }));
}

export default checkUserInDatabase;

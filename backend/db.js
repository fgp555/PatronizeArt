import db from 'mongoose';
import {DB_URL} from './config.js'


export const dbConnect = async ()=>{
        try {
         await db.connect(`mongodb://Localhost/Patreon` );
            // await db.connect(DB_URL);
            console.log('DB is Connected');
        } catch (error) {
            console.log(error);    
        }
}
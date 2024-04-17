import app from './app.js';
import { PORT } from './config.js';
import { dbConnect } from './db.js';

dbConnect();
app.listen(PORT);
console.log('Server on port',PORT);

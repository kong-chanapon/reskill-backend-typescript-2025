import app from './app';
import dotenv from 'dotenv';
import 'reflect-metadata';


// load environment variables
dotenv.config();

const PORT = process.env.PORT || 3000;


// start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

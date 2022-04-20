import express from 'express';
import router from './TodoList.route.js';
import dotenv from 'dotenv';
// import cors from 'cors';
import mongodb from 'mongodb';

dotenv.config();

const app = express();
// app.use(cors());
app.use(express.json());
app.use('/', router);
app.use('*', (req, res) => res.status(404).json({ error: 'not found' }));

const port = process.env.PORT || 8000;

const client = new mongodb.MongoClient(process.env.DATABASE_URI,
  {
    maxPoolSize: 50,
    wtimeoutMS: 2500,
    useNewUrlParser: true
  });

client.connect(err => {
  const collection = client.db('%TEAST').collection('devices');
  client.close();
});

app.listen(port, () => { console.log(`listening on port ${port}`) });
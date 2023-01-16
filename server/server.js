const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config({ path: './config.env' });

const app = require('./app');

const db = process.env.DB.replace('<PASSWORD>', process.env.DB_PASSWORD);

mongoose.set('strictQuery', false);
mongoose
  .connect(db, {
    useNewURLParser: true,
  })
  .then(() => {
    console.log('Database Connected!');
  });

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`App running on port ${port}`);
});

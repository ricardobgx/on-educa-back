import app from './app';

const { PORT } = process.env;

app.listen(PORT, () => {
  console.log('ON EDUCA - ' + PORT);
});

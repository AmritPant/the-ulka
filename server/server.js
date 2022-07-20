const path = require('path');
const dotenv = require('dotenv');

dotenv.config({ path: path.join(__dirname, 'config', 'config.env') });
const app = require('./app');

const { PORT } = process.env;

app.listen(PORT, () => {
  console.log(
    `Server has been started successfully on http://localhost:${PORT}`
  );
});

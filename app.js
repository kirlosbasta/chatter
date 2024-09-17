import dotenv from 'dotenv';
import createApp from './src/utils/createApp.js';

dotenv.config();

const app = createApp();

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

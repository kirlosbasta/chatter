import dotenv from 'dotenv';
import createApp from './src/utils/createApp.js';

dotenv.config();

const httpServer = createApp();

const PORT = process.env.PORT || 8000;

httpServer.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

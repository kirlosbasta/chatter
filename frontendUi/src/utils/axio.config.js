import { userData } from './auth';

const config = {
  headers: {
    'Content-type': 'application/json',
    Authorization: userData.token,
  },
};
export { config };

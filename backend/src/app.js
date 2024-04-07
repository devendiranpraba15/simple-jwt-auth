import server from './Server';
import userRoutesV1 from './Routes/UserRoutesV1';

const app = server([{ path: '/api/user/v1', router: userRoutesV1 }]);

export default app;

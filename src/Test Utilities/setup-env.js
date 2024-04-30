import { server } from './server';

beforeAll(() => {
  server.listen();
  console.log('server listening...');
});
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

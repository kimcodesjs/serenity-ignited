import { http, HttpResponse } from 'msw';
import { events } from './test-data-events';

const handlers = [
  http.get(`http://127.0.0.1:3000/api/v1/events/`, async () => {
    console.log('msw: get events response');
    return HttpResponse.json(
      {
        data: events,
      },
      { status: 200 }
    );
  }),
];

export { handlers };

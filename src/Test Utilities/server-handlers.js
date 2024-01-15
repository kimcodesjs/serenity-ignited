import { http, HttpResponse } from 'msw';
import {
  events,
  user,
  practitioner,
  sessions,
  appointments,
} from './test-data';

const handlers = [
  // Events
  http.get(`*/api/v1/events/`, async () => {
    return HttpResponse.json({
      status: 200,
      data: events,
    });
  }),

  // Authentication
  http.get(`*/api/v1/users/get-auth-status`, async () => {
    return HttpResponse.json({
      status: 200,
      data: user,
    });
  }),

  // Booking
  http.get(`*/api/v1/practitioners/6487bb6d6cd84d6d6859954c`, async () => {
    return HttpResponse.json({
      status: 200,
      data: practitioner,
    });
  }),

  http.get(`*/api/v1/sessions/get-all-sessions`, async () => {
    return HttpResponse.json({
      status: 200,
      data: sessions,
    });
  }),

  http.get(`*/api/v1/appointments/`, async () => {
    return HttpResponse.json({
      status: 200,
      data: appointments,
    });
  }),
];

export { handlers };

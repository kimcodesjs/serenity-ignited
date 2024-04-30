const events = [
  {
    _id: '652c0c767c95d01ea73c4738',
    category: 'meditation',
    name: 'Thursday Night Meditation: Throat Chakra',
    description:
      'A guided meditation designed to clear blockages in the throat chakra.',
    start: '2023-10-26T18:30:00.000-05:00',
    end: '2023-10-26T18:45:00.000-05:00',
    price: 10,
    capacity: {
      max: 7,
      available: 7,
    },
    attendees: [],
    slug: 'thursday-night-meditation:-throat-chakra',
    __v: 0,
  },
];

const user = {
  _id: '1234',
  firstName: 'Test',
  lastName: 'Testerson',
  email: 'test@kimcodesjs.com',
  squareId: '4321',
};

const practitioner = {
  _id: '6487bb6d6cd84d6d6859954c',
  user: '1234',
  blockedDays: [],
  blockedDates: [
    '2024-05-01T06:00:00.000Z',
    '2024-05-10T06:00:00.000Z',
    '2024-05-20T06:00:00.000Z',
  ],
  workingHours: {
    weekday: {
      start: {
        hour: 18,
        minute: 30,
      },
      end: {
        hour: 21,
        minute: 0,
      },
    },
    weekend: {
      start: {
        hour: 10,
        minute: 0,
      },
      end: {
        hour: 21,
        minute: 0,
      },
    },
  },
};

const sessions = [
  {
    _id: '1234',
    name: 'Sample Session',
    modality: ['Reiki'],
    description:
      'A short session for those who are interested in testing the waters.',
    duration: {
      hours: 0,
      minutes: 20,
    },
    price: 20,
    inPersonOnly: false,
  },
  {
    _id: '2345',
    name: 'General Healing',
    modality: ['Reiki'],
    description:
      'A general cleansing of the 7 major Chakras, plus one area of focus.',
    duration: {
      hours: 0,
      minutes: 30,
    },
    price: 40,
    inPersonOnly: false,
  },
  {
    _id: '3456',
    name: 'Reiki + Access Bars',
    modality: ['Reiki', 'Access Consciousness'],
    description:
      'A powerful combination session of Reiki and Access Bars healing.',
    duration: {
      hours: 0,
      minutes: 45,
    },
    price: 75,
    inPersonOnly: true,
  },
];

const appointments = [
  {
    _id: '9876',
    user: '1234',
    session: '2345',
    connection: 'In Person',
    price: 40,
    date: '2024-05-11T00:00:00.000-06:00',
    time: '2024-05-11T19:00:00.000-06:00/2024-05-11T19:30:00.000-06:00',
    paid: true,
  },
  {
    _id: '9878',
    user: '1234',
    session: '2345',
    connection: 'In Person',
    price: 40,
    date: '2024-05-21T00:00:00.000-06:00',
    time: '2024-05-21T19:00:00.000-06:00/2024-05-21T19:30:00.000-06:00',
    paid: true,
  },
];
export { events, user, practitioner, sessions, appointments };

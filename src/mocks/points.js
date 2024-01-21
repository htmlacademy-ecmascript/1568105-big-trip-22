const mockPoints = [
  {
    id: 'point-1',
    type: 'flight',
    destination: 'mockDestination-1',
    dateFrom: '2023-01-20T20:15:56.845Z',
    dateTo: '2023-01-21T05:22:13.375Z',
    basePrice: 400,
    offers: [
      'offer-flight-1',
      'offer-flight-2',
      'offer-flight-3',
      'offer-flight-4',
      'offer-flight-5'
    ],
    isFavorite: true
  },
  {
    id: 'point-2',
    type: 'taxi',
    destination: 'mockDestination-2',
    dateFrom: '2023-01-21T06:00:13.845Z',
    dateTo: '2023-01-21T06:40:13.375Z',
    basePrice: 25,
    offers: [
      'offer-taxi-3',
      'offer-taxi-5',
      'offer-taxi-6'
    ],
    isFavorite: false
  },
  {
    id: 'point-3',
    type: 'flight',
    destination: 'mockDestination-3',
    dateFrom: '2023-01-21T08:10:13.845Z',
    dateTo: '2023-01-21T09:30:13.375Z',
    basePrice: 30,
    offers: [
      'offer-flight-1',
      'offer-flight-2'
    ],
    isFavorite: true
  },
  {
    id: 'point-4',
    type: 'bus',
    destination: 'mockDestination-4',
    dateFrom: '2023-01-21T10:10:13.845Z',
    dateTo: '2023-01-21T11:00:13.375Z',
    basePrice: 30,
    offers: [
      'offer-bus-4'
    ],
    isFavorite: true
  },
  {
    id: 'point-5',
    type: 'check-in',
    destination: 'mockDestination-4',
    dateFrom: '2023-01-21T11:00:13.845Z',
    dateTo: '2023-01-21T11:30:13.375Z',
    basePrice: 100,
    offers: [
      'offer-check-in-5'
    ],
    isFavorite: false
  },
  {
    id: 'point-6',
    type: 'drive',
    destination: 'mockDestination-5',
    dateFrom: '2023-01-21T14:30:13.845Z',
    dateTo: '2023-01-21T16:00:13.375Z',
    basePrice: 15,
    offers: [],
    isFavorite: false
  },
  {
    id: 'point-7',
    type: 'sightseeing',
    destination: 'mockDestination-5',
    dateFrom: '2023-01-21T16:00:13.845Z',
    dateTo: '2023-01-21T18:00:13.375Z',
    basePrice: 25,
    offers: [
      'offer-sightseeing-2',
      'offer-sightseeing-3'
    ],
    isFavorite: true
  }
];

export { mockPoints };

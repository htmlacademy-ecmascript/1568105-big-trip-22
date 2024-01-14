const mockPoints = [
  {
    id: 'point-1',
    type: 'flight',
    destination: 'mockDestination-1',
    dateFrom: '2019-07-10T22:55:56.845Z',
    dateTo: '2019-07-11T11:22:13.375Z',
    basePrice: 400,
    offers: [
      'mockOffer-flight-1',
      'mockOffer-flight-2',
      'mockOffer-flight-3',
      'mockOffer-flight-4',
      'mockOffer-flight-5'
    ],
    isFavorite: true
  },
  {
    id: 'point-2',
    type: 'taxi',
    destination: 'mockDestination-2',
    dateFrom: '2019-07-12T22:55:56.845Z',
    dateTo: '2019-07-13T11:22:13.375Z',
    basePrice: 25,
    offers: [
      'offer-taxi-3'
    ],
    isFavorite: false
  },
  {
    id: 'point-3',
    type: 'flight',
    destination: 'mockDestination-3',
    dateFrom: '2019-07-10T22:55:56.845Z',
    dateTo: '2019-07-11T11:22:13.375Z',
    basePrice: 30,
    offers: [
      'mockOffer-flight-2'
    ],
    isFavorite: true
  },
  {
    id: 'point-4',
    type: 'bus',
    destination: 'mockDestination-4',
    dateFrom: '2019-07-10T22:55:56.845Z',
    dateTo: '2019-07-11T11:22:13.375Z',
    basePrice: 30,
    offers: [
      'offer-bus-1'
    ],
    isFavorite: true
  },
  {
    id: 'point-5',
    type: 'check-in',
    destination: 'mockDestination-4',
    dateFrom: '2019-07-12T22:55:56.845Z',
    dateTo: '2019-07-13T11:22:13.375Z',
    basePrice: 100,
    offers: [
      'offer-check-in-5'
    ],
    isFavorite: false
  },
  {
    id: 'point-5',
    type: 'drive',
    destination: 'mockDestination-5',
    dateFrom: '2019-07-12T22:55:56.845Z',
    dateTo: '2019-07-13T11:22:13.375Z',
    basePrice: 15,
    offers: [],
    isFavorite: false
  },
  {
    id: 'point-6',
    type: 'sightseeing',
    destination: 'mockDestination-5',
    dateFrom: '2019-07-11T22:55:56.845Z',
    dateTo: '2019-07-12T11:22:13.375Z',
    basePrice: 25,
    offers: [
      'offer-sightseeing-1',
      'offer-sightseeing-2'
    ],
    isFavorite: true
  }
];

export { mockPoints };

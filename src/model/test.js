const mockPoints = {
   id: 'point-1',
   type: 'flight',
   destination: 'mockDestination-1',
   dateFrom: '2019-07-10T22:55:56.845Z',
   dateTo: '2019-07-11T11:22:13.375Z',
   basePrice: 200,
   offers: [
      'mockOffer-flight-1',
      'mockOffer-flight-2',
      'mockOffer-flight-3',
      'mockOffer-flight-4',
      'mockOffer-flight-5'
   ],
   isFavorite: true
}

const mockOffers = [
   {
      type: 'taxi',
      offers: [
         {
            id: 'offer-taxi-1',
            title: 'Baby Seat',
            price: 15
         },
         {
            id: 'offer-taxi-2',
            title: 'Candies and Still Water',
            price: 10
         },
         {
            id: 'offer-taxi-3',
            title: 'Air-conditioner',
            price: 3
         },
         {
            id: 'offer-taxi-4',
            title: 'Non-smoking driver',
            price: 5
         }
      ]
   },
   {
      type: 'bus',
      offers: [{
            id: 'offer-bus-1',
            title: 'Choose a Seat',
            price: 15
         },
         {
            id: 'offer-bus-2',
            title: 'Order Lunch',
            price: 10
         },
         {
            id: 'offer-bus-3',
            title: 'Extra Luggage',
            price: 3
         }
      ]
   },
   {
      type: 'train',
      offers: [{
            id: 'offer-train-2',
            title: 'Upgrade to Sleeping Car',
            price: 40
         },
         {
            id: 'offer-train-2',
            title: 'Order Lunch',
            price: 15
         }
      ]
   },
   {
      type: 'ship',
      offers: [{
            id: 'offer-ship-1',
            title: 'Order Lunch',
            price: 20
         },
         {
            id: 'offer-ship-2',
            title: 'Upgrade to Business Class',
            price: 150
         },
         {
            id: 'offer-ship-3',
            title: 'Cigar Lounge Pass',
            price: 200
         },
         {
            id: 'offer-ship-4',
            title: 'Striptease Lounge Pass',
            price: 220
         }
      ]
   },
   {
      type: 'drive',
      offers: [{
            id: 'offer-drive-1',
            title: 'Kia Rio',
            price: 50
         },
         {
            id: 'offer-drive-2',
            title: 'BMW 5',
            price: 120
         },
         {
            id: 'offer-drive-3',
            title: 'Minivan',
            price: 250
         }
      ]
   },
   {
      type: 'flight',
      offers: [{
            id: 'mockOffer-flight-1',
            title: 'Add luggage',
            price: 30
         },
         {
            id: 'mockOffer-flight-2',
            title: 'Switch to comfort class',
            price: 100
         },
         {
            id: 'mockOffer-flight-3',
            title: 'Add meal',
            price: 15
         },
         {
            id: 'mockOffer-flight-4',
            title: 'Choose seats',
            price: 5
         },
         {
            id: 'mockOffer-flight-5',
            title: 'Travel by train',
            price: 40
         }
      ]
   },
   {
      type: 'check-in',
      offers: [{
            id: 'offer-check-in-1',
            title: 'Check-in Time',
            price: 10
         },
         {
            id: 'offer-check-in-2',
            title: 'Check-out Time',
            price: 10
         },
         {
            id: 'offer-check-in-3',
            title: 'Order Breakfast',
            price: 20
         },
         {
            id: 'offer-check-in-3',
            title: 'Massage Rooms',
            price: 15
         }
      ]
   },
   {
      type: 'Sightseeing',
      offers: [{
            id: 'offer-sightseeing-1',
            title: 'Book tickets',
            price: 40
         },
         {
            id: 'offer-sightseeing-2',
            title: 'Lunch in city',
            price: 30
         }
      ]
   },
   {
      type: 'restaurant',
      offers: [{
            id: 'offer-restaurant-1',
            title: 'Reserve a table',
            price: 2
         },
         {
            id: 'offer-restaurant-2',
            title: 'Order a jukebox song',
            price: 5
         },
         {
            id: 'offer-restaurant-3',
            title: 'Order a livesong',
            price: 75
         },
         {
            id: 'offer-restaurant-4',
            title: 'Karaoke Room',
            price: 200
         },
         {
            id: 'offer-restaurant-5',
            title: 'Native Dancers Show',
            price: 150
         },
         {
            id: 'offer-restaurant-6',
            title: 'Birthday Cake',
            price: 100
         },
         {
            id: 'offer-restaurant-7',
            title: 'Wedding Doves',
            price: 175
         }
      ]
   }
];

const getById = (ids, type) => {
   const offers = mockOffers.find((item) => item.type === type).offers
   return ids.map((item) => offers.find((element) => element.id === item) )
};

console.log(getById(mockPoints.offers, mockPoints.type));
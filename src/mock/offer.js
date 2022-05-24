const OfferPriceRange = {
  MIN: 5,
  MAX: 50,
};

import { getRandomInteger } from '../utils/common.js';

export const generateOffers = () => [
  {
    type: 'taxi',
    offers: [{
      id: 1,
      title: 'taxi ghnsdgsbgdfb',
      price: getRandomInteger(OfferPriceRange.MIN, OfferPriceRange.MAX),
    }, {
      id: 2,
      title: 'taxi gfnjdfghddashd',
      price: getRandomInteger(OfferPriceRange.MIN, OfferPriceRange.MAX),
    }, {
      id: 3,
      title: 'taxi hjkgdffsdhsd',
      price: getRandomInteger(OfferPriceRange.MIN, OfferPriceRange.MAX),
    }],
  },
  {
    type: 'bus',
    offers: [{
      id: 1,
      title: 'bus hjkgfhhsdgsgh',
      price: getRandomInteger(OfferPriceRange.MIN, OfferPriceRange.MAX),
    }, {
      id: 2,
      title: 'bus fhjghshgsdgfsd',
      price: getRandomInteger(OfferPriceRange.MIN, OfferPriceRange.MAX),
    }, {
      id: 3,
      title: 'bus fgjhfdjgdfhsdghf',
      price: getRandomInteger(OfferPriceRange.MIN, OfferPriceRange.MAX),
    }],
  }, {
    type: 'train',
    offers: [{
      id: 1,
      title: 'train hgjkgfjdfghsdf',
      price: getRandomInteger(OfferPriceRange.MIN, OfferPriceRange.MAX),
    }, {
      id: 2,
      title: 'train dfjkghfdfghsdf',
      price: getRandomInteger(OfferPriceRange.MIN, OfferPriceRange.MAX),
    }, {
      id: 3,
      title: 'train dfgjhgfjdfhgdfh',
      price: getRandomInteger(OfferPriceRange.MIN, OfferPriceRange.MAX),
    }],
  }, {
    type: 'ship',
    offers: [{
      id: 1,
      title: 'ship dfghfgjgdfhdf',
      price: getRandomInteger(OfferPriceRange.MIN, OfferPriceRange.MAX),
    }, {
      id: 2,
      title: 'ship dfjgfhdfhdf',
      price: getRandomInteger(OfferPriceRange.MIN, OfferPriceRange.MAX),
    }, {
      id: 3,
      title: 'ship hkjgfhjfdhdf',
      price: getRandomInteger(OfferPriceRange.MIN, OfferPriceRange.MAX),
    }],
  }, {
    type: 'drive',
    offers: [{
      id: 1,
      title: 'drive fdghfjghjdhsdf',
      price: getRandomInteger(OfferPriceRange.MIN, OfferPriceRange.MAX),
    }, {
      id: 2,
      title: 'drive fhjgfhdhdfhdf',
      price: getRandomInteger(OfferPriceRange.MIN, OfferPriceRange.MAX),
    }, {
      id: 3,
      title: 'drive dfhjgfjdfhf',
      price: getRandomInteger(OfferPriceRange.MIN, OfferPriceRange.MAX),
    }],
  }, {
    type: 'flight',
    offers: [{
      id: 1,
      title: 'flight hjljkl;uytjythre',
      price: getRandomInteger(OfferPriceRange.MIN, OfferPriceRange.MAX),
    }, {
      id: 2,
      title: 'flight gfhjtyrrehhfghj',
      price: getRandomInteger(OfferPriceRange.MIN, OfferPriceRange.MAX),
    }, {
      id: 3,
      title: 'flight tyhtyrjyujtjt',
      price: getRandomInteger(OfferPriceRange.MIN, OfferPriceRange.MAX),
    }],
  }, {
    type: 'check-in',
    offers: [{
      id: 1,
      title: 'check-in tjkyuttrjgfhjnghf',
      price: getRandomInteger(OfferPriceRange.MIN, OfferPriceRange.MAX),
    }, {
      id: 2,
      title: 'check-in tjtyrujtjhgjtry',
      price: getRandomInteger(OfferPriceRange.MIN, OfferPriceRange.MAX),
    }, {
      id: 3,
      title: 'check-in tjhtrjt trjtyr',
      price: getRandomInteger(OfferPriceRange.MIN, OfferPriceRange.MAX),
    }],
  }, {
    type: 'sightseeing',
    offers: [{
      id: 1,
      title: 'sightseeing tykjtr jtryjtr ty',
      price: getRandomInteger(OfferPriceRange.MIN, OfferPriceRange.MAX),
    }, {
      id: 2,
      title: 'sightseeing tjhtyj tjtyrjtr',
      price: getRandomInteger(OfferPriceRange.MIN, OfferPriceRange.MAX),
    }, {
      id: 3,
      title: 'sightseeing tktrj tryjtyr jtry',
      price: getRandomInteger(OfferPriceRange.MIN, OfferPriceRange.MAX),
    }],
  }, {
    type: 'restaurant',
    offers: [{
      id: 1,
      title: 'restaurant tyj tryj t ty',
      price: getRandomInteger(OfferPriceRange.MIN, OfferPriceRange.MAX),
    }, {
      id: 2,
      title: 'restaurant tyj rtyj try',
      price: getRandomInteger(OfferPriceRange.MIN, OfferPriceRange.MAX),
    }, {
      id: 3,
      title: 'restaurant tyj  y yu',
      price: getRandomInteger(OfferPriceRange.MIN, OfferPriceRange.MAX),
    }],
  },
];

const OfferPriceRange = {
  MIN: 5,
  MAX: 50,
};

import { getRandomInteger } from '../view/utils.js';

export const generateOffers = () => [
  {
    type: 'taxi',
    offers: [{
      id: 1,
      title: 'ghnsdgsbgdfb',
      price: getRandomInteger(OfferPriceRange.MIN, OfferPriceRange.MAX),
    }, {
      id: 2,
      title: 'gfnjdfghddashd',
      price: getRandomInteger(OfferPriceRange.MIN, OfferPriceRange.MAX),
    }, {
      id: 3,
      title: 'hjkgdffsdhsd',
      price: getRandomInteger(OfferPriceRange.MIN, OfferPriceRange.MAX),
    }],
  },
  {
    type: 'bus',
    offers: [{
      id: 1,
      title: 'hjkgfhhsdgsgh',
      price: getRandomInteger(OfferPriceRange.MIN, OfferPriceRange.MAX),
    }, {
      id: 2,
      title: 'fhjghshgsdgfsd',
      price: getRandomInteger(OfferPriceRange.MIN, OfferPriceRange.MAX),
    }, {
      id: 3,
      title: 'fgjhfdjgdfhsdghf',
      price: getRandomInteger(OfferPriceRange.MIN, OfferPriceRange.MAX),
    }],
  }, {
    type: 'train',
    offers: [{
      id: 1,
      title: 'hgjkgfjdfghsdf',
      price: getRandomInteger(OfferPriceRange.MIN, OfferPriceRange.MAX),
    }, {
      id: 2,
      title: 'dfjkghfdfghsdf',
      price: getRandomInteger(OfferPriceRange.MIN, OfferPriceRange.MAX),
    }, {
      id: 3,
      title: 'dfgjhgfjdfhgdfh',
      price: getRandomInteger(OfferPriceRange.MIN, OfferPriceRange.MAX),
    }],
  }, {
    type: 'ship',
    offers: [{
      id: 1,
      title: 'dfghfgjgdfhdf',
      price: getRandomInteger(OfferPriceRange.MIN, OfferPriceRange.MAX),
    }, {
      id: 2,
      title: 'dfjgfhdfhdf',
      price: getRandomInteger(OfferPriceRange.MIN, OfferPriceRange.MAX),
    }, {
      id: 3,
      title: 'hkjgfhjfdhdf',
      price: getRandomInteger(OfferPriceRange.MIN, OfferPriceRange.MAX),
    }],
  }, {
    type: 'drive',
    offers: [{
      id: 1,
      title: 'fdghfjghjdhsdf',
      price: getRandomInteger(OfferPriceRange.MIN, OfferPriceRange.MAX),
    }, {
      id: 2,
      title: 'fhjgfhdhdfhdf',
      price: getRandomInteger(OfferPriceRange.MIN, OfferPriceRange.MAX),
    }, {
      id: 3,
      title: 'dfhjgfjdfhf',
      price: getRandomInteger(OfferPriceRange.MIN, OfferPriceRange.MAX),
    }],
  }, {
    type: 'flight',
    offers: [{
      id: 1,
      title: 'hjljkl;uytjythre',
      price: getRandomInteger(OfferPriceRange.MIN, OfferPriceRange.MAX),
    }, {
      id: 2,
      title: 'gfhjtyrrehhfghj',
      price: getRandomInteger(OfferPriceRange.MIN, OfferPriceRange.MAX),
    }, {
      id: 3,
      title: 'tyhtyrjyujtjt',
      price: getRandomInteger(OfferPriceRange.MIN, OfferPriceRange.MAX),
    }],
  }, {
    type: 'check-in',
    offers: [{
      id: 1,
      title: 'tjkyuttrjgfhjnghf',
      price: getRandomInteger(OfferPriceRange.MIN, OfferPriceRange.MAX),
    }, {
      id: 2,
      title: 'tjtyrujtjhgjtry',
      price: getRandomInteger(OfferPriceRange.MIN, OfferPriceRange.MAX),
    }, {
      id: 3,
      title: 'tjhtrjt trjtyr',
      price: getRandomInteger(OfferPriceRange.MIN, OfferPriceRange.MAX),
    }],
  }, {
    type: 'sightseeing',
    offers: [{
      id: 1,
      title: 'tykjtr jtryjtr ty',
      price: getRandomInteger(OfferPriceRange.MIN, OfferPriceRange.MAX),
    }, {
      id: 2,
      title: 'tjhtyj tjtyrjtr',
      price: getRandomInteger(OfferPriceRange.MIN, OfferPriceRange.MAX),
    }, {
      id: 3,
      title: 'tktrj tryjtyr jtry',
      price: getRandomInteger(OfferPriceRange.MIN, OfferPriceRange.MAX),
    }],
  }, {
    type: 'restaurant',
    offers: [{
      id: 1,
      title: 'tyj tryj t ty',
      price: getRandomInteger(OfferPriceRange.MIN, OfferPriceRange.MAX),
    }, {
      id: 2,
      title: 'tyj rtyj try',
      price: getRandomInteger(OfferPriceRange.MIN, OfferPriceRange.MAX),
    }, {
      id: 3,
      title: 'tyj  y yu',
      price: getRandomInteger(OfferPriceRange.MIN, OfferPriceRange.MAX),
    }],
  },
];

import { Observable, of } from 'rxjs';
import { EntityType } from './meta-types';

export const Person: EntityType = {
  name: 'person',
  fields: {
    firstName: {
      type: 'string',
    },
    lastName: {
      type: 'string',
    },
    age: {
      type: 'age',
    },
    addressLine1: {
      type: 'string',
    },
    addressLine2: {
      type: 'string',
    },
    country: {
      type: 'string',
      options: ['USA', 'CANADA'],
    },
    city: {
      type: 'string',
      caption: 'City',
      options: getCities,
    },
    state: {
      type: 'string',
      options: ['TX', 'NJ'],
    },
    county: {
      type: 'string',
      options: ['Dallas', 'Tarrant'],
    },
    birthCity: {
      type: 'string',
      caption: 'Birth City',
      options: getCities,
    },
    birthState: {
      type: 'string',
      options: ['TX', 'NJ'],
    },
    birthCountry: {
      type: 'string',
      options: ['Dallas', 'Tarrant'],
    },
  },
};

function getCities(): string[] {
  return ['Dallas', 'Houston', 'Irving'];
}

export const Payment: EntityType = {
  name: 'payment',
  fields: {
    firstName: {
      type: 'string',
    },
    lastName: {
      type: 'string',
    },
    cardNumber: {
      type: 'string',
    },
    CCV: {
      type: 'string',
    },
    expiry: {
      type: 'string',
    },
  },
};

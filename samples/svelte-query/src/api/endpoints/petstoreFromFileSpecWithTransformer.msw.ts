/**
 * Generated by orval v6.27.0 🍺
 * Do not edit manually.
 * Swagger Petstore
 * OpenAPI spec version: 1.0.0
 */
import { faker } from '@faker-js/faker';
import { HttpResponse, delay, http } from 'msw';
import type { Pet, Pets } from '../model';

export const getListPetsResponseMock = (overrideResponse: any = {}): Pets =>
  Array.from(
    { length: faker.number.int({ min: 1, max: 10 }) },
    (_, i) => i + 1,
  ).map(() => ({
    id: (() => faker.number.int({ min: 1, max: 99999 }))(),
    name: (() => faker.person.lastName())(),
    tag: (() => faker.person.lastName())(),
    ...overrideResponse,
  }));

export const getShowPetByIdResponseMock = () =>
  (() => ({
    id: faker.number.int({ min: 1, max: 99 }),
    name: faker.person.firstName(),
    tag: faker.helpers.arrayElement([faker.string.sample(), void 0]),
  }))();

export const getListPetsMockHandler = (overrideResponse?: Pets) => {
  return http.get('*/v:version/pets', async () => {
    await delay(1000);
    return new HttpResponse(
      JSON.stringify(
        overrideResponse ? overrideResponse : getListPetsResponseMock(),
      ),
      {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
        },
      },
    );
  });
};

export const getCreatePetsMockHandler = () => {
  return http.post('*/v:version/pets', async () => {
    await delay(1000);
    return new HttpResponse(null, {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  });
};

export const getShowPetByIdMockHandler = (overrideResponse?: Pet) => {
  return http.get('*/v:version/pets/:petId', async () => {
    await delay(1000);
    return new HttpResponse(
      JSON.stringify(
        overrideResponse ? overrideResponse : getShowPetByIdResponseMock(),
      ),
      {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
        },
      },
    );
  });
};
export const getSwaggerPetstoreMock = () => [
  getListPetsMockHandler(),
  getCreatePetsMockHandler(),
  getShowPetByIdMockHandler(),
];

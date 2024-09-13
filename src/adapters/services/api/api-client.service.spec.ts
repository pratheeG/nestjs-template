import { Test, TestingModule } from '@nestjs/testing';

import { ApiClientService } from './api-client.service';
import { NotFoundException } from '@nestjs/common';

describe('ApiClientService', () => {
  const requestConfig = { baseURL: 'https://jsonplaceholder.typicode.com/' };
  const service = new ApiClientService(requestConfig);
  const expectedGetResponse = {
    id: 123,
    name: 'Chair',
    price: 12,
  };
  const dataToCreate = {
    name: 'Chair',
    price: 12,
  };
  beforeEach(async () => {
    service.apiClient.get = jest.fn().mockImplementation((params) => {
      if (params === 'todos/1') {
        return {
          data: expectedGetResponse,
        };
      }
      throw new NotFoundException();
    });
    service.apiClient.post = jest.fn().mockImplementation((params) => {
      if (params === 'todos') {
        return { data: { ...dataToCreate, id: '123' } };
      }
      throw new NotFoundException();
    });
  });

  it('Should get data from the axios result', async () => {
    const actualResponse = await service.get<{}>('todos/1');
    expect(actualResponse).toStrictEqual(expectedGetResponse);
  });

  it('Should throw error when the id not found', async () => {
    try {
      await service.get<{}>('todos/2');
    } catch (error) {
      expect(error.message).toStrictEqual('Not Found');
    }
  });

  it('Should create data for the given input', async () => {
    const data = {
      id: '123',
      ...dataToCreate,
    };
    const actualResponse = await service.post<{}>('todos', data);
    expect(actualResponse).toStrictEqual(data);
  });

  it('Should throw error for post calls if it fails', async () => {
    const data = {
      id: '123',
      ...dataToCreate,
    };
    try {
      await service.post<{}>('todo', data);
    } catch (error) {
      expect(error.message).toStrictEqual('Not Found');
    }
  });
});

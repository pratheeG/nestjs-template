import * as CircuitBreaker from 'opossum';

import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';

import { Injectable } from '@nestjs/common';

@Injectable()
export class ApiClientService {
  apiClient: AxiosInstance;
  options = {
    timeout: 3000,
    errorThresholdPercentage: 50,
    resetTimeout: 30000,
  };
  constructor(private readonly requestConfig: AxiosRequestConfig) {
    this.apiClient = axios.create({
      baseURL: requestConfig.baseURL,
      headers: { ...requestConfig.headers, ...requestConfig.auth },
    });
  }

  private getCircuitBreaker<T>(
    axiosCall: (endpoint: string, params?: T) => Promise<T>,
  ) {
    return new CircuitBreaker(axiosCall, this.options);
  }

  async get<T>(endpoint: string): Promise<T> {
    try {
      const breaker = this.getCircuitBreaker<AxiosResponse>(this.apiClient.get);
      const response = await breaker.fire(endpoint);
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  async post<T>(endpoint: string, params: T): Promise<T> {
    try {
      const breaker = this.getCircuitBreaker(this.apiClient.post);
      const response = (await breaker.fire(endpoint, {
        ...params,
      })) as AxiosResponse;
      return response.data;
    } catch (error) {
      throw error;
    }
  }
}

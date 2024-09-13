import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export class BaseRepository<T> {
  protected _model;
  protected _prisma;

  constructor(model, prisma) {
    this._model = model;
    this._prisma = prisma;
  }

  // Do not `return await` in order to use prisma.$transaction
  // Refer: https://github.com/prisma/prisma/discussions/11277
  findMany(params?: {
    skip?: number;
    take?: number;
    cursor?: any;
    where?: any;
    orderBy?: any;
    include?: any;
    select?: any;
  }): Promise<T[]> {
    return this._model.findMany(params);
  }

  async findUnique(params: { where: any; select?: any; include?: any }): Promise<T> {
    return await this._model.findUnique(params);
  }

  async findFirst(params: { select?: any; where: any; orderBy?: any[] }): Promise<T> {
    return await this._model.findFirst(params);
  }

  async count(params?: { where: any }): Promise<number> {
    return await this._model.count(params);
  }

  async aggregate(params: any): Promise<any> {
    return await this._model.aggregate(params);
  }

  async sum(params: any): Promise<number> {
    return await this._model.aggregate({ ...params, _sum: params.fields });
  }

  async avg(params: any): Promise<number> {
    return await this._model.aggregate({ ...params, _avg: params.fields });
  }

  async min(params: any): Promise<number> {
    return await this._model.aggregate({ ...params, _min: params.fields });
  }

  async max(params: any): Promise<number> {
    return await this._model.aggregate({ ...params, _max: params.fields });
  }

  async groupBy(params: {
    skip?: number;
    take?: number;
    orderBy?: any;
    having?: any;
    by?: any;
    count?: boolean;
    where?: any;
  }): Promise<any> {
    const { skip = undefined, take = undefined, orderBy, having, by, count = false, where } = params;
    return await this._model.groupBy({
      by,
      where,
      _count: count,
      orderBy,
      having,
      skip,
      take,
    });
  }

  async executeRaw(query): Promise<any> {
    return await this._prisma.$queryRawUnsafe(query);
  }

  async executeQueryRaw(query): Promise<any> {
    return await this._prisma.$queryRaw(query);
  }

  async create(params: any): Promise<T> {
    return await this._model.create(params);
  }

  async createMany(params: any[]): Promise<T> {
    return await this._model.createMany(params);
  }

  async update(params: { where: any; data: any }): Promise<T> {
    return await this._model.update(params);
  }

  async updateMany(params: { where: any; data: any }): Promise<T[]> {
    return await this._model.updateMany(params);
  }

  async delete(params: { where: any }): Promise<T> {
    return await this._model.delete(params);
  }

  async deleteMany(params: { where: any }): Promise<T[]> {
    return await this._model.deleteMany(params);
  }

  async $transaction(params: any): Promise<any> {
    return await prisma.$transaction(params);
  }
}

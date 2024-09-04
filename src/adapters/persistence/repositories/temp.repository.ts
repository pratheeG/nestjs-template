import { BaseRepository } from './index';
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/service/prisma.service';
import { temp } from '@prisma/client';

@Injectable()
export class TempRepository extends BaseRepository<temp> {
  constructor(private readonly prismaService: PrismaService) {
    super(prismaService.temp, prismaService);
  }
}

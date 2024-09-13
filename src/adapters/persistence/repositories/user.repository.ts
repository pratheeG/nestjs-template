import { BaseRepository } from './index';
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/service/prisma.service';
import { User } from '@prisma/client';

@Injectable()
export class TempRepository extends BaseRepository<User> {
  constructor(private readonly prismaService: PrismaService) {
    super(prismaService.user, prismaService);
  }
}

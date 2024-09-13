import { ApiClientService } from './adapters/services/api/api-client.service';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Module } from '@nestjs/common';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [AppService, ApiClientService],
})
export class AppModule {}

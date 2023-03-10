import { Module } from '@nestjs/common';
import { BucketService } from './bucket.service';
import { BucketController } from './bucket.controller';
import { ConfigService } from '@nestjs/config';

@Module({
  controllers: [BucketController],
  providers: [BucketService,ConfigService],

})
export class BucketModule {}

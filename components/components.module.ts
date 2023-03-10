import { Module } from '@nestjs/common';
import { ComponentsService } from './components.service';
import { ComponentsController } from './components.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { BucketService } from 'src/bucket/bucket.service';
import { ConfigService } from '@nestjs/config';

@Module({
  controllers: [ComponentsController],
  providers: [ComponentsService,BucketService,ConfigService],
  imports: [PrismaModule]
})
export class ComponentsModule {}

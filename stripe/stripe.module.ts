import { Module } from '@nestjs/common';
import { StripeService } from './stripe.service';
import { StripeController } from './stripe.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { ConfigService } from '@nestjs/config';

@Module({
  controllers: [StripeController],
  providers: [StripeService,ConfigService],
  imports:[PrismaModule]
})
export class StripeModule {}

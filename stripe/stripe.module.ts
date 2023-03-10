import { Module } from '@nestjs/common';
import { StripeService } from './stripe.service';
import { StripeController } from './stripe.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { ConfigService } from '@nestjs/config';
import { TransactionsService } from 'src/transactions/transactions.service';
import { TransactionsModule } from 'src/transactions/transactions.module';
import { UsersService } from 'src/users/users.service';
import { LicensesService } from 'src/licenses/licenses.service';

@Module({
  controllers: [StripeController],
  providers: [StripeService,ConfigService,TransactionsService,UsersService,LicensesService],
  imports:[PrismaModule,TransactionsModule]
})
export class StripeModule {}

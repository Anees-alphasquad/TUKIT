import { Module } from '@nestjs/common';
import { TransactionsService } from './transactions.service';
import { TransactionsController } from './transactions.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { UsersService } from 'src/users/users.service';
import { LicensesService } from 'src/licenses/licenses.service';

@Module({
  controllers: [TransactionsController],
  providers: [TransactionsService,UsersService,LicensesService],
  imports:[PrismaModule]
})
export class TransactionsModule {}

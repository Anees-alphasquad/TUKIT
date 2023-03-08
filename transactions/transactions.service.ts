import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/migrations/prisma.service';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { UpdateTransactionDto } from './dto/update-transaction.dto';
import { UsersService } from 'src/users/users.service';
import { LicensesService } from 'src/licenses/licenses.service';

@Injectable()
export class TransactionsService {
  constructor(private prisma:PrismaService,
       private users:UsersService,
         private licenses:LicensesService){}


         
  create(createTransactionDto: CreateTransactionDto) {
    return this.prisma.transactions.create({
      data:createTransactionDto
    });
  }

  findAll() {
    return `This action returns all transactions`;
  }

  findOne(id: number) {
    return this.prisma.transactions.findUnique({
      where:
      {
         id:id
      },
    });
  }

  update(id: number, updateTransactionDto: UpdateTransactionDto) {
    return `This action updates a #${id} transaction`;
  }

  remove(id: number) {
    return `This action removes a #${id} transaction`;
  }
}

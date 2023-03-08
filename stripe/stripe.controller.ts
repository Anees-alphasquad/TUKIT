import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { StripeService } from './stripe.service';
import { CreateStripeDto } from './dto/create-stripe.dto';
import { UpdateStripeDto } from './dto/update-stripe.dto';
import { UpdateUserDto } from 'src/users/dto/update-user.dto';

@Controller('stripe')
export class StripeController {
  
  constructor(private  stripeService: StripeService) {}

  @Post('create-checkout-session')
  createCheckOutSession(@Body('stripePriceId') stripePriceId: string, @Body('productName') productName: string, @Body("userId") userId: number,
   @Body('licenseId') licenseId: number, @Body('templateId') templateId: number) {
      return this.stripeService.createCheckoutSession(stripePriceId, productName, userId,licenseId,templateId)
  }
  @Post('retrieve-checkout-session')
    retrieveCheckOutSession (@Body('SessionId') SessionId: string) {
        return this.stripeService.retrieveSession(SessionId)
    }
    @Post('verify')
    verify(@Body() body: { sessionId: string }) {
      const { sessionId } = body;
      return this.stripeService.verifyPayment(sessionId);

    }

    // @Get('data') 
    // storedata(@Query() allParams: any) {
    //     return this.stripeService.storedata(allParams)
    // }
  

}

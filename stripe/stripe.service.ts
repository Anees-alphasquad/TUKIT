import { Injectable } from '@nestjs/common';
import { CreateStripeDto } from './dto/create-stripe.dto';
import { UpdateStripeDto } from './dto/update-stripe.dto';
import { ConfigService } from '@nestjs/config';
import { Stripe } from 'stripe';
import { TransactionsService } from 'src/transactions/transactions.service';

@Injectable()
export class StripeService {
  private stripe: Stripe;
  constructor(
    readonly configService: ConfigService,
  ) {
    this.stripe = new Stripe(configService.get<string>('STRIPE_SECRET_KEY'), {
      apiVersion: '2022-11-15',
    });
  }

  async createCheckoutSession( stripePriceId:string,  productName:string,userId:number,licenseId:number,templateId:number) {
    const session = await this.stripe.checkout.sessions.create({
      success_url:
        'http://localhost:3000/success?session_id={CHECKOUT_SESSION_ID}',
      cancel_url: 'http://localhost:3000/cancel',
      line_items: [{ price:stripePriceId, quantity: 1 }],
      mode: 'payment',
      metadata: {
        userId,productName,licenseId, templateId     
      },
    });

    return this.createPaymentIntent(session);
  }

  async createPaymentIntent(session: any) {
    const paymentIntent = await this.stripe.paymentIntents.create({
      amount: session.amount_total,
      // customer: stripeCustomerId,
      // payment_method: paymentMethodId,
      currency: this.configService.get('STRIPE_CURRENCY'),
      automatic_payment_methods: { enabled: true },
    });

    const id = paymentIntent.id;
    return {
      session_id: session.id,
      session_url: session.url,
      paymentIntent,
      id,
    };
  }

  

  async verifyPayment(sessionId: string) {
    const retrieveSession= this.stripe.checkout.sessions.retrieve(sessionId)
    const  paymentIntentId= String((await retrieveSession).payment_intent)
    const verify = await this.stripe.paymentIntents.retrieve(paymentIntentId);
    if (verify && verify.status === 'succeeded') {
      console.log('success');
    } else {
      console.log('fail');
    }
    return verify.status;
  }
  async retrieveSession(sessionId: string) {
    return this.stripe.checkout.sessions.retrieve(sessionId);
  }
}
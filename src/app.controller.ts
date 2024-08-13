import { Body, Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) { }

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Post('/GetPurchaseRequisition')
  async getPurchaseRequisition(@Body() body) {

    const stripe = require('stripe')(body.key);

    const paymentIntent = await stripe.paymentIntents.create({
      amount: body.amount,
      currency: body.currency,
      payment_method_types: ['card'],
      automatic_payment_methods: {
        enabled: false,
      },
    });
    return paymentIntent;
  }
}

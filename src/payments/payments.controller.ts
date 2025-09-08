import { Body, Controller, Get, Post, Req, Res } from '@nestjs/common';
import { PaymentsService } from './payments.service';
import { PaymentSessionDto } from './dto/payment-session.dto';
import express from 'express';
import { MessagePattern, Payload } from '@nestjs/microservices';


@Controller('payments')
export class PaymentsController {
  constructor(private readonly paymentsService: PaymentsService) {}


  // @Post('create-payment-session')
  @MessagePattern('create.payment.session')
  createPaymentSession( @Payload() paymentSessionDto: PaymentSessionDto){

    return this.paymentsService.createPaymentSession( paymentSessionDto );
    
  }

  @Get('success')
  succes(){
    return{
      ok: true,
      message: 'Payment successful'
    }
  }

  @Get('cancelled')
  cancel(){
    return{
      ok: false,
      message: 'Payment cancelled'
    }
  }

  @Post('webhook')
  async stripeWebhook(@Req() req: express.Request, @Res() res: express.Response){
    return this.paymentsService.stripeWebhook(req, res);
  }

}

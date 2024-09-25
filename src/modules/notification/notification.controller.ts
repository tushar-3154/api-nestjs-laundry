import {
  Controller,
  HttpException,
  HttpStatus,
  Param,
  ParseIntPipe,
  Post,
} from '@nestjs/common';
import { NotificationService } from './notification.service';

@Controller('notifications')
export class NotificationController {
  constructor(private readonly notificationService: NotificationService) {}

  @Post('whatsapp/:order_id')
  async sendWhatsAppNotification(
    @Param('order_id', ParseIntPipe) order_id: number,
  ) {
    try {
      await this.notificationService.sendWhatsAppNotification(order_id);
      return { message: 'WhatsApp notification sent successfully.' };
    } catch (error) {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          error: error.message || 'Failed to send WhatsApp notification',
        },
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}

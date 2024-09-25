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

  @Post('whatsapp/:orderId')
  async sendWhatsAppNotification(
    @Param('orderId', ParseIntPipe) orderId: number,
  ) {
    try {
      await this.notificationService.sendWhatsAppNotification(orderId);
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

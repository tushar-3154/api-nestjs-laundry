import { HttpService } from '@nestjs/axios';
import {
  forwardRef,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { firstValueFrom } from 'rxjs';
import { OrderDetail } from 'src/entities/order.entity';
import { OrderService } from '../order/order.service';

@Injectable()
export class NotificationService {
  private readonly apiUrl = 'https://wts.vision360solutions.co.in/api/sendText';

  constructor(
    private readonly httpService: HttpService,
    @Inject(forwardRef(() => OrderService))
    private readonly orderService: OrderService,
  ) {}
  async sendWhatsAppNotification(order_id: number): Promise<void> {
    const order: OrderDetail = await this.orderService.findOrderById(order_id);
    if (!order) {
      throw new NotFoundException(`Order with ID ${order_id} not found.`);
    }

    const message = this.prepareMessage(order);

    const encodedMessage = encodeURIComponent(message);

    const finalUrl = `${this.apiUrl}?token=${process.env.TOKEN}&phone=91${order.user.mobile_number}&message=${encodedMessage}`;

    const response = await firstValueFrom(this.httpService.post(finalUrl, {}));

    if (response.status !== 200) {
      throw new Error('Failed to send WhatsApp notification');
    }
  }

  private prepareMessage(order: OrderDetail): string {
    return `Dear ${order.user.first_name} ${order.user.last_name}, Your booking has been confirmed with Booking No: SCONLINE/${order.order_id}, on Dated ${order.created_at.toISOString()}, Total No of clothes ${order.items.length}, Total Amount: ${order.total}. Please, check your bill on this link: www.sikkacleaners.in/sikka-billing/customer-login.`;
  }
}

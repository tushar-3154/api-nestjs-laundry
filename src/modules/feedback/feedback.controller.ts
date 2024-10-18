import { Body, Controller, Post } from '@nestjs/common';
import { Response } from 'src/dto/response.dto';
import { CreateFeedbackDto } from './dto/create-feedback.dto';
import { FeedbackService } from './feedback.service';

@Controller('feedback')
export class FeedbackController {
  constructor(private feedbackService: FeedbackService) {}

  @Post()
  async createFeedback(
    @Body() createFeedbackDto: CreateFeedbackDto,
  ): Promise<Response> {
    return this.feedbackService.createFeedback(createFeedbackDto);
  }
}

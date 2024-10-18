import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Response } from 'src/dto/response.dto';
import { Feedback } from 'src/entities/feedback.entity';
import { Repository } from 'typeorm';
import { CreateFeedbackDto } from './dto/create-feedback.dto';

@Injectable()
export class FeedbackService {
  constructor(
    @InjectRepository(Feedback)
    private feedbackRepository: Repository<Feedback>,
  ) {}

  async createFeedback(
    createFeedbackDto: CreateFeedbackDto,
  ): Promise<Response> {
    const existingFeedback = await this.feedbackRepository.findOne({
      where: { order_id: createFeedbackDto.order_id },
    });
    if (existingFeedback) {
      throw new BadRequestException('Feedback already exists for this order');
    }

    const feedback = this.feedbackRepository.create(createFeedbackDto);
    const result = this.feedbackRepository.save(feedback);
    return {
      statusCode: 200,
      message: 'Feedback added successfully',
      data: result,
    };
  }
}

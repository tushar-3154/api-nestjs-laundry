import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Feedback } from 'src/entities/feedback.entity';
import { FeedbackController } from './feedback.controller';
import { FeedbackService } from './feedback.service';

@Module({
  imports: [TypeOrmModule.forFeature([Feedback])],
  providers: [FeedbackService],
  controllers: [FeedbackController],
})
export class FeedbackModule {}

import { Processor, Process } from '@nestjs/bull';
import { Job } from 'bull';
import { EmailService } from './email.service';

@Processor('email')
export class EmailQueueProcessor {
  constructor(private readonly emailService: EmailService) {}

  @Process('sendEmail')
  async handleSendEmail(job: Job<any>) {
    const { email, template, context } = job.data;
    await this.emailService.sendMail(email, template, context);
  }
}

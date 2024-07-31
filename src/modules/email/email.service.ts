import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import { InjectQueue } from '@nestjs/bull';
import { Queue } from 'bull';

@Injectable()
export class EmailService {
  constructor(
    private readonly mailerService: MailerService,
    @InjectQueue('email') private readonly emailQueue: Queue
  ) {}

  // Sends email immediately using the MailerService
  async sendMail(email: string, template: string, context: any) {
    try {
      await this.mailerService.sendMail({
        to: email,
        subject: 'Notification', // Consider making subject dynamic or configurable
        template: template,
        context: context,
      });
    } catch (error) {
      // Handle error if sending email fails
      throw new Error(`Failed to send email: ${error.message}`);
    }
  }

  // Adds email job to the queue
  async addEmailToQueue(email: string, template: string, context: any) {
    try {
      await this.emailQueue.add('sendEmail', {
        email,
        template,
        context,
      });
    } catch (error) {
      // Handle error if adding to queue fails
      throw new Error(`Failed to add email to queue: ${error.message}`);
    }
  }

  // Additional methods can be uncommented and used as needed
  // async sendTicketEmail(email: string, ticketDetails: any) {
  //   await this.emailQueue.add('sendEmail', {
  //     email,
  //     template: 'ticket',
  //     context: { ticketDetails },
  //   });
  // }

  // async sendInvoiceEmail(email: string, invoiceDetails: any) {
  //   await this.emailQueue.add('sendEmail', {
  //     email,
  //     template: 'invoice',
  //     context: { invoiceDetails },
  //   });
  // }

  // async sendEmailVerification(email: string, verificationCode: string) {
  //   await this.emailQueue.add('sendEmail', {
  //     email,
  //     template: 'email-verification',
  //     context: { verificationCode },
  //   });
  // }

  // async sendPaymentReceiptEmail(email: string, receiptDetails: any) {
  //   await this.emailQueue.add('sendEmail', {
  //     email,
  //     template: 'payment-receipt',
  //     context: { receiptDetails },
  //   });
  // }
}

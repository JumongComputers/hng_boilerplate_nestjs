import { Module } from '@nestjs/common';
import { BullModule } from '@nestjs/bull';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { EmailService } from './email.service';
import { EmailQueueProcessor } from './email.queue.processor';

@Module({
  imports: [
    ConfigModule,
    BullModule.registerQueueAsync({
      name: 'email',
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        redis: {
          host: configService.get<string>('REDIS_HOST'),
          port: configService.get<number>('REDIS_PORT'),
        },
      }),
      inject: [ConfigService],
    }),
  ],
  providers: [EmailService, EmailQueueProcessor],
  exports: [EmailService, BullModule], // Ensure BullModule is exported
})
export class EmailQueueModule {}

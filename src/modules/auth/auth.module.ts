import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';

import RegistrationController from './auth.controller';
import AuthenticationService from './auth.service';
import UserService from '../user/user.service';
import { OtpService } from '../otp/otp.service';
import { EmailService } from '../email/email.service';

import { User } from '../user/entities/user.entity';
import { Otp } from '../otp/entities/otp.entity';

import { OtpModule } from '../otp/otp.module';
import { EmailQueueModule } from '../email/email.queue.module';

import authConfig from '../../../config/auth.config';

@Module({
  controllers: [RegistrationController],
  providers: [AuthenticationService, UserService, OtpService, EmailService],
  imports: [
    TypeOrmModule.forFeature([User, Otp]),
    PassportModule,
    OtpModule,
    EmailQueueModule,
    JwtModule.register({
      global: true,
      secret: authConfig().jwtSecret,
      signOptions: { expiresIn: `${authConfig().jwtExpiry}s` },
    }),
  ],
})
export class AuthModule {}

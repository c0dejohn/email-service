import { Module } from '@nestjs/common';
import { EmailHandlerController } from './controller/email-handler.controller';
import { EmailHandlerService } from './service/email-handler.service';
import { SendGridRepository } from './repository/send-grid.repository';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MailerModule } from '@nestjs-modules/mailer';
import { MailgunRepository } from './repository/mailgun.repository';
import { MailgunModule } from 'nestjs-mailgun';

@Module({
  imports: [
    ConfigModule,
    MailerModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        transport: {
          host: configService.get('SENDGRID_HOST'),
          auth: {
            user: configService.get('SENDGRID_USER'),
            pass: configService.get('SENDGRID_API_KEY'),
          },
        },
      }),
    }),
  ],
  controllers: [EmailHandlerController],
  providers: [EmailHandlerService, SendGridRepository, MailgunRepository],
})
export class EmailHandlerModule {}

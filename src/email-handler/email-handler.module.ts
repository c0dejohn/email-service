import { Module } from '@nestjs/common';
import { EmailHandlerController } from './controller/email-handler.controller';
import { EmailHandlerService } from './service/email-handler.service';
import { SendGridRepository } from './repository/send-grid-repository';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ConfigModule],
  controllers: [EmailHandlerController],
  providers: [EmailHandlerService, SendGridRepository],
})
export class EmailHandlerModule {}

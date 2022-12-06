import { Module } from '@nestjs/common';
import { EmailHandlerModule } from './email-handler/email-handler.module';

@Module({
  imports: [EmailHandlerModule],
  controllers: [],
  providers: [],
})
export class AppModule {}

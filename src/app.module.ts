import { Module } from '@nestjs/common';
import { EmailHandlerModule } from './email-handler/email-handler.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true }), EmailHandlerModule],
  controllers: [],
  providers: [],
})
export class AppModule {}

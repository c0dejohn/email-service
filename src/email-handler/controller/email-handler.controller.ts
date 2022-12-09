import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Logger,
  Post,
} from '@nestjs/common';
import { EmailHandlerService } from '../service/email-handler.service';
import RequestBodyDto from '../dto/request-body.dto';
import ResponseDto from '../dto/response.dto';

@Controller('')
export class EmailHandlerController {
  private readonly logger = new Logger(EmailHandlerController.name);
  constructor(private readonly emailHandlerService: EmailHandlerService) {}

  @Get('health')
  @HttpCode(HttpStatus.OK)
  async health(): Promise<object> {
    return { status: 'OK' };
  }

  @Post('email-handler/api/v1/send-email')
  @HttpCode(HttpStatus.ACCEPTED)
  async sendEmail(@Body() body: RequestBodyDto): Promise<ResponseDto> {
    this.logger.log('EmailHandlerController@sendEmail entry data', body);
    return await this.emailHandlerService.sendEmail(body);
  }
}

import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Logger,
  Post,
} from '@nestjs/common';
import { EmailHandlerService } from '../service/email-handler.service';
import RequestBodyDto from '../dto/request-body.dto';
import ResponseDto from '../dto/response.dto';

@Controller('email-handler/api/v1/')
export class EmailHandlerController {
  private readonly logger = new Logger(EmailHandlerController.name);
  constructor(private readonly emailHandlerService: EmailHandlerService) {}

  @Post('send-email')
  @HttpCode(HttpStatus.ACCEPTED)
  async sendEmail(@Body() body: RequestBodyDto): Promise<ResponseDto> {
    this.logger.log('EmailHandlerController@sendEmail entry data', body);
    return await this.emailHandlerService.sendEmail(body);
  }
}

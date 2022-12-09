import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
//import { RiskValidateTenureDto } from '../../dto/core/request/riskValidateTenure.dto';
//import { RiskValidateTenureResponseDto } from '../../dto/core/response/riskValidateTenureResponse.dto';
import * as util from 'util';
import RequestBodyDto from '../dto/request-body.dto';
import { MailerService } from '@nestjs-modules/mailer';

@Injectable()
export class SendGridRepository {
  public readonly logger = new Logger(SendGridRepository.name);

  constructor(
    readonly configService: ConfigService,
    private mailService?: MailerService,
  ) {}

  async sendMessage(body: RequestBodyDto): Promise<any> {
    const apiToken = this.configService.get('SENDGRID_API_KEY');
    const headers = { authorization: `Bearer ${apiToken}` };
    const msg = {
      to: body.email,
      from: this.configService.get('SENDING_MAIL'), // Use the email address or domain you verified above
      subject: body.subject,
      html: body.message,
      mail_settings: {
        sandbox_mode: {
          enable: true,
        },
      },
    };
    const response = await this.mailService
      .sendMail(msg)
      .then((res) => {
        return res;
      })
      .catch((err) => {
        this.logger.error('@SendGridRepository response error');
        this.logger.error(err);
        throw err;
      });

    this.logger.log('@sendMessage Request headers: ');
    this.logger.log(
      util.inspect(headers, {
        showHidden: false,
        depth: null,
        colors: true,
      }),
    );

    this.logger.log('@sendMessage Request body to sendGrid api: ');
    this.logger.log(
      util.inspect(msg, {
        showHidden: false,
        depth: null,
        colors: true,
      }),
    );

    return {
      data: response.response,
      message: response.messageId,
    };
  }
}

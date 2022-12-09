import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { fromJSON, parse, stringify, toJSON } from 'flatted';
import axios from 'axios';
import * as util from 'util';
import RequestBodyDto from '../dto/request-body.dto';

@Injectable()
export class MailgunRepository {
  public readonly logger = new Logger(MailgunRepository.name);

  constructor(readonly configService: ConfigService) {}

  async sendMessage(body: RequestBodyDto): Promise<any> {
    const url = this.configService.get('MAILGUN_URL');
    const key = this.configService.get('MAILGUN_API_KEY');
    const mailOptions = {
      from: `MAILSERVICE <${this.configService.get('SENDING_MAIL')}>`,
      to: body.email,
      subject: body.subject,
      text: `hi ${body.name}, ${body.message}`,
    };

    this.logger.log('@sendMessage Request url: ', url);
    try {
      const payload = Object.keys(mailOptions)
        .map((key) => `${key}=${encodeURIComponent(mailOptions[key])}`)
        .join('&');
      this.logger.log('@sendMessage Request body to mailgun api: ');
      this.logger.log(
        util.inspect(payload, {
          showHidden: false,
          depth: null,
          colors: true,
        }),
      );
      const response = await axios.post(`${url}/messages`, payload, {
        auth: {
          username: this.configService.get('MAILGUN_USER'),
          password: key,
        },
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      });
      this.logger.log(
        '@sendMessage Email successfully sent to: ',
        mailOptions.to,
      );
      return { data: response.data };
    } catch (err) {
      this.logger.error('Whoops! Something went wrong');
      this.logger.error(
        util.inspect(err.response.data, { showHidden: false, depth: null }),
      );
      throw err;
    }
  }
}

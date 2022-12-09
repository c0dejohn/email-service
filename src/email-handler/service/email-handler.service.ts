import { Injectable, Logger } from '@nestjs/common';
import { SendGridRepository } from '../repository/send-grid.repository';
import RequestBodyDto from '../dto/request-body.dto';
import { MailgunRepository } from '../repository/mailgun.repository';
import * as util from 'util';
import ResponseDto from '../dto/response.dto';

@Injectable()
export class EmailHandlerService {
  public readonly logger = new Logger(EmailHandlerService.name);
  constructor(
    private readonly sendGridRepository: SendGridRepository,
    private readonly mailgunRepository: MailgunRepository,
  ) {}
  defaultProvider = this.mailgunRepository;
  async sendEmail(body: RequestBodyDto): Promise<ResponseDto> {
    try {
      return await this.defaultProvider.sendMessage(body);
    } catch (err) {
      this.logger.error('@sendEmail error', err);
      this.switchProvider();
      return this.defaultProvider.sendMessage(body);
    }
  }
  private switchProvider() {
    this.logger.log(
      '@defaultPorvider',
      util.inspect(this.defaultProvider.constructor.name, {
        showHidden: false,
        depth: null,
        colors: true,
      }),
    );
    if (this.defaultProvider.constructor.name === 'SendGridRepository') {
      this.defaultProvider = this.mailgunRepository;
    } else {
      this.defaultProvider = this.sendGridRepository;
    }
    this.logger.log('@switchProvider', this.defaultProvider.constructor.name);
    return this.defaultProvider;
  }
}

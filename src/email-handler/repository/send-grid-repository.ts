import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
//import { RiskValidateTenureDto } from '../../dto/core/request/riskValidateTenure.dto';
//import { RiskValidateTenureResponseDto } from '../../dto/core/response/riskValidateTenureResponse.dto';
import * as util from 'util';
import axios from 'axios';
import SendgridRequestBodyDto from '../dto/sendgrid-request-body.dto';

@Injectable()
export class SendGridRepository {
  private readonly logger = new Logger(SendGridRepository.name);

  constructor(private readonly configService: ConfigService) {}

  async sendMessage(body: SendgridRequestBodyDto): Promise<any> {
    const url = this.configService.get('SENDGRID_API_URL');
    const apiToken = this.configService.get('SENDGRID_API_KEY');
    const headers = this.createHeaderGenerate(apiToken);

    this.logger.log('@sendMessage Request url: ', url);
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
      util.inspect(body, {
        showHidden: false,
        depth: null,
        colors: true,
      }),
    );
    const response = await axios
      .post<any>(url, body, {
        headers,
      })
      .catch((err) => {
        this.logger.error('@SendGridRepository response error');
        this.logger.error(err);
        throw err;
      });
    return { data: response.data, status: response.status };
  }

  private createHeaderGenerate(apiToken: string) {
    return {
      authorization: `Bearer ${apiToken}`,
    };
  }
}

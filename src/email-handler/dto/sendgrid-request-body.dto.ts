import 'reflect-metadata';
import { Type } from 'class-transformer';

export class From {
  public email?: string;
}

export class Personalizations {
  @Type(() => To)
  public to?: To[];
  public subject?: string;
}

export class To {
  public email?: string;
}

export class Content {
  public type?: string;
  public value?: string;
}

export default class SendgridRequestBodyDto {
  @Type(() => Personalizations)
  public personalizations?: Personalizations[];
  @Type(() => From)
  public from?: From;
  @Type(() => Content)
  public content?: Content[];
}

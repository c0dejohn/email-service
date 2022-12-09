import { Test, TestingModule } from '@nestjs/testing';
import { EmailHandlerService } from './email-handler.service';
import { SendGridRepository } from '../repository/send-grid.repository';
import { MailgunRepository } from '../repository/mailgun.repository';

describe('EmailHandlerSevice', () => {
  let service: EmailHandlerService;
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const sendGridRepository: jest.MockedObjectDeep<Partial<SendGridRepository>> =
    {
      sendMessage: jest.fn(),
    };
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const mailgunRepository: jest.MockedObjectDeep<Partial<MailgunRepository>> = {
    sendMessage: jest.fn(),
  };
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: SendGridRepository,
          useValue: sendGridRepository,
        },
        {
          provide: MailgunRepository,
          useValue: mailgunRepository,
        },
        EmailHandlerService,
      ],
    }).compile();

    service = module.get<EmailHandlerService>(EmailHandlerService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should swich to valid provider', async () => {
    const body = {
      email: 'test@test.com',
      subject: 'test',
      message: 'test',
      name: 'John Doe',
    };
    const response = {
      message: '250 Ok: queued as Ulr58tDWRYaFObTO2ocP4w',
      id: '<8385ca0a-db72-a407-645a-71d2023cf6b6@gmail.com>',
    };
    expect.assertions(1);
    try {
      sendGridRepository.sendMessage.mockResolvedValue(response);
    } catch (err) {
      expect(err).toMatch('error');
      mailgunRepository.sendMessage.mockResolvedValue(response);
    }

    const result = await service.sendEmail(body);
    expect(result).toBe(response);
  });
});

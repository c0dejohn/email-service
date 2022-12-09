import { Test, TestingModule } from '@nestjs/testing';
import { EmailHandlerController } from './email-handler.controller';
import { EmailHandlerService } from '../service/email-handler.service';
import RequestBodyDto from '../dto/request-body.dto';

describe('EmailHandlerController', () => {
  let controller: EmailHandlerController;
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const emailHandlerService: jest.MockedObjectDeep<
    Partial<EmailHandlerService>
  > = {
    sendEmail: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EmailHandlerController],
      providers: [
        {
          provide: EmailHandlerService,
          useValue: emailHandlerService,
        },
      ],
    }).compile();

    controller = module.get<EmailHandlerController>(EmailHandlerController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should return an id & message when the service is called', async () => {
    const body: RequestBodyDto = {
      name: 'john doe',
      email: 'test@test.com',
      subject: 'subject',
      message: 'text',
    };
    const result = { id: 'a1s2a3s', message: 'message' };
    emailHandlerService.sendEmail.mockResolvedValueOnce(result);
    const response = await controller.sendEmail(body);

    expect(response).toBe(result);
    expect(emailHandlerService.sendEmail).toBeCalledWith(body);
  });
});

import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
} from '@nestjs/common';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const request = ctx.getRequest();

    let status = HttpStatus.INTERNAL_SERVER_ERROR;
    let message: any = 'Internal server error';

    if (exception instanceof HttpException) {
      status = exception.getStatus();
      const res = exception.getResponse();
      message = (res as any)?.message ?? res ?? exception.message;
    } else if (exception && typeof exception === 'object') {
      message = (exception as any)?.message ?? message;
    }

    const errorBody = {
      statusCode: status,
      message,
      timestamp: new Date().toISOString(),
      path: request?.url,
    };

    response.status(status).json(errorBody);
  }
}

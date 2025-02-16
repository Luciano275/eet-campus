import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { Request } from 'express';
import { catchError, firstValueFrom } from 'rxjs';
import { AxiosError } from 'axios';

@Injectable()
export class AppGuard implements CanActivate {
  constructor(private readonly httpService: HttpService) {}

  async canActivate(context: ExecutionContext) {
    const req = context.switchToHttp().getRequest() as Request;

    const { data } = await firstValueFrom(
      this.httpService
        .get('http://localhost:3000/api/auth/session', {
          withCredentials: true,
          headers: req.headers,
        })
        .pipe(
          catchError((err: AxiosError) => {
            throw new InternalServerErrorException('Failed to verify session');
          }),
        ),
    );

    if (!data) {
      throw new UnauthorizedException();
    }

    const { userId }: { userId?: string } = req.query;

    if (userId && data.user.id !== userId) {
      throw new ForbiddenException();
    }

    return true;
  }
}

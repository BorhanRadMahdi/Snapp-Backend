import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { IS_PUBLIC_KEY } from 'src/common/decorators/public.decorator';
import { PassengerAuthService } from './auth.service';

@Injectable()
export class PassengerAuthGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    private readonly passengerAuthService: PassengerAuthService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (isPublic) return true;

    const request = context.switchToHttp().getRequest();
    const response = context.switchToHttp().getResponse();

    const authHeader =
      request.headers.authorization || request.headers.Authorization;
    if (!authHeader || typeof authHeader !== 'string') {
      throw new UnauthorizedException('Authorization header is required');
    }

    const token = authHeader.replace(/Bearer\s+/i, '').trim();
    if (!token) {
      throw new UnauthorizedException('Bearer token is required');
    }

    const result = await this.passengerAuthService.authorize(token);
    if (!result?.isAuthorized) {
      throw new UnauthorizedException('Passenger is not authorized');
    }

    request.passenger = result.passenger;
    request.passengerSession = result.session;

    if (result.tokenData?.token) {
      response.setHeader('Authorization', `Bearer ${result.tokenData.token}`);
    }

    return true;
  }
}


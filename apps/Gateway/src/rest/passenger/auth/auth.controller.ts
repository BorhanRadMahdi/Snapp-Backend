import {
  Body,
  Controller,
  Get,
  Post,
  Request,
  UseFilters,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import {
  PassengerRequestOtpInputDto,
  PassengerVerifyOtpInputDto,
} from 'src/dtos/passenger.dto';
import { HttpExceptionFilter } from 'src/response/httpException.filter';
import { ResponseInterceptor } from 'src/response/response.interceptors';
import { Public } from 'src/common/decorators/public.decorator';
import { PassengerAuthService } from './auth.service';
import { PassengerAuthGuard } from './auth.guard';

@ApiTags('Passenger:Auth')
@Controller('passenger/auth')
@ApiBearerAuth('Authorization')
@UseGuards(PassengerAuthGuard)
@UseFilters(HttpExceptionFilter)
@UseInterceptors(ResponseInterceptor)
export class PassengerAuthController {
  constructor(private readonly passengerAuthService: PassengerAuthService) {}

  @Post('request-otp')
  @Public()
  @ApiOperation({ summary: 'Request otp in app by phone number' })
  async requestOtp(@Body() body: PassengerRequestOtpInputDto) {
    return await this.passengerAuthService.requestOtp(body);
  }

  @Post('verify-otp')
  @Public()
  @ApiOperation({ summary: 'Verify otp sent to passenger phone number' })
  async verifyOtp(@Body() body: PassengerVerifyOtpInputDto) {
    return await this.passengerAuthService.verifyOtp(body);
  }

  @Get('/profile')
  @ApiOperation({ summary: 'Get passenger profile' })
  async getProfile(@Request() req) {
    return req.passenger;
  }
}
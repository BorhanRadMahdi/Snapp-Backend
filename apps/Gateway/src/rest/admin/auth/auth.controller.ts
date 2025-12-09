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
  AdminRequestOtpInputDto,
  AdminVerifyOtpInputDto,
} from 'src/dtos/admin.dto';
import { HttpExceptionFilter } from 'src/response/httpException.filter';
import { ResponseInterceptor } from 'src/response/response.interceptors';
import { Public } from 'src/common/decorators/public.decorator';
import { AdminAuthService } from './auth.service';
import { AdminAuthGuard } from './auth.guard';

@ApiTags('Admin:Auth')
@Controller('admin/auth')
@ApiBearerAuth('Authorization')
@UseGuards(AdminAuthGuard)
@UseFilters(HttpExceptionFilter)
@UseInterceptors(ResponseInterceptor)
export class AdminAuthController {
  constructor(private readonly adminAuthService: AdminAuthService) {}

  @Post('request-otp')
  @Public()
  @ApiOperation({ summary: 'Request otp in panel by phone number' })
  async requestOtp(@Body() body: AdminRequestOtpInputDto) {
    return await this.adminAuthService.requestOtp(body);
  }

  @Post('verify-otp')
  @Public()
  @ApiOperation({ summary: 'Verify otp sent to admin phone number' })
  async verifyOtp(@Body() body: AdminVerifyOtpInputDto) {
    return await this.adminAuthService.verifyOtp(body);
  }

  @Get('/profile')
  @ApiOperation({ summary: 'Get admin profile' })
  async getProfile(@Request() req) {
    return req.admin;
  }
}
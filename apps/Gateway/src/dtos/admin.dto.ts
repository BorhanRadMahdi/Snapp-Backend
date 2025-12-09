import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsPhoneNumber, IsString, Length } from 'class-validator';

export class AdminModel {
  @ApiProperty({ type: String, required: false })
  id?: string;

  @ApiProperty({ type: String, required: true })
  phone: string;

  @ApiProperty({ type: String, required: false })
  email?: string;

  @ApiProperty({ type: String, required: false })
  firstName?: string;

  @ApiProperty({ type: String, required: false })
  lastName?: string;

  @ApiProperty({ type: Boolean, required: false })
  isSuper?: boolean;

  @ApiProperty({ type: Date, required: false })
  createdAt?: Date;

  @ApiProperty({ type: Date, required: false })
  updatedAt?: Date;
}

export class AdminSessionModel {
  @ApiProperty({ type: String, required: false })
  id?: string;

  @ApiProperty({ type: String, required: false })
  adminId?: string;

  @ApiProperty({ type: Date, required: false })
  refreshExpiresAt?: Date;

  @ApiProperty({ type: Date, required: false })
  createdAt?: Date;

  @ApiProperty({ type: Date, required: false })
  updatedAt?: Date;
}

export class AdminRequestOtpInputDto {
  @ApiProperty({
    type: String,
    required: true,
    example: '+989121234567',
    description: 'admin phone number',
  })
  @IsPhoneNumber('IR', { message: 'شماره تلفن معتبر وارد کنید.' })
  phone: string;
}

export class AdminVerifyOtpInputDto {
  @ApiProperty({
    type: String,
    required: true,
    example: '+989121234567',
    description: 'admin phone number',
  })
  @IsPhoneNumber('IR', { message: 'شماره تلفن معتبر وارد کنید.' })
  phone: string;

  @ApiProperty({ example: '1234' })
  @IsString()
  @IsNotEmpty()
  @Length(4, 6)
  otp: string;
}


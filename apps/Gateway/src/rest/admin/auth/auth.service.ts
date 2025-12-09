import { Injectable } from "@nestjs/common";
import { handleSrvCliResponse } from "response/httpException.filter";
import { AdminRequestOtpInputDto, AdminVerifyOtpInputDto } from "src/dtos/admin.dto";
import { MainServiceClient } from "src/services/main.service";

@Injectable()
export class AdminAuthService {
  constructor(private readonly mainSrvCli: MainServiceClient) {}

  async requestOtp(body: AdminRequestOtpInputDto) {
    const data = await this.mainSrvCli.callAction({
      provider: 'ADMINS',
      action: 'requestOtp',
      query: body,
    });
    return handleSrvCliResponse(data);
  }

  async verifyOtp(body: AdminVerifyOtpInputDto) {
    const data = await this.mainSrvCli.callAction({
      provider: 'ADMINS',
      action: 'verifyOtp',
      query: body,
    });
    return handleSrvCliResponse(data);
  }

  async authorize(token: string) {
    const data = await this.mainSrvCli.callAction({
      provider: 'ADMINS',
      action: 'authorize',
      query: { token },
    });
    return handleSrvCliResponse(data);
  }
}
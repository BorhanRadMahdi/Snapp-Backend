import { Injectable } from "@nestjs/common";
import { handleSrvCliResponse } from "response/httpException.filter";
import { DriverSignUpInputDto, DriverVerifyOtpInputDto } from "src/dtos/driver.dto";
import { MainServiceClient } from "src/services/main.service";



@Injectable()
export class DriverAuthService {

    constructor(private readonly mainSrvCli: MainServiceClient) {}


    async requestOtp(body: DriverSignUpInputDto) {
        const data = await this.mainSrvCli.callAction({
            provider: 'DRIVERS',
            action: 'requestOtp',
            query: body,
        }); 
        
        return handleSrvCliResponse(data);
    }
      async verifyOtp(body: DriverVerifyOtpInputDto) {
    const data = await this.mainSrvCli.callAction({
      provider: 'DRIVERS',
      action: 'verifyOtp',
      query: body,
    });

    return handleSrvCliResponse(data);
  }

  async authorize(token: string) {
    const data = await this.mainSrvCli.callAction({
      provider: 'DRIVERS',
      action: 'authorize',
      query: { token },
    });
    return handleSrvCliResponse(data);
  }
} 
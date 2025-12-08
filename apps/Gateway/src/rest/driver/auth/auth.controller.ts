import { Controller, Post } from "@nestjs/common";
import { DriverAuthService } from "./auth.service";
import { ApiOperation} from "@nestjs/swagger";
import { DriverSignUpInputDto } from 'src/dtos/driver.dto';



@Controller('Auth')
export class DriverAuthController {
    constructor(
        private readonly driverAuthService: DriverAuthService,) {}

        @Post('signup')
        @ApiOperation({ summary: 'Signup in app by phone number' })
        async signup(body: DriverSignUpInputDto) {
            const signupData = await this.driverAuthService.signup(body);
            return signupData;
        }
    }

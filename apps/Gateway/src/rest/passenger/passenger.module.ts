import { Module } from "@nestjs/common";
import { PassengerAuthController } from "./auth/auth.controller";
import { PassengerAuthService } from "./auth/auth.service";
import { PassengerAuthGuard } from "./auth/auth.guard";

@Module({
    controllers: [PassengerAuthController],
    providers: [PassengerAuthService, PassengerAuthGuard],
})
export class PassengerModule {}
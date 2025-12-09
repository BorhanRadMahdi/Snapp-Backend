import { Module } from "@nestjs/common";
import { DriverAuthController } from "./auth/auth.controller";
import { DriverAuthService } from "./auth/auth.service";
import { DriverAuthGuard } from "./auth/auth.guard";

@Module({
    controllers: [DriverAuthController],
    providers: [DriverAuthService, DriverAuthGuard],
})
export class DriverModule {}

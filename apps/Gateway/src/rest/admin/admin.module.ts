import { Module } from "@nestjs/common";
import { AdminAuthController } from "./auth/auth.controller";
import { AdminAuthService } from "./auth/auth.service";
import { AdminAuthGuard } from "./auth/auth.guard";

@Module({
    controllers: [AdminAuthController],
    providers: [AdminAuthService, AdminAuthGuard],
})
export class AdminModule {}
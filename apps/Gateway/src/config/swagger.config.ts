import { INestApplication } from "@nestjs/common";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import { ConfigService } from "@nestjs/config";
import { AdminModule } from "src/rest/admin/admin.module";
import { DriverModule } from "src/rest/driver/driver.module";
import { PassengerModule } from "src/rest/passenger/passenger.module";







interface SwaggerModuleItem {
  path: string;
  module?: any;
}


export function setupswagger(app: INestApplication , configService:ConfigService) {
    const apiVersion = configService.get('App.Version');
    const swaggerTitle = configService.get('Swagger.title');
    const swaggerDescription = configService.get('Swagger.description');
    const swaggerVersion = configService.get('Swagger.version');    

    const swaggerOptions = new DocumentBuilder()
      .setTitle(swaggerTitle)
      .setDescription(swaggerDescription)
      .setVersion(swaggerVersion)
      .build();

    const mainDocuments =SwaggerModule.createDocument(app, swaggerOptions);
    SwaggerModule.setup(`${apiVersion}/docs`, app, mainDocuments);

    const modules: SwaggerModuleItem[] = [
        {path: 'admin', module: AdminModule},
        {path: 'driver', module: DriverModule},
        {path: 'passenger', module: PassengerModule},
    ];

    modules.forEach(({path, module}) => {
        const doc = SwaggerModule.createDocument(app, swaggerOptions, {
            include: module ? [module] : [],
        });
        SwaggerModule.setup(`${apiVersion}/docs/${path}`, app, doc);
    });

}
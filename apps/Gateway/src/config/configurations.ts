// export default () => ({
//   port: parseInt(process.env.PORT ?? '3000', 10) || 3000,
// });

import { registerAs } from "@nestjs/config";


const AppConfig = registerAs('App' , () => ({
  version:'V1',
  port: 3000,
}));

const SwaggerConfig = registerAs('Swagger' , () => ({
  title: 'snapp-backend',
  description: 'this is online transporter aplication',
  version: '1.0.0',
}));

export const configurations = [AppConfig , SwaggerConfig];

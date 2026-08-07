import swaggerUi from 'swagger-ui-express';
import fs from 'fs';

const swaggerDocument = JSON.parse(
  fs.readFileSync('./swagger.json', 'utf8')
);

const setupSwagger = (app) => {
  app.use(
    '/api-docs',
    swaggerUi.serve,
    swaggerUi.setup(swaggerDocument, {
      swaggerOptions: {
        persistAuthorization: true,
        defaultModelsExpandDepth: -1
      }
    })
  );
};

export default setupSwagger;
import express, { Express } from 'express';
import { MockController } from '../Controller.mock';

test('Controller Mounting', () => {
  const app: Express = express().use(express.json());

  //This mount the controller on the express app.
  new MockController(app);

  //Get All Routes currently in app.
  const routes: string[] = [];
  app._router.stack.forEach((layer: any) => {
    if (layer.route) {
      routes.push(`${Object.keys(layer.route.methods)[0]?.toUpperCase()} ${layer.route.path}`);
    }
  });

  expect(routes).toContain('GET /test');
  expect(routes).toContain('POST /testPost');
});

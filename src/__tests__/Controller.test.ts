import express, { Express } from 'express';
import request from 'supertest';
import { MockController } from '../Controller.mock';

//Express App to implements controller test on.
const app: Express = express().use(express.json());

describe('Controller Builder tests', () => {
  test('Controller Mounting', () => {
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

  test('Get request to mounted controller endpoint', async () => {
    const response = await request(app).get('/test');
    expect(response.status).toBe(200);
    expect(response.body).toEqual('It Worked.');
  });

  test('Post request to mounted controller endpoint', async () => {
    const response = await request(app).post('/testPost').send({
      payload: 'This is a Post Test!',
    });
    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      payload: 'This is a Passed Test!',
    });
  });

  test('Post incorrect request to mounted controller endpoint', async () => {
    const response = await request(app).post('/testPost').send({
      something: 'Fail please!',
    });
    expect(response.status).toBe(400);
    expect(response.body).toEqual({
      error: 'Payload object not received',
    });
  });

  test('Post request to mounted controller with Middleware', async () => {
    const response = await request(app)
      .post('/testMiddleware')
      .send({
        payload: ['Secrets of the universe here'],
      });
    expect(response.status).toBe(200);
    expect(response.body.payload).toEqual(
      expect.arrayContaining(['Secrets of the universe here', 'The middleware was here... ;)', 'We been compromised!']),
    );
  });
});

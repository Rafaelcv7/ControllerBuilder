import { Get, HttpRoute, Middleware, Post } from './decorators';
import { BaseController } from './index';
import { Request, Response, NextFunction } from 'express';

@HttpRoute('MockController')
export class MockController extends BaseController {
  @Get('/test')
	async test(req: Request, res: Response, next: NextFunction) {
		res.json('It Worked.');
	}

  @Post('/testPost')
  async testPost(req: Request, res: Response, next: NextFunction) {
  	try {
  		let payload = req.body.payload;
  		if (!payload) throw new Error('Payload object not received');
  		payload = payload.replace('Post', 'Passed');
  		res.json({ payload });
  	} catch (e: any) {
  		res.status(400).json({ error: e.message });
  	}
  }

  @Post('/testMiddleware')
  @Middleware((req: Request, res: Response, next: NextFunction) => {
  	const array = req.body.payload;
  	array.push('The middleware was here... ;)');
  	req.body.payload = array;
  	next();
  })
  async testMiddleware(req: Request, res: Response, next: NextFunction) {
  	try {
  		let array = req.body.payload;
  		if (array.includes('The middleware was here... ;)')) {
  			array.push('We been compromised!');
  			return res.json({ payload: array });
  		}
  		throw new Error('Payload object not received');
  	} catch (e: any) {
  		res.status(400).json({ error: e.message });
  	}
  }
}

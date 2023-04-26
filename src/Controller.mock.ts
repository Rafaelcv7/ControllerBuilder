import { Get, HttpRoute, Post } from './decorators';
import { BaseController } from './index';
import { Request, Response, NextFunction } from 'express';

@HttpRoute('MockController')
export class MockController extends BaseController {
  @Get('/test')
  async test(req: Request, res: Response, next: NextFunction) {
    try {
      res.json('It Worked.');
    } catch (e: any) {
      next(e);
    }
  }

  @Post('/testPost')
  async testPost(req: Request, res: Response, next: NextFunction) {
    try {
      res.json(req.body.body);
    } catch (e: any) {
      next(e);
    }
  }
}

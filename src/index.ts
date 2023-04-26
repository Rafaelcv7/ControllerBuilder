import { Express } from 'express';

export class BaseController {
  private _app: Express;
  constructor(app: Express) {
    this._app = app;
  }
}

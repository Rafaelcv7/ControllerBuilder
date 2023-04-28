import { Express } from 'express';

export abstract class BaseController {
	private _app: Express;
	constructor(app: Express) {
		this._app = app;
	}
}

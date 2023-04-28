import 'reflect-metadata';
import { Express } from 'express';

/**
 Functions in this file are decorators do not use them as regular functions.
 **/
export function HttpRoute(name: string) {
	return function <T extends { new (...args: any[]): {} }>(constructor: T) {
		return class extends constructor {
			constructor(...args: [...any[]]) {
				super(...args);

				const app = args[0] as Express;

				for (const key of Object.getOwnPropertyNames(constructor.prototype)) {
					if (key === 'constructor') continue;
					//@ts-ignore
					const method = this[key];
					const endpoint = Reflect.getMetadata('endpoint', method);
					const requestMethod: string = Reflect.getMetadata('method', method);
					const middleware = Reflect.getMetadata('middleware', method);

					let handler;
					if (middleware) {
						handler = [middleware, method.bind(this)];
					} else {
						handler = [method.bind(this)];
					}

					//@ts-ignore No fue mi intención forzarlo / It wasn't my intention to force it... :( - RCV
					app.route(`${endpoint}`)[requestMethod.toLowerCase()](handler);
				}
				console.log(`${name} mounted on App Successfully`);
			}
		};
	};
}

export function Get(endpoint: string) {
	return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
		Reflect.defineMetadata('method', Get.name, descriptor.value);
		Reflect.defineMetadata('endpoint', endpoint, descriptor.value);
		return descriptor;
	};
}

export function Post(endpoint: string) {
	return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
		Reflect.defineMetadata('method', Post.name, descriptor.value);
		Reflect.defineMetadata('endpoint', endpoint, descriptor.value);
		return descriptor;
	};
}

export function Middleware(middleware: Function) {
	return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
		const middlewares: Function[] = Reflect.getMetadata('middleware', descriptor.value) || [];
		Reflect.defineMetadata('middleware', [...middlewares, middleware], descriptor.value);
		return descriptor;
	};
}

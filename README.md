# Controller Builder

This package contains decorators that can be used in an Express application. These decorators allow you to easily define and mount HTTP routes for your Express server.

## Installation

To use this module, you must first install it using npm:

```
# using npm
npm install @dlvlup/controllerbuilder

# using yarn
yarn add @dlvlup/controllerbuilder

# using pnpm
pnpm add @dlvlup/controllerbuilder
```

## Dependencies

- This module requires the `express` package to be installed and imported in your code.
- This module requires the `reflect-metadata` package to be installed and imported in your code.

## Usage

This module exports three decorators that can be used to define HTTP routes in your Express application: `@HttpRoute`, `@Get`, and `@Post`.
This decorators can be used on a class that extends `BaseController` class which is exported also from the package.
That way we can define a controller like so:

### HttpRoute

The `@HttpRoute` decorator is a class decorator that allows you to define HTTP routes for your Express server. This decorator takes a string argument that specifies the name of the route.

Only one of this should be declared on top of the class that will extend `BaseController`

```typescript
import {BaseController} from "@dlvlup/controllerbuilder";
import {HttpRoute} from "@dlvlup/controllerbuilder/lib/decorators";

@HttpRoute('example-name')
class ExampleController extends BaseController {
    // ...
}
```

### Get

The `@Get` decorator is a method decorator that allows you to define a GET route for your Express server. This decorator takes a string argument that specifies the endpoint of the route.

```typescript
import {BaseController} from "@dlvlup/controllerbuilder";
import {Get, HttpRoute} from "@dlvlup/controllerbuilder/lib/decorators";
import {Request, Response, NextFunction} from 'express';

@HttpRoute('example-name')
class ExampleController extends BaseController {

    @Get('/exampleGetRoute')
    async exampleGetFunction(req: Request, res: Response, next: NextFunction) {
        // ...
    }
}
```

### Post

The `@Post` decorator is a method decorator that allows you to define a POST route for your Express server. This decorator takes a string argument that specifies the endpoint of the route.

```typescript
import {BaseController} from "@dlvlup/controllerbuilder";
import {HttpRoute, Post} from "@dlvlup/controllerbuilder/lib/decorators";
import {Request, Response, NextFunction} from 'express';

@HttpRoute('example-name')
class ExampleController extends BaseController {

    @Post('/examplePostRoute')
    async examplePostFunction(req: Request, res: Response, next: NextFunction) {
        // ...
    }
}
```

### Middleware

The `@Middleware` decorator is a method decorator that allows you to specify middleware for a route. This decorator takes a function argument that executes before the route specific function.

```typescript
import {BaseController} from "@dlvlup/controllerbuilder";
import {HttpRoute, Post, Middleware} from "@dlvlup/controllerbuilder/lib/decorators";
import {Request, Response, NextFunction} from 'express';

@HttpRoute('example-name')
class ExampleController extends BaseController {

    @Post('/exampleRouteWithMiddleware')
    @Middleware((req: Request, res: Response, next: NextFunction) => {
        // ...code to execute
        next();
    })
    public examplePostFunctionWithMiddleware(req: Request, res: Response) {
        // ...
    }
}
```

### Mounting controllers

To be able to see these routes on your `express` app we call the constructor of each controller class passing our express app to each.
This is what we call "Mounting the controllers".

In your `App.ts` do something like:

```typescript
// import your controllers as an default array of modules preferably
import Controllers from './controllers';
import express, {Express} from "express";

const app: Express = express()
    .use(express.json())
    .use(cors());

Controllers.forEach(controller => new controller(app));
```

Now all the routes will be "mounted" on your express app and accessible when your app start listening.

## Notes
- These decorators are not meant to be used as regular functions.

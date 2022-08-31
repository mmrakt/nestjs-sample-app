import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { CatsModule } from './cats/cats.module';
import { LoggerMiddleware } from './logger.middleware';

@Module({
  imports: [CatsModule],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggerMiddleware)
      .exclude(
        {
          path: 'cats',
          method: RequestMethod.GET,
        },
        {
          path: 'cats',
          method: RequestMethod.GET,
        },
        'cats/(.*)',
      )
      .forRoutes('cats');
  }
}

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { VERSION_NEUTRAL, VersioningType } from '@nestjs/common';
import { TransformInterceptor } from './common/interceptors/transform.interceptor';
import { AllExceptionsFilter } from './common/exceptions/base.exception.filter';
import { HttpExceptionFilter } from './common/exceptions/http.exception.filter';
import { generateDocument } from './doc';

declare const module: any;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // 接口版本化管理
  app.enableVersioning({
    defaultVersion: [VERSION_NEUTRAL, '1', '2'],
    type: VersioningType.URI,
  });

  // 统一响应体格式
  app.useGlobalInterceptors(new TransformInterceptor());

  // 异常过滤器
  // TODO:注意引入自定义异常的先后顺序，不然异常捕获逻辑会出现混乱。
  app.useGlobalFilters(new AllExceptionsFilter(), new HttpExceptionFilter());

  // 创建文档
  generateDocument(app);

  if (module.hot) {
    module.hot.accept();
    module.hot.dispose(() => app.close());
  }

  await app.listen(3000);
}
bootstrap();

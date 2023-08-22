import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { getConfig } from '../utils';

/**
 * @nestjs/config 默认会从项目根目录载入并解析一个 .env 文件，从 .env 文件和 process.env 合并环境变量键值对，
 * 并将结果存储到一个可以通过 ConfigService 访问的私有结构。
 * 但我们接下来使用结构更加清晰的 YAML 来覆盖默认配置。
 * */

@Module({
  imports: [
    ConfigModule.forRoot({
      ignoreEnvFile: true,
      isGlobal: true,
      load: [getConfig],
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

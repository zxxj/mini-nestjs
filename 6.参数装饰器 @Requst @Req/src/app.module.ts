// 从@nestjs/common模块中导入Module装饰器
import { Module } from '@nestjs/common'

// 从当前目录导入AppController控制器
import { AppController } from './app.controller'
import { UserController } from './user.controller'

// 使用@Module装饰器定义一个模块
@Module({
  // 在controllers属性中指定当前模块包含的控制器
  controllers: [AppController, UserController]
})

// 定义并导出AppModule模块
export class AppModule {}

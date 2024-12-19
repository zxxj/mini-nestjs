// 从@nestjs/core模块中导入NestFactory,用于创建Nest应用实例
import { NestFactory } from '@nestjs/core'
// 导入应用的根模块AppModule
import { AppModule } from './app.module'

// 定义一个bootstrap异步函数,用于启动应用
const bootstrap = async () => {
  // 通过NestFactory类的静态方法create创建app实例,并传入AppModule
  const app = await NestFactory.create(AppModule)

  // 让应用监听3000端口
  await app.listen(4000)
}

// 调用bootstrap函数,启动应用
bootstrap()

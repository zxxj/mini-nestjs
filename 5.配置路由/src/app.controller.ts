// 导入Controller和Get装饰器
import { Get, Controller } from '@nestjs/common'

// 使用@Controller装饰器标记类为控制器
@Controller()
export class AppController {
  // 使用@Get装饰器标记方法为处理GET请求的路由
  @Get('hello')
  hello(): string {
    return 'hello'
  }

  @Get('info')
  getInfo(): string {
    return 'info'
  }
}

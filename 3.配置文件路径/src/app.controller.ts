import { Controller } from './@nestjs/common'
import { Get } from './@nestjs/common'

@Controller()
export class AppController {
  @Get('hello')
  hello(): string {
    return 'hello'
  }
}

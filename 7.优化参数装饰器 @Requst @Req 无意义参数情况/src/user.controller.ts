import { Controller, Get, Request, Req } from '@nestjs/common'
import type { Request as ExpressRequest } from 'express'

@Controller('users')
export class UserController {
  @Get('/info')
  userInfo(
    @Req() req: ExpressRequest,
    userName: string,
    age: number,
    @Request() request: ExpressRequest
  ) {
    console.log('req.path:', req.path) // 获取请求路径
    console.log('req.method:', req.method) // 获取请求方式
    console.log('req.url:', req.url) // 获取请求url

    console.log('request.path:', request.path) // 获取请求路径
    console.log('request.method:', request.method) // 获取请求方式
    console.log('request.url:', request.url) // 获取请求url

    console.log('userName:', userName) // undefined
    console.log('age:', age) // undefined
    return 'getInfo'
  }
}

import { Controller, Get, Request, Req } from '@nestjs/common'
import type { Request as ExpressRequest } from 'express'

@Controller('users')
export class UserController {
  @Get('/info')
  userInfo(@Request() request: ExpressRequest, @Req() req: ExpressRequest) {
    // console.log(request)
    // console.log(req)
    return 'getInfo'
  }
}

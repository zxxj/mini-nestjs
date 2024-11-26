// 导入元数据包
import 'reflect-metadata'
import express from 'express'
import type { Express } from 'express'
import { Logger } from './logger'

export class NestApplication {
  // 在内部私有化一个express实例
  private readonly app: Express = express()

  // protected readonly module等同于 this.module = module
  constructor(protected readonly module) {}

  // 初始化配置
  async init() {}

  // 启动HTTP服务器
  async listen(port: number) {
    this.init()

    // 调用express实例的listen方法,启动一个HTTP服务器,监听port端口
    this.app.listen(port, () => {
      Logger.log(`Application is running on http://localhost:${port}`, 'NestApplication')
    })
  }
}

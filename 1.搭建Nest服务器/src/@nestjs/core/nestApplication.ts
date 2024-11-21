// 导入元数据包
import "reflect-metadata"
import express from "express"
import type { Express } from "express"
import { Logger } from "./logger"

export class NestApplication {
	// 在内部私有化一个express实例
	private readonly app: Express = express()

	// protected readonly module等同于 this.module = module
	constructor(protected readonly module) { }

	// 初始化配置
	async init() {
		// 获取模块中所有的控制器,然后做好路由映射
		const controllers = Reflect.getMetadata('controllers', this.module)
		
		// 打印执行日志
		Logger.log(`${ this.module.name } dependencies initialized`, 'InstanceLoader')

		// 路由映射的核心是要知道,什么样的请求方法,什么样的请求路径,请求是对应的那个处理函数
		for(const Controller of controllers) {
			// 创建每个控制器的实例
			const controllerInstance = new Controller()

			// 获取每个控制器的路径前缀
			const prefix = Reflect.getMetadata('prefix', Controller) || '/'

			// 打印执行日志: 路由解析
			Logger.log(`${ Controller.name } {${ prefix }}`, 'RoutesResolver')
		}
	}

	// 启动HTTP服务器
	async listen(port: number) {

		this.init()

		// 调用express实例的listen方法,启动一个HTTP服务器,监听port端口
		this.app.listen(port, () => {
			Logger.log(`Application is running on http://localhost:${port}`, 'NestApplication')
		})
	}
}
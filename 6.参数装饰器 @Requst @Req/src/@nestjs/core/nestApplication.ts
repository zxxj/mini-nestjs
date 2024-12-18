// 导入元数据包
import 'reflect-metadata'
import express from 'express'
import type {
  Express,
  Request as ExpressRequest,
  Response as ExpressResponse,
  NextFunction as ExpressNextFunction
} from 'express'
import { Logger } from './logger'
import path from 'path'

interface paramMetaDataType {
  key: string
  parameterIndex: number
}

export class NestApplication {
  // 在内部私有化一个express实例
  private readonly app: Express = express()

  // protected readonly module等同于 this.module = module
  constructor(protected readonly module) {}

  // 初始化配置
  async init() {
    // 获取模块中所有的控制器类,准备做路由映射
    const controllers = Reflect.getMetadata('controllers', this.module)
    console.log('controllers:', controllers)

    // 打印执行日志
    Logger.log(`${this.module.name} dependencies initialized`, 'InstanceLoader')

    // 路由映射的核心是要知道,什么样的请求方法,什么样的请求路径,请求是对应的那个处理函数
    for (const Controller of controllers) {
      // 创建每个控制器的实例
      const controllerInstance = new Controller()
      console.log('controllerInstance:', controllerInstance)

      // 获取每个控制器的路径前缀
      const prefix = Reflect.getMetadata('prefix', Controller) || '/'

      // 打印执行日志: 提示开始路由解析
      Logger.log(`${Controller.name} {${prefix}}`, 'RoutesResolver')

      // 获取每个控制器类的原型
      const controllerPrototype = Controller.prototype
      console.log('controllerPrototype:', controllerPrototype)

      // 遍历控制器类原型上的方法名
      for (const methodName of Object.getOwnPropertyNames(controllerPrototype)) {
        // 根据方法名获取该控制器类原型上的方法
        const method = controllerPrototype[methodName]

        // 获取该方法上的元数据
        const httpMethod = Reflect.getMetadata('method', method)
        const pathMetadata = Reflect.getMetadata('path', method)

        // 如果方法名不存在(没有写GET/POST...请求装饰器的),则不处理
        if (!httpMethod) continue

        // 拼出完整的路由路径
        const routePath = path.posix.join('/', prefix, pathMetadata)

        // 配置路由,当客户端以httpMethod方法请求routePath路径的时候,会由对应的函数进行处理
        this.app[httpMethod.toLowerCase()](
          routePath,
          (req: ExpressRequest, res: ExpressResponse, next: ExpressNextFunction) => {
            console.log('controllerInstance:', controllerInstance)
            console.log('methodName', methodName)

            const args = this.resolveParms(controllerInstance, methodName, req, res, next)
            console.log('args:', args)

            const result = method.call(controllerInstance, ...args)
            res.send(result)
          }
        )
        Logger.log(`Mapped {${routePath}, ${httpMethod}} route`, 'RoutesResolver')
      }
    }
  }

  /**
   * 该方法解析控制器方法的参数,将请求中的数据与控制器方法参数对应起来。它通过元数据获取参数的顺序，并根据装饰器的顺序为参数提供正确的值。
   * @param controllerInstance 控制器实例
   * @param methodName 方法名
   * @param req
   * @param res
   * @param next
   */
  private resolveParms(
    controllerInstance: any,
    methodName: string,
    req: ExpressRequest,
    res: ExpressResponse,
    next: ExpressNextFunction
  ) {
    /**
     * 1.获取参数的元数据
     * 2.根据parameterIndex对数组排序:
     * 例如Controller中参数装饰器的顺序为: userInfo(@Req() req: ExpressRequest, @Request() request: ExpressRequest)
     * 因为在解析装饰器时会先走索引为1的装饰器,所以paramMetaData得到的结果是为[{ parameterIndex: 0, key: 'Request' },{ parameterIndex: 1, key: 'Req' }]
     * 所以需要对元数据进行排序从而对参数装饰器的索引顺序一一对应
     */
    const paramsMetaData: paramMetaDataType[] = Reflect.getMetadata(
      'params',
      controllerInstance,
      methodName
    )

    const sortafterParamsArr = paramsMetaData.sort((a, b) => a.parameterIndex - b.parameterIndex)
    console.log('requestArr:', sortafterParamsArr)

    const paramsArr = sortafterParamsArr.map((paramMetadata) => {
      const { key } = paramMetadata

      switch (key) {
        case 'Request':
        case 'Req':
          return req
        default:
          return null
      }
    })

    return paramsArr
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

// 引入元数据
import 'reflect-metadata'

// 创建参数装饰器
export const createParamDecorator = (key: string) => {
  /**
   * target: 控制器的原型
   * propertyKey: 方法名
   * parameterIndex:  userInfo(@Request() request: ExpressRequest, @Req() req: ExpressRequest)
   * @Request() request: ExpressRequest: 索引为0
   * @Req() req: ExpressRequest: 索引为1
   * 执行顺序是先走1再走0
   * @return 返回一个装饰器函数
   */

  return () => (target: any, propertyKey: string, parameterIndex: number) => {
    // 给控制器类的原型,也就是getInfo方法属性上添加元数据
    const existingParameters = Reflect.getMetadata(`params`, target, propertyKey) || []
    // existingParameters.push(propertyKey, key)

    // 考虑如果接口传递了@Requst @Req之外的无意义参数时,装饰器索引会错乱,所以在此处优化为根据装饰器索引添加到existingParameters数组中,同时也减少了在resolveParms函数中的排序操作
    existingParameters[parameterIndex] = { propertyKey, key }
    Reflect.defineMetadata(`params`, existingParameters, target, propertyKey)
  }
}

export const Request = createParamDecorator('Request')
export const Req = createParamDecorator('Req')

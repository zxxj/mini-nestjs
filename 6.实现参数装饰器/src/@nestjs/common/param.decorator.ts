// 引入元数据
import 'reflect-metadata'

export const createParamDecorator = (key: string) => {
  /**
   * target: 控制器的原型
   * propertyKey: 方法名
   * parameterIndex:  userInfo(@Request() request: ExpressRequest, @Req() req: ExpressRequest)
   * @Request() request: ExpressRequest: 索引为0
   * @Req() req: ExpressRequest: 索引为1
   * 执行顺序是先走1再走0
   */
  return () => (target: any, propertyKey: string, parameterIndex: number) => {
    // 给控制器类的原型,也就是getInfo方法属性上添加元数据
    const existingParameters = Reflect.getMetadata(`params`, target, propertyKey) || []
    existingParameters.push({ parameterIndex, key })
    console.log('existingParameters', existingParameters)
    Reflect.defineMetadata(`params`, existingParameters, target, propertyKey)
  }
}

export const Request = createParamDecorator('Request')
export const Req = createParamDecorator('Req')

// 类装饰器(模块装饰器)

// 导入元数据包
import 'reflect-metadata'

interface ModuleMetadata {
  controllers: Function[]
}

/**
 * @param metadata 类的数组
 * @returns 类装饰器(模块装饰器)
 */
export const Module = (metadata: ModuleMetadata): ClassDecorator => {
  // 给模块类添加元数据, target是AppModule或其他模块类, 元数据的名字叫controllers, 值是controllers数组: controllers: [AppController]
  return (target: Function) => {
    console.log(target)
    Reflect.defineMetadata('controllers', metadata.controllers, target)
  }
}

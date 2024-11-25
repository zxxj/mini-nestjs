// 参数装饰器, GET, POST, BODY, DELETE, PATCH, PUT

// 导入元数据包
import "reflect-metadata"

/**
 * @param target 类的原型: AppController.prototype
 * @param propertyKey 方法名: hello
 * @param desciprtor 属性描述器: 表示hello方法的属性描述器
 */
export const Get = (path: string = '') :MethodDecorator => {
	return (target: any, propertyKey: string, desciprtor: PropertyDescriptor) => {
		// 为desciprtor.value,也就是hello函数添加元数据path
		Reflect.defineMetadata('path', path, desciprtor.value)

		// 为desciprtor.value,也就是hello函数添加元数据method
		Reflect.defineMetadata('method', 'GET', desciprtor.value)
	}
}
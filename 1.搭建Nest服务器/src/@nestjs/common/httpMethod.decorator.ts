// 参数装饰器, GET, POST, BODY, DELETE, PATCH, PUT

// 导入元数据包
import "reflect-metadata"

/**
 * 
 * @param target 类的原型
 * @param propertyKey 方法名
 * @param desciprtor 属性描述器
 */
export const Get = () :MethodDecorator => {
	return (target: any, propertyKey: string, desciprtor: PropertyDescriptor) => {
		// todo
	}
}
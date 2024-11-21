// 类装饰器(模块装饰器)

// 导入元数据包
import "reflect-metadata"

interface ModuleMetadata {
	controllers: Function[]
}

/**
 * @param metadata 类的数组
 * @returns 类装饰器(模块装饰器)
 */
export const Module = (metadata: ModuleMetadata) :ClassDecorator => {
	return (target: Function) => {
		// todo
	}
}	 
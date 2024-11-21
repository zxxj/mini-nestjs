// 控制器装饰器

// 导入元数据包
import "reflect-metadata"

interface ControllerOptions {
	prefix?: string
}

// 控制器参数重载
export function Controller():ClassDecorator // 传入空字符串
export function Controller(prefix: string):ClassDecorator // 传入字符串
export function Controller(options: ControllerOptions):ClassDecorator // 传入对象

export function Controller (prefixOrOptions?: string | ControllerOptions) :ClassDecorator {
	let options: ControllerOptions = {}

	if(typeof prefixOrOptions === 'string') options.prefix = prefixOrOptions
	if(typeof prefixOrOptions === 'object') options = prefixOrOptions


	return (target: Function) => {
		console.log(target)
		// 给控制器类添加prefix这个代表路径前缀的属性的元数据
		Reflect.defineMetadata('prefix', options.prefix || '', target)
		// todo
	}
}
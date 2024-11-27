import clc from 'cli-color' // 终端颜色包

export class Logger {
  // 定义用来打印日志的工具方法
  static log(message: string, context = '') {
    // 获取当前的时间戳
    const timestamp = new Date().toLocaleString()

    // 获取当前进程的pid
    const pid = process.pid

    // 打印日志
    console.log(
      `[${clc.yellow('Nest')}] ${clc.green(pid)}  - ${clc.blue(timestamp)}  ${clc.yellow('LOG')} [${clc.cyan(context)}] ${clc.white(message)}`
    )
  }
}

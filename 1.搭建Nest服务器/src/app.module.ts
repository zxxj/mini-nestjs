import { Module } from "./@nestjs/common/module.decorator"
import { AppController } from "./app.controller"

@Module({
	controllers: [AppController]
})
export class AppModule {}
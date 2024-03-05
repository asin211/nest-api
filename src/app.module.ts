import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';

import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [UsersModule, ConfigModule.forRoot({envFilePath: '.env', isGlobal: true}), MongooseModule.forRoot(process.env.DATABASE_URL) ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';

import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { APP_GUARD } from '@nestjs/core';

@Module({
  imports: [
    UsersModule, 
    ConfigModule.forRoot({envFilePath: '.env', isGlobal: true}), 
    MongooseModule.forRoot(process.env.DATABASE_URL),
    ThrottlerModule.forRoot([
      {
        name: "short",
        ttl:1000,
        limit: 1 // 1 request in 1 sec for each user
      },
      {
        name: "long",
        ttl: 60000, // 1 minutes
        limit: 30 // 50 request in 1 minute for each user
      }
    ])
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    }
  ],
})
export class AppModule {}
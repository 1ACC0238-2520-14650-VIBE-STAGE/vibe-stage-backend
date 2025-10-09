import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './database/database.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { ShowsModule } from './shows/shows.module';
import { EventsModule } from './events/events.module';
import { ApplicationsModule } from './applications/applications.module';
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    DatabaseModule,
    UsersModule,
    AuthModule,
    ShowsModule,
    EventsModule,
    ApplicationsModule,
  ],
})
export class AppModule {}

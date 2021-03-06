import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ServeStaticModule } from '@nestjs/serve-static';
import { JwtModule } from '@nestjs/jwt';
import { secret } from './utils/constants';
import { join } from 'path/posix';
import { MulterModule } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { v4 as uuidv4 } from 'uuid';

import { ClothingsController } from './controller/clothing.controller';
import { ClothingService } from './service/clothing.service';
import { UserService } from './service/user.service';
import { UserController } from './controller/user.controller';
import { Clothing, ClothingSchema } from './model/clothing.schema';
import { User, UserSchema } from './model/user.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    MongooseModule.forFeature([
      { name: Clothing.name, schema: ClothingSchema },
    ]),
    MongooseModule.forRoot('mongodb://localhost:27017/Stream'),
    JwtModule.register({
      secret,
      signOptions: { expiresIn: '2h' },
    }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'public'),
    }),
    MulterModule.register({
      storage: diskStorage({
        destination: './public',
        filename: (req, file, cb) => {
          const ext = file.mimetype.split('/')[1];
          cb(null, `${uuidv4()}-${Date.now()}.${ext}`);
        },
      }),
    }),
  ],
  controllers: [AppController, ClothingsController, UserController],
  providers: [AppService, ClothingService, UserService],
})
export class AppModule {}

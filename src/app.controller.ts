import { Controller, Get, Post, UseInterceptors, UploadedFile, UploadedFiles, Param, Res } from '@nestjs/common';
import { AppService } from './app.service';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express/multer';
import { diskStorage } from 'multer';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Post('avatar')
  @UseInterceptors(FileInterceptor('file', {
      storage: diskStorage({
        destination: './upload'
        , filename: (req, file, cb) => {
          // Generating a 32 random chars long string
          const randomName = Array(32).fill(null).map(() => (Math.round(Math.random() * 16)).toString(16)).join('')
          //Calling the callback passing the random name generated with the original extension name
          cb(null, `${file.originalname}`)
        }
      })
    }))
    async upload( @UploadedFile() file) {
      console.log(file)
    }

    @Get('avatar/:imgpath')
    seeUploadedFile(@Param('imgpath') image,
    @Res() res ){
      return res.sendFile(image, {root: 'upload'});
    }
}

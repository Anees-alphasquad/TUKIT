import { Controller, Post, UploadedFile, UseInterceptors,Request, Req } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { BucketService } from './bucket.service';

@Controller('bucket')
export class BucketController {
  constructor(private readonly bucketService: BucketService) {}

  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
   uploadFile(@UploadedFile() file: Express.Multer.File) {
    return this.bucketService.uploadFile(file);

  }
}

// @Post('upload')
// @UseInterceptors(FileInterceptor('file'))
// async uploadFile( @UploadedFile() file: Express.Multer.File,@Request() req,
// ): Promise<any> {
//   const result = await this.bucketservice.uploadPublicFile(
//     file.buffer,
//     file.originalname,
//   );
//   return new ResponseModel(result); 
// }


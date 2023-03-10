import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { S3 } from 'aws-sdk';

@Injectable()
export class BucketService {
  constructor(private configService: ConfigService,) {}

  bucketName = this.configService.get('AWS_BUCKET_NAME');
  s3 = new S3({
    accessKeyId: this.configService.get('ACCESS_KEY_ID'),
    secretAccessKey: this.configService.get('SECRET_ACCESS_KEY'),
  });

  async uploadFile(file:any) {
   const name= file.originalname;
    try {
      const uploadResult = await this.s3
        .upload({
          Bucket: this.bucketName,
          Body: file.buffer,
          ContentDisposition:"inline",
          ContentType:file.mimetype,
          Key: String(name),
         })
        .promise ();
        console.log(uploadResult)
return uploadResult;


    } catch (error) {
      console.log(error);
    }
  }
}

  


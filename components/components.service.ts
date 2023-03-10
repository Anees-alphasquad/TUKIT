import { Injectable } from '@nestjs/common';
import { CreateComponentDto } from './dto/create-component.dto';
import { UpdateComponentDto } from './dto/update-component.dto';
import { PrismaService } from 'src/prisma/migrations/prisma.service';
import { BucketService } from 'src/bucket/bucket.service';
import { HttpException,HttpStatus } from '@nestjs/common';

@Injectable()
export class ComponentsService {
  constructor(private prisma:PrismaService, private bucketService:BucketService){}
  
async create(createComponentDto: CreateComponentDto,componentsPicture:any) {
    try {
    const uploadFile= await this.bucketService.uploadFile(componentsPicture)
    return this.prisma.components.create({
      data: {
        name: createComponentDto.name,
        description: createComponentDto.description,
        subCategoryId: createComponentDto.subCategoryId,
        componentsPicture: uploadFile.Location
        
      },
    });
  }catch(error){
    throw new HttpException('Add component image!', HttpStatus.NOT_ACCEPTABLE);
  }
  } 

  findAll() {
    return this.prisma.components.findMany();
  }

  findOne(id: number) {
    return this.prisma.components.findUnique({
      where: {
        id: id,
      },
      include:{
        // integrations:true,
        
      }
    });
  }

  update(id: number, updateComponentDto: UpdateComponentDto) {
    return this.prisma.components.update({
      where: {
        id: id,
      },
      data: {
        name: updateComponentDto.name,
        description:updateComponentDto.description
      },
    }); 
  }

  remove(id: number) {
    return this.prisma.components.delete({
      where: {
        id: id,
      },
    }); 
  }
}

import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Post,
  UseInterceptors,
  UploadedFiles,
  Put,
  Req,
  Res,
  Query,
} from '@nestjs/common';
import { Clothing } from '../model/clothing.schema';
import { ClothingService } from '../service/clothing.service';
import {
  FileFieldsInterceptor,
  FilesInterceptor,
} from '@nestjs/platform-express';

@Controller('/api/v1/clothing')
export class ClothingsController {
  constructor(private readonly clothingService: ClothingService) {}

  @Post()
  @UseInterceptors(
    FileFieldsInterceptor([
      { name: 'clothing', maxCount: 1 },
      { name: 'cover', maxCount: 1 },
    ]),
  )
  async createBook(
    @Res() response,
    @Req() request,
    @Body() clothing: Clothing,
    @UploadedFiles()
    files: { clothing?: Express.Multer.File[]; cover?: Express.Multer.File[] },
  ) {
    const requestBody = {
      createdBy: request.user,
      title: clothing.title,
      clothing: files.clothing[0].filename,
      coverImage: files.cover[0].filename,
    };
    const newclothing = await this.clothingService.createClothingElement(
      requestBody,
    );
    return response.status(HttpStatus.CREATED).json({
      newclothing,
    });
  }
  @Get()
  async read(@Query() id): Promise<Object> {
    return await this.clothingService.readClothingElements(id);
  }
  @Put('/:id')
  async update(@Res() response, @Param('id') id, @Body() clothing: Clothing) {
    const updatedclothing = await this.clothingService.update(id, clothing);
    return response.status(HttpStatus.OK).json(updatedclothing);
  }
  @Delete('/:id')
  async delete(@Res() response, @Param('id') id) {
    await this.clothingService.delete(id);
    return response.status(HttpStatus.OK).json({
      user: null,
    });
  }
}

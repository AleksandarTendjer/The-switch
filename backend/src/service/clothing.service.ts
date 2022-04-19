import {
  Injectable,
  NotFoundException,
  ServiceUnavailableException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Clothing, ClothingDocument } from '../model/clothing.schema';
import { createReadStream, statSync } from 'fs';
import { join } from 'path';
import { Request, Response } from 'express';

@Injectable()
export class ClothingService {
  constructor(
    @InjectModel(Clothing.name)
    private ClothingModel: Model<ClothingDocument>,
  ) {}
  async createClothingElement(video: Object): Promise<Clothing> {
    const newClothingElement = new this.ClothingModel(video);
    return newClothingElement.save();
  }
  async readClothingElements(id): Promise<any> {
    return await this.ClothingModel.findById(id);
  }
  async readClothingElementsByTypeArray(typeArray): Promise<any> {
    return await this.ClothingModel.findOne({
      type: typeArray,
    });
  }

  async update(id, Clothing: Clothing): Promise<Clothing> {
    return await this.ClothingModel.findByIdAndUpdate(id, Clothing, {
      new: true,
    });
  }
  async delete(id): Promise<any> {
    return await this.ClothingModel.findByIdAndRemove(id);
  }
}

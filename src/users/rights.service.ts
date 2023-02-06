import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Rights } from './models/rights.entity';
import { CreateRightsDto } from './dto/create-rights.dto';
import { RightsList, RightsTag } from './config/rights.list';
import { User } from './models/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class RightsService {
  constructor(
    @InjectRepository(Rights)
    private rightsRepository: Repository<Rights>
  ) {}

  async getRights(): Promise<Rights[]> {
    return await this.rightsRepository.find();
  }

  async createRights(createRightsDto: CreateRightsDto): Promise<Rights> {
    const { description, relatedTo, name, tag } = createRightsDto;
    const rights = new Rights();

    rights.name = name;
    rights.tag = tag;
    rights.description = description;
    rights.relatedTo = relatedTo;

    try {
      await rights.save();
    } catch (e) {
      throw new InternalServerErrorException(e);
    }
    return rights;
  }

  async countRights(): Promise<number> {
    return await this.rightsRepository.count();
  }

  async fillRights(): Promise<void> {
    const allRights = RightsList;
    const admin = await User.findOne({ where: { id: 1 } });
    if (!admin.rights) admin.rights = [];

    allRights.forEach((right) => {
      this.createRights(right)
        .then((rights) => {
          admin.rights.push(rights);
        })
        .then(() => {
          if (admin.rights.length === allRights.length) {
            admin.save();
          }
        });
    });
  }

  async getRightsById(rightsToAdd: number): Promise<Rights> {
    const rights = await this.rightsRepository.findOne({
      where: { id: rightsToAdd },
    });

    if (!rights) {
      throw new NotFoundException(`Rights with ${rightsToAdd} was not found!`);
    }

    return rights;
  }


}

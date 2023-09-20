import { Injectable, NotFoundException } from '@nestjs/common';
import { CityDto } from './city.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { City } from './city.entity';
import { Repository } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class CityService {
  constructor(
    @InjectRepository(City)
    private readonly cityRepository: Repository<City>,
  ) {}

  async findAllCities(): Promise<City[]> {
    return this.cityRepository.find();
  }

  async findOneById(id: string): Promise<City> {
    const city = await this.cityRepository.findOne({ where: { id } });
    if (!city) {
      throw new NotFoundException(`City with ID ${id} not found`);
    }
    return city;
  }

  async addCity(createCityDto: CityDto): Promise<City> {
    const newCity = this.cityRepository.create(createCityDto);
    newCity.id = uuidv4();
    return this.cityRepository.save(newCity);
  }
}

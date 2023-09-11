import { Injectable, NotFoundException } from '@nestjs/common';
import { CityDto } from './city.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { City } from './city.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CityService {
  constructor(
    @InjectRepository(City)
    private readonly cityRepository: Repository<City>,
  ) {}

  getCity(): string {
    return 'This is a city';
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
    newCity.id = generateUniqueId();
    return this.cityRepository.save(newCity);
  }
}

function generateUniqueId() {
  const section1 = Math.random().toString(16).substring(2, 10);
  const section2 = Math.random().toString(16).substring(2, 10);
  const section3 = Math.random().toString(16).substring(2, 10);
  const section4 = Math.random().toString(16).substring(2, 10);
  return `${section1}-${section2}-${section3}-${section4}`;
}

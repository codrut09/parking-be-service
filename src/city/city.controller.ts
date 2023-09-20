import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CityService } from './city.service';
import { CityDto } from './city.dto';
import { City } from './city.entity';

@Controller('cities')
export class CityController {
  constructor(private readonly cityService: CityService) {}

  @Get()
  async getAllCities(): Promise<City[]> {
    return await this.cityService.findAllCities();
  }

  @Get(':id')
  async getCity(@Param('id') id: string): Promise<City> {
    return await this.cityService.findOneById(id);
  }

  @Post()
  async addCity(@Body() createCityDto: CityDto) {
    return this.cityService.addCity(createCityDto);
  }
}

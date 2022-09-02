import {
  Controller,
  Get,
  Post,
  Body,
  UseFilters,
  Param,
  ParseIntPipe,
  UseGuards,
  SetMetadata,
} from '@nestjs/common';
import { CreateCatDto } from './dto/create-cat.dto';
import { CatsService } from './cats.service';
import { Cat } from './interfaces/cat.interface';
import { ValidationPipe } from '../validation.pipe';
import { RolesGuard } from '../roles.guard';
import { Roles } from 'src/roles.decorator';

@Controller('cats')
@UseGuards(new RolesGuard())
export class CatsController {
  constructor(private catsService: CatsService) {}

  @Post()
  @Roles('admin')
  async create(@Body(new ValidationPipe()) createCatDto: CreateCatDto) {
    this.catsService.create(createCatDto);
  }

  @Get()
  async findAll(): Promise<Cat[]> {
    return this.catsService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    return this.catsService.findOne(id);
  }
}

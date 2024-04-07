import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { QuitusService } from '../service/quitus.service';
import { CreateQuitusDto } from '../dto/create-quitus.dto';
import { UpdateQuitusDto } from '../dto/update-quitus.dto';
import { Quitus } from '../entities/quitus.entity';

@Controller('quitus')
export class QuitusController {
  constructor(private readonly quitusService: QuitusService) {}

  @Post()
  create(@Body() createQuitusDto: CreateQuitusDto): Promise<Quitus> {
    return this.quitusService.create(createQuitusDto);
  }

  @Get()
  findAll() {
    return this.quitusService.findAll();
  }

  @Get(':numQuitus')
  findOne(@Param('numQuitus') numQuitus: string): Promise<Quitus> {
    return this.quitusService.findOne(numQuitus);
  }

  @Patch(':numQuitus')
  update(@Body() updateQuitusDto: UpdateQuitusDto) {
    return this.quitusService.update(updateQuitusDto);
  }

  @Delete(':numQuitus')
  remove(@Param('numQuitus') numQuitus: string) {
    return this.quitusService.remove(numQuitus);
  }
}

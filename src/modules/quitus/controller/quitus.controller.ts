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
    console.log(createQuitusDto);
    return this.quitusService.create(createQuitusDto);
  }

  @Get()
  findAll() {
    return this.quitusService.findAll();
  }

  @Get(':numQuitus')
  findOne(@Param('numQuitus') numQuitus: number): Promise<Quitus> {
    return this.quitusService.findOne(numQuitus);
  }

  @Patch(':numQuitus')
  update(
    @Param('numQuitus') numQuitus: number,
    @Body() updateQuitusDto: UpdateQuitusDto,
  ) {
    return this.quitusService.update(numQuitus, updateQuitusDto);
  }

  @Delete(':numQuitus')
  remove(@Param('numQuitus') numQuitus: number) {
    return this.quitusService.remove(numQuitus);
  }
}

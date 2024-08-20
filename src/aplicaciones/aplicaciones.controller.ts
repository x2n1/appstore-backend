import { Controller, Get, Post, Body, Patch, Param, Delete, Res, Query, Put } from '@nestjs/common';
import { AplicacionesService } from './aplicaciones.service';
import { CreateAplicacioneDto } from './dto/create-aplicacione.dto';
import { UpdateAplicacioneDto } from './dto/update-aplicacione.dto';
import { Response } from 'express';
import { Aplicacion } from './entities/aplicacione.entity';
import { ApiQuery } from '@nestjs/swagger';
import { SistemaOperativo } from './entities/sistema-operativo';

@Controller('aplicaciones')
export class AplicacionesController {
  constructor(private readonly aplicacionesService: AplicacionesService) {}

  @Post()
  create(@Body() createAplicacioneDto: CreateAplicacioneDto): void {
    this.aplicacionesService.create(createAplicacioneDto);
  }
  @ApiQuery({ name: 'nombre', required: false})
  @ApiQuery({ name: 'os', enum: SistemaOperativo, required: false})
  @Get()
  findAll(@Res() response: Response,
    @Query('nombre') nombre?: string, 
    @Query('os') os?: string): void {
    const appFilter: Aplicacion[] = this.aplicacionesService.findAll(nombre,os);
    response.status(200).send(appFilter)
  }

  @Get(':id')
  findOne(@Param('id') id: number, @Res() response: Response): void {
    const app = this.aplicacionesService.findOne(id);
    if(app){
      response.status(200).send(app)
    }
    else{
      response.status(404).send('No existe aplicacion con el ID ingresado.')
    }
  }

  @Put(':id')
  update(@Param('id') id: number, 
    @Body() updateAplicacioneDto: UpdateAplicacioneDto,
    @Res() response: Response) {
    const modif: boolean = this.aplicacionesService.update(id, updateAplicacioneDto);
    if(modif){
      response.status(200).send()
    }
    else{
      response.status(404).send('ID de aplicacion no encontrado.')
    }
  }

  @Delete(':id')
  remove(@Param('id') id: number,@Res() response: Response): void {
    const modif: boolean = this.aplicacionesService.remove(id);
    if(!modif){
      response.status(404).send('ID de aplicacion no encontrado.')
    }
    else{
      response.status(200).send()
    }
  }
}

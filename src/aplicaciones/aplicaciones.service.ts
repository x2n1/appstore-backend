import { Injectable } from '@nestjs/common';
import { CreateAplicacioneDto } from './dto/create-aplicacione.dto';
import { UpdateAplicacioneDto } from './dto/update-aplicacione.dto';
import { Aplicacion } from './entities/aplicacione.entity';

@Injectable()
export class AplicacionesService {
  private aplicaciones: Aplicacion[] = [];

  create(createAplicacioneDto: CreateAplicacioneDto) {
    const app: Aplicacion = new Aplicacion();
    app.id = this.aplicaciones.length + 1;
    app.nombre = createAplicacioneDto.nombre;
    app.precio = createAplicacioneDto.precio;
    app.descargas = 0;
    app.calificacion = 0;
    app.version = createAplicacioneDto.version;
    app.sistemaOperativo = createAplicacioneDto.sistemaOperativo;
    this.aplicaciones.push(app);
    return app;
  }

  findAll(nombre?: string, os?: string):Aplicacion[] {
    let appFilter: Aplicacion[] = []
    if(nombre && !os){
      appFilter = 
        this.aplicaciones.filter((elemento: Aplicacion) => elemento.nombre.includes(nombre));
      return appFilter
    }
    else if(os && !nombre){
      appFilter = 
        this.aplicaciones.filter((elemento: Aplicacion) => elemento.sistemaOperativo  == os);
      return appFilter
    }
    else if(nombre && os){
      appFilter = 
      this.aplicaciones.filter((elemento: Aplicacion) => 
        elemento.nombre.includes(nombre) && elemento.sistemaOperativo  == os);
    return appFilter
    }
    else{
      return this.aplicaciones
    }
  }

  findOne(id: number): Aplicacion {
    const result = this.aplicaciones.find(
      (element: Aplicacion) => element.id == id);
    return result
  }

  update(id: number, updateAplicacioneDto: UpdateAplicacioneDto): boolean {
    const elemento: number = 
      this.aplicaciones.findIndex((elemento: Aplicacion) => elemento.id == id);
      if(elemento == -1){
        return false
      }
      else{
        this.aplicaciones[elemento].version = updateAplicacioneDto.version
        this.aplicaciones[elemento].precio = updateAplicacioneDto.precio
        this.aplicaciones[elemento].tamano = updateAplicacioneDto.tamano
        return true
      }
  }

  remove(id: number): boolean {
    const elemento: number = 
    this.aplicaciones.findIndex((elemento: Aplicacion) => elemento.id == id);
    if(elemento == -1){
      return false
    }
    else{
      this.aplicaciones.splice(elemento,1)
      return true
    }
  }
}

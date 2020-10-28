import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class InfoService {
  datosPersonales =
  {
    facebook:'',
    twitter:'',
    whatsapp:'+541141711760',
    direccion:'Padre Nuestro 1168 - General Pacheco',
    email: 'info@transportenortruck.com',
  }
  constructor() { }
}

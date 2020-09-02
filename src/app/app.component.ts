import { ServiciosComponent } from './pages/servicios/servicios.component';
import { Component, OnInit } from '@angular/core';
import { ɵDomAdapter } from '@angular/common';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent{
  title = 'angularApp';


  ngOnInit(): void {

  }
  refresh(): void {
    window.location.reload(); }
  }


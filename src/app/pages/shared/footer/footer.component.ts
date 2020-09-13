import { InfoService } from './../../../services/info.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

  constructor(public info:InfoService) { }
anio = new Date().getFullYear();
   ngOnInit(): void {
  }
}

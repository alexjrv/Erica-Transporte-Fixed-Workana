import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';
@Component({
  selector: 'app-servicios',
  templateUrl: './servicios.component.html',
  styleUrls: ['./servicios.component.scss']
})
export class ServiciosComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    (function ($) {
      $(document).ready(function(){

         if (!!window['SHIPPING_SETTINGS'] && !!window['SHIPPING_SETTINGS']['twitterCarousel'])
          window['SHIPPING_SETTINGS']['twitterCarousel']();
      });
    })(jQuery);
  }

}

import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';
@Component({
  selector: 'app-portfolio',
  templateUrl: './portfolio.component.html',
  styleUrls: ['./portfolio.component.scss']
})
export class PortfolioComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    (function ($) {
      $(document).ready(function(){

         if (!!window['SHIPPING_SETTINGS'] && !!window['SHIPPING_SETTINGS']['imageCarousel'])
          window['SHIPPING_SETTINGS']['imageCarousel']();
      });
    })
    (jQuery);
  }



}

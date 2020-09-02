import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor() { }


  ngOnInit(): void {
    (function ($) {
      $(document).ready(function(){

         if (!!window['SHIPPING_SETTINGS'] && !!window['SHIPPING_SETTINGS']['imageCarousel'])
          window['SHIPPING_SETTINGS']['imageCarousel']();
      });
    })(jQuery);
  }


}

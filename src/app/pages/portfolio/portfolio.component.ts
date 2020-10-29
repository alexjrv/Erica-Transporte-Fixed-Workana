import { Component, OnInit } from '@angular/core';
import { NgxGalleryOptions, NgxGalleryImage, NgxGalleryAnimation } from 'ngx-gallery-9';
import * as $ from 'jquery';
@Component({
  selector: 'app-portfolio',
  templateUrl: './portfolio.component.html',
  styleUrls: ['./portfolio.component.scss']
})
export class PortfolioComponent implements OnInit {
  galleryOptions: NgxGalleryOptions[];
  galleryImages: NgxGalleryImage[];
  constructor() { }

  ngOnInit(): void {

    this.galleryOptions = [
        {
            width: '700px',
            height: '400px',
            thumbnailsColumns: 4,
            imageAnimation: NgxGalleryAnimation.Slide
        },
        // max-width 800
        {
            breakpoint: 800,
            width: '100%',
            height: '600px',
            imagePercent: 80,
            thumbnailsPercent: 20,
            thumbnailsMargin: 20,
            thumbnailMargin: 20
        },
        // max-width 400
        {
            breakpoint: 400,
            preview: false
        }
    ];

    this.galleryImages = [
        {
            small: 'assets/img/1.jpg',
            medium: 'assets/img/1.jpg',
            big: 'assets/img/1.jpg'
        },
        {
            small: 'assets/img/2.jpg',
            medium: 'assets/img/2.jpg',
            big: 'assets/img/2.jpg'
        },
        {
            small: 'assets/img/3.jpg',
            medium: 'assets/img/3.jpg',
            big: 'assets/img/3.jpg'
        },
        {
          small: 'assets/img/4.jpg',
          medium: 'assets/img/4.jpg',
          big: 'assets/img/4.jpg'
      },
      {
        small: 'assets/img/5.jpg',
        medium: 'assets/img/5.jpg',
        big: 'assets/img/5.jpg'
    },
    {
      small: 'assets/img/6.jpg',
      medium: 'assets/img/6.jpg',
      big: 'assets/img/6.jpg'
  },
  {
    small: 'assets/img/8.jpg',
    medium: 'assets/img/8.jpg',
    big: 'assets/img/8.jpg'
}
    ];
}



}

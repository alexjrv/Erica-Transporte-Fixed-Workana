import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './pages/shared/header/header.component';
import { FooterComponent } from './pages/shared/footer/footer.component';
import { HomeComponent } from './pages/home/home.component';
import { ContactComponent } from './pages/contact/contact.component';
import { ReactiveFormsModule } from '@angular/forms';
import { CotizacionComponent } from './pages/cotizacion/cotizacion.component';
import { MenuComponent } from './pages/shared/menu/menu.component';
import { ServiciosComponent } from './pages/servicios/servicios.component';
import { PortfolioComponent } from './pages/portfolio/portfolio.component';
import { NgxGalleryModule } from 'ngx-gallery-9';


@NgModule(

  {
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    ContactComponent,

    CotizacionComponent,
    MenuComponent,
    ServiciosComponent,
    PortfolioComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    ReactiveFormsModule,
    NgxGalleryModule




  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

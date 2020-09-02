import { ContactComponent } from './pages/contact/contact.component';
import { ServiciosComponent } from './pages/servicios/servicios.component';
import { BlogComponent } from './pages/blog/blog.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';


const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'home', component: HomeComponent },
  { path: 'nuestros-servicios', component: ServiciosComponent },
  { path: 'blog', component: BlogComponent },
  { path: 'contacto', component: ContactComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes),
    RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }

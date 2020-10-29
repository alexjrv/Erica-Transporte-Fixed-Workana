import { ContactService } from './../../services/contact.service';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormControl,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-cotizacion',
  templateUrl: './cotizacion.component.html',
  styleUrls: ['./cotizacion.component.scss']
})
export class CotizacionComponent implements OnInit {
  FormData: FormGroup;
  constructor(private contact: ContactService,
              private builder: FormBuilder) { }

      onSubmit(FormData): any {
      console.log(FormData);
      this.contact.postMessage(FormData).subscribe(
        (response) => {
          location.href = 'https://mailthis.to/confirm';
          console.log(response);
        },
        (error) => {
          console.warn(error.responseText);
          console.log({ error });
        }
      );
    }
    ngOnInit(): void {
      this.FormData = this.builder.group({
        Origen: new FormControl('', [Validators.required]),
        Destino: new FormControl('', [Validators.required]),
        Detalle: new FormControl('', [Validators.required]),
        Kilos: new FormControl('', [Validators.required]),
        Valor: new FormControl('', [Validators.required]),
        Telefono: new FormControl('', [Validators.required]),
        Email: new FormControl('', [Validators.compose([Validators.required, Validators.email]),
        ]),
      });
    }

}

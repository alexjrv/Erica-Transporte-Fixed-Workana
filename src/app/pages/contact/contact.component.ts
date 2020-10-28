import { ContactService } from './../../services/contact.service';
import { InfoService } from './../../services/info.service';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormControl,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss'],
})
export class ContactComponent implements OnInit {
  FormData: FormGroup;
  constructor(
    public info: InfoService,
    private builder: FormBuilder,
    private contact: ContactService
  ) {}

  onSubmit(FormData) {
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
  ngOnInit() {
    this.FormData = this.builder.group({
      Nombre: new FormControl('', [Validators.required]),
      Email: new FormControl('', [
        Validators.compose([Validators.required, Validators.email]),
      ]),
      Mensaje: new FormControl('', [Validators.required]),
    });
  }
}

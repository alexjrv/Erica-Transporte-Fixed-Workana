import { ScriptLoaderService } from './../../../services/script-loader.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor() {
    if (document.getElementById('testScript')) {
      document.getElementById("testScript").remove();
    }
    let testScript = document.createElement('script');
    testScript.setAttribute('id', 'testScript');
    testScript.setAttribute('src', 'assets/js/jquery.js',);
    document.body.appendChild(testScript);
  }
   ngOnInit(): void

   {
  }
}

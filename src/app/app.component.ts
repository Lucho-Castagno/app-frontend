import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app-frontend';
  constructor(private translateService: TranslateService) {
    this.translateService.setDefaultLang("es");
    this.translateService.use(localStorage.getItem('lang') || 'es');
  }
}

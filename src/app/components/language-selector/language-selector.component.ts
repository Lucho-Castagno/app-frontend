import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-language-selector',
  templateUrl: './language-selector.component.html'
})
export class LanguageSelectorComponent implements OnInit{

  selectedLanguage!: string;

  ngOnInit(): void {
    this.selectedLanguage = localStorage.getItem('lang') || 'es';
  }

  switchLanguage() {
    localStorage.setItem('lang', this.selectedLanguage);
    window.location.reload();
  }

}

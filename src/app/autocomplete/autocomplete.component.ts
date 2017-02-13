import { Component, Input, Renderer, OnInit } from '@angular/core';

@Component({
  selector: 'app-autocomplete',
  templateUrl: './autocomplete.component.html',
  styleUrls: ['./autocomplete.component.scss']
})
export class AutocompleteComponent implements OnInit {

  @Input() keywords = [];
  inputText: string = "";
  matchingText = [];
  searchingForMatch: boolean;

  onInputChange(event: any) {
    if (this.inputText.length >= 3) {
      this.matchingText = this.keywords.filter(word => {
          if(word.length>this.inputText.length)
          return this.inputText.startsWith(word.toLowerCase().slice(0, this.inputText.length));
        }
      );
      if (this.matchingText.length > 4) { // limitation of number of suggested keywords
        this.matchingText.splice(5);
      }
      this.searchingForMatch = true;
    }
    else {
      this.searchingForMatch = false;
    }
  }

  selectTextToAutocomplete(event: any, item: string) {
    if (event.type === 'click' || event.key === 'Enter') {
      this.inputText = item;
      this.searchingForMatch = false;
    }
  }

  constructor(private renderer: Renderer) {
  }

  ngOnInit() {
    document.addEventListener('keydown', (event) => {
      let tabIndex = (<HTMLElement>document.activeElement).tabIndex;
      switch (event.key) {
        case 'ArrowUp':
          if (tabIndex >= 2) tabIndex--;
          break;
        case 'ArrowDown':
          if (tabIndex <= this.matchingText.length) tabIndex++;
          break;
        case 'Enter':
          tabIndex = 1;
      }
      const elementToFocus = document.querySelector(`[tabindex="${tabIndex}"]`);
      this.renderer.invokeElementMethod(elementToFocus, 'focus', []);
    }, false);
  }
}


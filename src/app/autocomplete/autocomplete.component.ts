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
      this.matchingText = this.keywords.filter((el) =>
        el.toLowerCase().indexOf(this.inputText.toLowerCase()) > -1
      );
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
      if (event.key === 'ArrowUp') {
        tabIndex--;
      }
      if (event.key === 'ArrowDown') {
        console.log("arrowdown");
        tabIndex++;
      }
      const elementToFocus = document.querySelector(`[tabindex="${tabIndex}"]`);
      console.log(`tabindex="${tabIndex}"`);
      console.log({tabIndex});
      this.renderer.invokeElementMethod(elementToFocus, 'focus', []);
    }, false);
  }


}


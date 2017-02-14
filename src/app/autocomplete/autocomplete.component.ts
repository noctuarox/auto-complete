import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-autocomplete',
  templateUrl: './autocomplete.component.html',
  styleUrls: ['./autocomplete.component.scss']
})
export class AutocompleteComponent {

  @Input() keywords = [];
  inputText: string = "";
  matchingText = [];
  searchingForMatch: boolean;
  arrowIndexCounter: number = -1; // so that initially input field has no valid index

  onInputChange(event: any) {
    if (this.inputText.length >= 3) {
      this.matchingText = this.keywords.filter(word => {
          if (word.length > this.inputText.length)
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
    this.arrowIndexCounter = -1; // always set index of focusable keywords to initial value
  }

  selectTextToAutocomplete(event: any, item: string) {
    this.inputText = item;
    this.searchingForMatch = false;
  }

  constructor() {
  }

  handleKeydownEvent(event: any) {
    if (this.matchingText.length > 0) {
      switch (event.key) {
        case 'ArrowUp':
          if (this.arrowIndexCounter >= 0 && this.searchingForMatch)
            this.arrowIndexCounter--;
          break;
        case 'ArrowDown':
          if (this.arrowIndexCounter < this.matchingText.length - 1 && this.searchingForMatch)
            this.arrowIndexCounter++;
          break;
        case 'Enter':
          if (this.arrowIndexCounter >= 0) {
            this.inputText = this.matchingText[this.arrowIndexCounter];
            this.searchingForMatch = false;
          }
          if (this.arrowIndexCounter === -1) this.searchingForMatch = false;
      }
    }
  }
}
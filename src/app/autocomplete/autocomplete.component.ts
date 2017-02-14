import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-autocomplete',
  templateUrl: './autocomplete.component.html',
  styleUrls: ['./autocomplete.component.scss']
})
export class AutocompleteComponent {

  @Input() keywords = [];
  inputText: string = '';
  matchingText = [];
  arrowIndexCounter: number = -1; // so that initially input field has no valid index

  onInputChange(event) {
    const shortestStringLength = 3; // shortest length of input text required to start searching for keywords
    const numberOfSuggestedKeywords = 5; // number of keywords suggested by autocomplete
    if (this.inputText.length >= shortestStringLength && event.target.value) {
      this.matchingText = this.keywords.filter(word => {
          if (word.length > this.inputText.length) return word.startsWith(this.inputText.toLowerCase());
        }
      );
      this.matchingText.splice(numberOfSuggestedKeywords);
    }
    else {
      this.matchingText = [];
    }
    this.arrowIndexCounter = -1; // always set index of focusable keywords to initial value
  }

  selectTextToAutocomplete(item: string) {
    this.inputText = item;
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
          if (this.arrowIndexCounter >= 0) this.inputText = this.matchingText[this.arrowIndexCounter];
          if (this.arrowIndexCounter === -1) this.matchingText = [];

      }
    }
  }

  get
  searchingForMatch() {
    return this.matchingText.length > 0
  }
}
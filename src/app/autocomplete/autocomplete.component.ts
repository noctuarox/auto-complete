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

  onInputChange(event: any) {
    if (this.inputText.length >= 3) {
      this.findMatch();
      this.searchingForMatch = true;
    }
    else {
      this.searchingForMatch = false;
    }
  }

  findMatch() {
    this.matchingText = this.filterText(this.inputText);
  }

  filterText(query) {
    return this.keywords.filter((el) =>
      el.toLowerCase().indexOf(query.toLowerCase()) > -1
    )
  }

  selectTextToAutocomplete(index){
    this.inputText = this.matchingText[index];
    this.matchingText = [];
  }

}

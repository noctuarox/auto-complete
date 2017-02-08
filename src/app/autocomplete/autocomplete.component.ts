import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-autocomplete',
  templateUrl: './autocomplete.component.html',
  styleUrls: ['./autocomplete.component.scss']
})
export class AutocompleteComponent implements OnInit {

  @Input() keywords = [];
  inputText: string;

  constructor() { }

  ngOnInit() {
  }

  onKeyPress(event: any){
    console.log("Key has been pressed");
  }
}

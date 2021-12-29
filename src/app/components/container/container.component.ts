import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-container',
  templateUrl: './container.component.html',
  styleUrls: ['./container.component.scss'],
})
export class ContainerComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}

  buttonClick(input1: string, input2: string, input3: string) {
    console.log('input1: ', input1);
    console.log('input2: ', input2);
    console.log('input3: ', input3);
  }
}

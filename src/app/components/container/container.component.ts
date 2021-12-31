import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-container',
  templateUrl: './container.component.html',
  styleUrls: ['./container.component.scss'],
})
export class ContainerComponent implements OnInit {
  lowerCharacters = 'abcdefghijklmnopqrstuvwxyz';
  constructor() {}

  ngOnInit(): void {}

  buttonClick(input1: string, input2: string, input3: string) {
    const userPassword = `${input1}${input2}${input3}`;
    console.log('userPassword: ', userPassword);

    const characterList = this.lowerCharacters;

    // generate 50 random passwords using characters from the character list
    for (let i = 0; i < 50; i++) {
      const randomPassowrd = this.generateRandomPassword(characterList);

      this.checkPasswordMatch(userPassword, randomPassowrd);
    }
  }

  // input a string of characters and return a single random character from that string
  selectRandomCharacter(characterList: string): string {
    return characterList.charAt(
      Math.floor(Math.random() * characterList.length)
    );
  }

  // input a list of characters (just a string), select a random character from the list three times, combine them to make a random password,
  // then return the random password
  generateRandomPassword(characterList: string): string {
    const randomCharacter1 = this.selectRandomCharacter(characterList);
    const randomCharacter2 = this.selectRandomCharacter(characterList);
    const randomCharacter3 = this.selectRandomCharacter(characterList);
    const randomPassword = `${randomCharacter1}${randomCharacter2}${randomCharacter3}`;
    return randomPassword;
  }

  checkPasswordMatch(userPassword: string, randomPassword: string) {
    let currentIndex = 0;

    // temp console log to show randomPassword if first character matches
    if (userPassword[0] === randomPassword[0]) {
      console.log('randomPassword: ', randomPassword);
    }

    while (userPassword[currentIndex] === randomPassword[currentIndex]) {
      console.log(
        `randomPassword current index: ${randomPassword[currentIndex]}`
      );
      currentIndex += 1;
      console.log('currentIndex: ', currentIndex);
    }

    // need to check for no match, partial match, or complete match

    if (userPassword === randomPassword) {
      console.log(`Match!!! randomPassword: ${randomPassword}`);
    }
  }
}

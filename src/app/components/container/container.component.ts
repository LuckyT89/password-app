import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-container',
  templateUrl: './container.component.html',
  styleUrls: ['./container.component.scss'],
})
export class ContainerComponent implements OnInit {
  // lowerCharacters = 'abcdefghijklmnopqrstuvwxyz';
  private lowerCharacters = 'abc';
  matchList: string[] = [];
  constructor() {}

  ngOnInit(): void {}

  buttonClick(input1: string, input2: string, input3: string) {
    const userPassword = `${input1}${input2}${input3}`;
    const characterList = this.lowerCharacters;

    // generate 50 random passwords using characters from the character list
    for (let i = 0; i < 50; i++) {
      const randomPassowrd = this.generateRandomPassword(characterList);

      const result = this.checkPasswordMatch(userPassword, randomPassowrd);
      if (result !== 'No match') {
        this.matchList.push(`Attempt #${i + 1}: ${result}`);
        console.log(`Attempt ${i + 1}: ${result}`);
      }
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

  // The random password can have three possibilities- it can be a complete match, a partial match, or no match at all. Input the user password and the
  // random password, see which of the three matching possibilities it is, and return the result as a string.
  checkPasswordMatch(userPassword: string, randomPassword: string) {
    let currentIndex = 0;

    // check for complete match
    if (userPassword === randomPassword) {
      return `${randomPassword} Complete match!`;
    }
    // check for no match
    else if (userPassword[0] !== randomPassword[0]) {
      return 'No match';
    }
    // check for partial match
    else {
      let partialMatch = '';
      while (userPassword[currentIndex] === randomPassword[currentIndex]) {
        partialMatch += randomPassword[currentIndex];
        currentIndex += 1;
      }
      const remainder = randomPassword.slice(partialMatch.length);
      return `${partialMatch} | ${remainder}`;
    }
  }
}

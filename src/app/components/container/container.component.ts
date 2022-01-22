import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-container',
  templateUrl: './container.component.html',
  styleUrls: ['./container.component.scss'],
})
export class ContainerComponent implements AfterViewInit {
  private lowerCharacters = 'abc';
  private upperCharacters = 'ABC';
  private numbers = '12';
  private specialCharacters = '!@';

  private upperCharactersAllowed = false;
  private numbersAllowed = false;
  private speacialCharactersAllowed = false;

  private allowedCharacters = this.lowerCharacters;

  @ViewChild('passwordInput') passwordInput!: ElementRef;

  private passwordLength: number = 5;

  form = new FormGroup({ length: new FormControl('5') });

  testNumber = 6;

  matchList: string[] = [];

  constructor() {}

  ngAfterViewInit(): void {
    this.passwordInput.nativeElement.focus(); // set the input box to have focus when the app loads
  }

  // the length value from the radio button is a string, set a global variable to store this as a number
  setPasswordLength() {
    this.passwordLength = parseInt(this.form.value.length);
  }

  toggleCapitalLetters() {
    this.upperCharactersAllowed = !this.upperCharactersAllowed;
    this.setAllowedCharacters();
  }

  toggleNumbers() {
    this.numbersAllowed = !this.numbersAllowed;
    this.setAllowedCharacters();
  }

  toggleSpecialCharacters() {
    this.speacialCharactersAllowed = !this.speacialCharactersAllowed;
    this.setAllowedCharacters();
  }

  // set the list of allowed characters based on which checkboxes are checked
  setAllowedCharacters() {
    console.log('set the list');
    this.allowedCharacters = this.lowerCharacters;
    if (this.upperCharactersAllowed) {
      this.allowedCharacters = this.allowedCharacters + this.upperCharacters;
    }
    if (this.numbersAllowed) {
      this.allowedCharacters = this.allowedCharacters + this.numbers;
    }
    if (this.speacialCharactersAllowed) {
      this.allowedCharacters = this.allowedCharacters + this.specialCharacters;
    }
  }

  validateInput(event: any) {
    if (!this.allowedCharacters.includes(event.key)) {
      event.preventDefault();
    }
  }

  resetBtnClick() {
    console.log('reset button clicked');
  }

  buttonClick(passwordInput: string) {
    console.log('allowedCharacters: ', this.allowedCharacters);

    // generate 100 random passwords using characters from the character list
    for (let i = 0; i < 100; i++) {
      const randomPassword = this.generateRandomPassword(
        this.allowedCharacters
      );

      const result = this.checkPasswordMatch(passwordInput, randomPassword);
      if (result !== 'No match') {
        this.matchList.push(`Attempt #${i + 1}: ${result}`);
        console.log(`Attempt ${i + 1}: ${result}`);
        // stop looping and end the method if there is a complete match
        if (result.includes('Complete match!')) {
          return;
        }
      }
    }
  }

  // input a string of characters and return a single random character from that string
  selectRandomCharacter(characterList: string): string {
    return characterList.charAt(
      Math.floor(Math.random() * characterList.length)
    );
  }

  // input a list of allowed characters and return a random password that matches the allowed length
  generateRandomPassword(characterList: string): string {
    let randomCharacter = '';
    let randomPassword = '';
    for (let i = 0; i < this.passwordLength; i++) {
      randomCharacter = this.selectRandomCharacter(characterList);
      randomPassword += randomCharacter;
    }
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
      return `${partialMatch}|${remainder}`;
    }
  }
}

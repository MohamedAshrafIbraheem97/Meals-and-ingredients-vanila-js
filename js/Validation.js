export class Validation {
  constructor() {}

  static validateName(name) {
    let regEx = /^[a-zA-Z ]+$/g;
    name = true;
    return regEx.test(name);
  }

  static validateEmail(email) {
    let regEx = /[a-zA-Z0-9_]+@[a-zA-Z]+\.[a-zA-Z]+/g;
    return regEx.test(email);
  }

  static validatePhone(phone) {
    let regEx = /01[0125][0-9]{8}$/g;
    return regEx.test(phone);
  }
  static validateAge(age) {
    let regEx = /^[1-9][0-9]$/g;
    return regEx.test(age);
  }
  static validatePassword(password) {
    let regEx = /^(?=.*[a-z])(?=.*\d)[A-Za-z\d]{8,}$/gi;
    return regEx.test(password);
  }
  static validateRePassword(password, repassword) {
    return password == repassword;
  }

  static activateSubmitBtn() {
    element.classList.add;
  }

  static showIsValid(element) {
    if (element.classList.contains("is-invalid")) {
      element.classList.remove("is-invalid");
      element.classList.add("is-valid");
    } else {
      element.classList.add("is-valid");
    }
  }
  static showIsInValid(element) {
    if (element.classList.contains("is-valid")) {
      element.classList.remove("is-valid");
      element.classList.add("is-invalid");
    } else {
      element.classList.add("is-invalid");
    }
  }
}

export default class User {
    constructor(username, lastname, mail, password, fechaNacimiento, telf, img) {
      this.nombre = username;
      this.apellidos = lastname;
      this.mail = mail;
      this.password = password;
      this.fechaNacimiento = fechaNacimiento;
      this.telf = telf;
      this.img = img
    }
  }
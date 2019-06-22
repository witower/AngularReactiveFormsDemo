import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { passwordNotMatchValidator } from './password-match.directive';
import { debounceTime } from 'rxjs/operators';

@Component({
  selector: 'app-registration-form',
  templateUrl: './registration-form.component.html',
  //styleUrls: ['./registration-form.component.css']
})
export class RegistrationFormComponent implements OnInit {

  registerForm = this.formBuilder.group({
    name: ['', Validators.required],
    surname: ['', Validators.required],
    email: ['', [Validators.required, , Validators.email]],
    phone: ['', [Validators.pattern('^[0-9 ()+-]*$')]],
    passwordGroup: this.formBuilder.group({
      password: ['', [Validators.required, Validators.minLength(8), Validators.pattern('^(?=.*?[A-Z])(?=.*?[@#$%^&]).{8,}$')]],
      passwordConfirm: [{value: '', disabled: true}, Validators.required]
    }, {validators: passwordNotMatchValidator}),
    pet: ['', Validators.required],
    address: this.formBuilder.group({
      city: ['', Validators.required],
      street: ['', Validators.required],
      building: ['', Validators.required],
      flatNo: ['']
    }),
    consents: this.formBuilder.group({
      newsletter: [false, Validators.requiredTrue],
      sms: [false]
    })
  });

  //Gettery dla kontrolek
  get name() { return this.registerForm.get('name'); }
  get surname() { return this.registerForm.get('surname'); }
  get email() { return this.registerForm.get('email'); }
  get phone() { return this.registerForm.get('phone'); }
  get passwordGroup() { return this.registerForm.get('passwordGroup'); }
  get password() { return this.registerForm.get('passwordGroup.password'); }
  get passwordConfirm() { return this.registerForm.get('passwordGroup.passwordConfirm'); }
  get pet() { return this.registerForm.get('pet'); }
  get address() { return this.registerForm.get('address'); }
  get city() { return this.registerForm.get('address.city'); }
  get street() { return this.registerForm.get('address.street'); }
  get building() { return this.registerForm.get('address.building'); }
  get flatNo() { return this.registerForm.get('address.flatNo'); }
  get consents() { return this.registerForm.get('consents'); }
  get newsletter() { return this.registerForm.get('consents.newsletter'); }
  get sms() { return this.registerForm.get('consents.sms'); }

  passwordNotMatch = false;

  registeredUser: RegisteredUser;


  constructor(private formBuilder: FormBuilder) { }

  ngOnInit() {

    let password = this.password;
    let passwordConfirm = this.passwordConfirm;
    let passwordGroup = this.passwordGroup;

    password.valueChanges.pipe().subscribe(() => {
      if((password.touched || !password.pristine) && password.valid) {
        passwordConfirm.enable();
      } else {
        passwordConfirm.setValue('');
        passwordConfirm.disable();
      }
    });

    passwordConfirm.valueChanges.pipe(debounceTime(1000)).subscribe(() => {
      if (!(passwordGroup.valid || passwordConfirm.disabled || passwordConfirm.pristine || passwordConfirm.value == "")) {
        this.passwordNotMatch = true;
      } else {this.passwordNotMatch = false;}
    });
  }

  onSubmit() {
    this.registeredUser = JSON.parse(JSON.stringify(this.registerForm.value).trim());
    this.registeredUser.password = this.password.value; //brakuje po parsowaniu jsona
    console.log(this.registeredUser);
  }

  deserveError(control) {
    let f = this.registerForm.get(control);
    
    //if (!f) return false; //wyłączone do brzydkiego wychwytywania błędów

    return !((!f.touched && f.pristine) || f.valid || f.disabled);
  }

  // outputMapper(){
  //   let user = this.registeredUser;

  //   user.name = this.name.value.trim();
  //   user.surname = this.surname.value.trim();
  //   user.email = this.email.value.trim();
  //   user.phone = this.phone.value.trim();
  //   user.password = this.password.value;
  //   user.pet = this.pet.value;
  //   user.address.city = this.city.value.trim();
  //   user.address.street = this.street.value.trim();
  //   user.address.building = this.building.value.trim();
  //   user.address.flatNo = this.flatNo.value.trim();
  //   user.consents.newsletter = this.newsletter.value;
  //   user.consents.sms = this.sms.value;
  // }
}

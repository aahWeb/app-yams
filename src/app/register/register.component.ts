import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {

    userForm = this.fb.group({
    firstName: ['', Validators.required ],
    lastName: ['']
  });

  constructor(private fb: FormBuilder) { }


  onSubmit(){
    console.warn(this.userForm.value);
  }
}

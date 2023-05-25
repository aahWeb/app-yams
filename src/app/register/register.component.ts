import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { UserService } from '../user.service';
import { Status, User } from '../user';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {

  user: User = {
    name: '',
    email: '',
    address: '',
    status: Status.Paused
  }

  userForm = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(5)]],
    email: ['', [Validators.email, Validators.required]],
    address: ['']
  });

  constructor(
    private fb: FormBuilder, 
    private us: UserService,
    private router: Router // router est un service
    ) { }

  // getter pour la validation dans le formulaire errors
  get name() {
    return this.userForm.get('name');
  }

  get email() {
    return this.userForm.get('email');
  }

  get address() {
    return this.userForm.get('address');
  }

  onSubmit() {
    this.user.name = this.userForm.value.name ?? '';
    this.user.email = this.userForm.value.email ?? '';
    this.user.address = this.userForm.value.address ?? '';

    this.us.createUser(this.user).subscribe(user => {

      this.router.navigate(['/home'], { queryParams: { message: 'success' } });
    })
  }

}


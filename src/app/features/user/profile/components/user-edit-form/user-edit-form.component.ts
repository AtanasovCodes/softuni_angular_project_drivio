import { Component, EventEmitter, inject, OnInit, Output } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { UserService } from 'app/features/user/services/user.service';
import { CustomValidators } from 'app/shared/validators/custom-validators';
import { ToastrService } from 'ngx-toastr';
import { User } from 'types/user.interface';

@Component({
  selector: 'app-user-edit-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './user-edit-form.component.html',
  styleUrl: './user-edit-form.component.css',
})
export class UserEditFormComponent implements OnInit {
  @Output() profileUpdated = new EventEmitter<void>();

  private fb = inject(FormBuilder);
  private userService = inject(UserService);
  private toastr = inject(ToastrService);

  user: User | null = null;

  ngOnInit(): void {
    this.userService.getMe().subscribe({
      next: (user) => {
        console.log('Fetched user data:', user);
        this.user = user;

        if (!user) {
          this.toastr.error('Failed to fetch user data', 'Error');
          return;
        }

        this.editProfileForm.patchValue({
          firstName: user.firstName,
          lastName: user.lastName,
          phoneNumber: user.phone,
          email: user.email,
        });
      },
      error: (error) => {
        console.error('Error fetching user data:', error);
      },
    });
  }

  editProfileForm = this.fb.group({
    firstName: new FormControl('', [Validators.required, Validators.minLength(2)]),
    lastName: new FormControl('', [Validators.required, Validators.minLength(2)]),
    phoneNumber: new FormControl('', [
      Validators.required,
      Validators.pattern(/^\+?[0-9]{10,15}$/),
    ]),
    email: new FormControl('', [Validators.required, CustomValidators.emailValidator]),
  });

  changePasswordForm = this.fb.group({
    passwordGroup: this.fb.group(
      {
        password: new FormControl('', [Validators.required, Validators.minLength(6)]),
        confirmPassword: new FormControl('', [Validators.required]),
      },
      {
        validators: CustomValidators.fieldsMatch('password', 'confirmPassword'),
      }
    ),
  });
  get firstName() {
    return this.editProfileForm.get('firstName')!;
  }

  get lastName() {
    return this.editProfileForm.get('lastName')!;
  }

  get phoneNumber() {
    return this.editProfileForm.get('phoneNumber')!;
  }
  get email() {
    return this.editProfileForm.get('email')!;
  }

  get password() {
    return this.changePasswordForm.get('passwordGroup.password')!;
  }

  get confirmPassword() {
    return this.changePasswordForm.get('passwordGroup.confirmPassword')!;
  }

  isFieldInvalid(controlPath: string, form: FormGroup = this.editProfileForm) {
    const control = form.get(controlPath);
    return !!(control && control.invalid && control.touched);
  }

  isEmailInvalid(controlName: keyof typeof this.editProfileForm.controls) {
    const control = this.editProfileForm.get(controlName);
    return control && control.errors && control.errors['pattern'] && control.touched;
  }

  isPasswordMismatch() {
    const passwordGroup = this.changePasswordForm.get('passwordGroup');
    return passwordGroup?.hasError('fieldsMismatch') && passwordGroup.touched;
  }

  onSubmit(): void {
    if (this.editProfileForm.valid) {
      const { firstName, lastName, phoneNumber, email } = this.editProfileForm.value as {
        firstName: string;
        lastName: string;
        phoneNumber: string;
        email: string;
      };

      this.userService
        .updateProfile({
          firstName,
          lastName,
          phoneNumber,
          email,
          password: this.password.value as string,
        })
        .subscribe({
          next: () => {
            this.toastr.success('Profile updated successfully', 'Success');
            this.profileUpdated.emit();
          },
          error: (err) => {
            if (err.status === 400) {
              this.toastr.error('Invalid input, please check your data', 'Update Failed');
            } else if (err.status === 500) {
              this.toastr.error('Server error, please try again later', 'Update Failed');
            } else if (err.status === 409) {
              this.toastr.error('Email already exists', 'Update Failed');
            }
          },
        });
    }
  }

  onChangePasswordSubmit(): void {
    if (this.changePasswordForm.valid) {
      const passwordGroup = this.changePasswordForm.get('passwordGroup')!;
      const password = passwordGroup.get('password')?.value as string;

      this.userService.updateProfile({ password }).subscribe({
        next: () => {
          this.toastr.success('Password changed successfully', 'Success');
          this.changePasswordForm.reset();
        },
        error: (err) => {
          if (err.status === 400) {
            this.toastr.error('Invalid password, please try again', 'Change Password Failed');
          } else if (err.status === 500) {
            this.toastr.error('Server error, please try again later', 'Change Password Failed');
          }
        },
      });
    }
  }
}

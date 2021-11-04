import { Component, OnInit } from '@angular/core';
import { Service } from 'src/app/services/http.service';
import { Users } from './users';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { catchError } from 'rxjs/operators';
// import { HttpErrorResponse } from '@angular/common/http';
// import { EMPTY } from 'rxjs';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
})
export class UsersComponent implements OnInit {
  form = new FormGroup({
    name: new FormControl('', [Validators.required]),
    last_name: new FormControl('', [Validators.required]),
    phone: new FormControl('', [
      Validators.minLength(10),
      Validators.required,
      Validators.pattern('^(0|[1-9][0-9]*)$'),
    ]),
    nickname: new FormControl('', [Validators.required]),
  });

  users = new Array<Users>();
  displayedColumns: string[] = ['name', 'last_name', 'phone', 'nickname', 'edit', 'remove', 'tracking'];

  constructor(private service: Service, private _snackBar: MatSnackBar) {}

  async ngOnInit(): Promise<void> {
    await this.getUsers();
  }

  async getUsers(): Promise<void> {
    (await this.service.apiRest('', 'users/get_users')).subscribe(({ result }) => {
      return (this.users = result);
    });
  }

  async editUser(id: string) {}

  async deleteUser(phone: number): Promise<void> {
    Swal.fire({
      title: 'Desea eliminar el usuario?',
      showCancelButton: true,
      confirmButtonText: 'Si',
      cancelButtonText: 'No',
      icon: 'question',
    }).then(async (result) => {
      if (result.isConfirmed) {
        (await this.service.apiRest(JSON.stringify({ phone }), 'users/delete_user')).subscribe(async () => {
          await this.getUsers();
          Swal.fire('Usuario eliminado!', '', 'success');
        });
      }
    });
  }

  async createUser(): Promise<void> {
    const name = this.form.get('name')?.value;
    const last_name = this.form.get('last_name')?.value;
    const phone = this.form.get('phone')?.value;
    const nickname = this.form.get('nickname')?.value;

    if (this.form.valid) {
      (await this.service.apiRest(JSON.stringify({ name, last_name, phone, nickname }), 'users/create_user'))
        .pipe(
          catchError(async () => {
            return this._openSnackBar('El usuario no se puede crear porque se ya existe!', 'Aceptar');
          })
        )
        .subscribe(async (result) => {
          this._resetForm();
          await this.getUsers();
          this._openSnackBar('El usuario se creo con exito!', 'Aceptar');
        });
    }
  }

  validatePhoneInput(event: Event): void {
    const phone = (event.target as HTMLInputElement).value;
    const regex = new RegExp('^(0|[1-9][0-9]*)$');
    if (!regex.test(phone)) {
      this.form.controls['phone'].markAsTouched();
    }
  }

  _openSnackBar(message: string, action: string): void {
    this._snackBar.open(message, action);
  }

  _resetForm(): void {
    this.form.reset();
    Object.keys(this.form.controls).forEach((key) => {
      this.form.get(key)?.setErrors(null);
    });
  }
}

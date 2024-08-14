import { Component, OnInit, ViewChild } from '@angular/core';
import { UserService } from '../../service/user.service';
import { MatPaginator, MatPaginatorIntl } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { User } from '../../model/user';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';
import { EditUserDialogComponent } from '../edit-user-dialog/edit-user-dialog.component';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrl: './users.component.css'
})
export class UsersComponent{
  userForm!: FormGroup;

  users: User[] = []
  tableColumns: string[] = ['name', 'role', 'email', 'dob', 'age', 'mobile', 'gender', 'action'];
  scndTblColumns: string[] = ['name', 'role', 'authName', 'email', 'dob', 'mobile', 'action'];

  resultsLength = 0;
  pagesize = 5;

  @ViewChild('paginator', { static: false }) set paginatorPageSize(pager: MatPaginator) {
    if (pager) {
      this.dataSource.paginator = pager;
      this.dataSource.paginator._intl = new MatPaginatorIntl()
      this.dataSource.paginator._intl.itemsPerPageLabel = " ";
    }
  }
  private sort!: MatSort;

  @ViewChild('firstTableSort') set matSort(ms: MatSort) {
    this.sort = ms;
    this.setDataSourceAttributes();
  }

  setDataSourceAttributes() {
    this.dataSource.sort = this.sort;
  }

  dataSource = new MatTableDataSource(this.users);

  constructor(private userService: UserService, private fb: FormBuilder, private dialog: MatDialog) {
    this.dataSource == new MatTableDataSource(this.users);
    this.userForm = this.fb.group({
      role: ['', Validators.required],
    })
  }
  roleChange() {
    this.displayFrstTbl = false;
    this.displayScndTbl = false;
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  }

  getAllUsers() {
    this.userService.getAllUsers().subscribe(data => {
      if (data.status) {
        console.log(data)
        this.dataSource.data = data.result
      }
    })
  }

  displayFrstTbl: boolean = false;
  displayScndTbl: boolean = false;

  onSubmit() {
    if (this.userForm.valid) {
      let type = this.userForm.get('role')?.value
      this.userService.getUsersByRole(type).subscribe(data => {
        console.log(data);
        if (data.status) {
          this.dataSource.data = data.result;
          if (type == 'Organization') {
            this.displayScndTbl = true;
            this.displayFrstTbl = false;
          } else {
            this.displayScndTbl = false;
            this.displayFrstTbl = true;
          }
        }
      })
    }
  }

  openDialog(org: User) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: {
        message: 'Are you sure want to delete?',
        buttonText: {
          ok: 'Delete',
          cancel: 'Cancel'
        }
      },
      panelClass: 'confirm-dialog',
      width: '400px'
    });
    dialogRef.afterClosed().subscribe((confirmed: boolean) => {
      if (confirmed) {
        this.deleteNotice(org._id)
      }
    });
  }

  deleteNotice(userId: string) {
    this.userService.deleteUser(userId).subscribe(data => {
      console.log(data);
      if (data.status) {
        this.onSubmit();
      }
    })
  }

  showPrompt(user: User): void {
    const dialogRef = this.dialog.open(EditUserDialogComponent, {
      data: {
        ...user
      },
    });

    dialogRef.afterClosed().subscribe((data) => {
      console.log(data)
      if (data != undefined && data.clicked === 'submit') {
        this.userService.updateUser(data.id, data.form).subscribe(data => {
          if (data.status) {
            this.onSubmit();
          }
        })
      }
    });
  }

}

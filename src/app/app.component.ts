import { Component, OnInit, Output, ViewChild,EventEmitter } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from './dialog/dialog.component';
import { ApiService } from './Services/api.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { HttpErrorResponse } from '@angular/common/http';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'CrudWithUI';
  displayedColumns: string[] = ['ufname', 'ulname', 'uemail', 'umobile', 'usalary', 'action'];
  dataSource!: MatTableDataSource<any>;
  constructor(private dialog: MatDialog, private service: ApiService) {

  }
  ngOnInit(): void {
    {
      this.getuser();
    }
  }


  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @Output() data:EventEmitter<any>=new EventEmitter() ;

  openDialog() {
    this.dialog.open(DialogComponent, {
      width: "30%",
    }).afterClosed().subscribe(val=>
      {
        if(val==="save")
        {
          this.getuser();
        }
      })
  }
  getuser() {
    this.service.getuserdetail().subscribe({next:(posres) => {
      console.log(posres);
      this.dataSource = new MatTableDataSource(posres.result);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      }})
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  editemployee(row: any) {
    this.dialog.open(DialogComponent,
      {
        width: '30%',
        data: row,
      }).afterClosed().subscribe(val=>
        {
          if(val==="update")
          {
            this.getuser(); 
          }
        })
      
     
  }

  delete(data: any) {
    this.service.deleteuserdetail(data._id).subscribe((posres) => {
      console.log(data._id);
      alert("Deleted Successfully");
      this.getuser();
    },
      (err: HttpErrorResponse) => {
        console.log(err);
      })
  }
  senddata()
  {
    this.data.emit(this.getuser());
  }
}

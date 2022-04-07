import { HttpErrorResponse } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ApiService } from '../Services/api.service';
import {MatDialogRef,MAT_DIALOG_DATA} from "@angular/material/dialog";

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent implements OnInit {
  actionbtn:string="save";
  constructor(
    private fb:FormBuilder,
    private service:ApiService,
    @Inject(MAT_DIALOG_DATA) public editData:any,
    private dialogRef:MatDialogRef<DialogComponent>
    ) { }

  ngOnInit(): void {
    console.log(this.editData);
    
  if(this.editData)
  {
   this.actionbtn="Update";
    sessionStorage.setItem("_id",this.editData._id)
    this.myform.controls["fname"].setValue(this.editData.ufname);
    this.myform.controls["lname"].setValue(this.editData.ulname);
    this.myform.controls["email"].setValue(this.editData.uemail);
    this.myform.controls["mobile"].setValue(this.editData.umobile);
    this.myform.controls["salary"].setValue(this.editData.usalary);

  }
  }
  myform=this.fb.group(
    {
      fname:["",Validators.required],
      lname:["",Validators.required],
      email:["",Validators.required],
      mobile:["",Validators.required],
      salary:["",Validators.required]
    })
submit()
{
  if(!this.editData)
  {
    if(this.myform.valid)
    {
      console.log(this.myform.value)
      this.service.postusetdetail(this.myform.value).subscribe((posres)=>
      {
        console.log(posres);
        alert("Data send Successfully");
        this.dialogRef.close('save');
        window.location.reload();
      },(err:HttpErrorResponse)=>
      {
        console.log(err);
      })
    }
  }
  else{
   this.update();
  }
}
update()
{
  if(this.myform.valid)
  {
    var _id=this.service.get_id();
    this.service.updateuserdetail(_id,this.myform.value).subscribe((posres)=>
    {
      console.log(posres);
      alert("Data Updated");
      sessionStorage.clear();
      this.dialogRef.close('update');

    })
  }
}
getuser() {
  this.service.getuserdetail().subscribe((posres) => {
    console.log(posres);
  })
}

}

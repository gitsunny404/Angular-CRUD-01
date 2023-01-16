import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { EmployeeModal } from '../employee.modal';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-main-content',
  templateUrl: './main-content.component.html',
  styleUrls: ['./main-content.component.css']
})
export class MainContentComponent implements OnInit {

  registrationForm !: FormGroup;
  EmployeeModalObj : EmployeeModal = new EmployeeModal;
  EmployeeData : any = '';


  constructor(private formbuilder : FormBuilder, private myapi : ApiService){}

  ngOnInit(): void {
    this.registrationForm = this.formbuilder.group({
      firstname : [''],
      lastname : [''],
      email : [''],
      mobile : [''],
      salary : ['']
    }),
    this.gettingData();
  }


  postingData(){
    console.log("Inside posting")
    this.EmployeeModalObj.firstname = this.registrationForm.value.firstname;
    this.EmployeeModalObj.lastname = this.registrationForm.value.lastname;
    this.EmployeeModalObj.email = this.registrationForm.value.email;
    this.EmployeeModalObj.mobile = this.registrationForm.value.mobile;
    this.EmployeeModalObj.salary = this.registrationForm.value.salary;

    this.myapi.postData(this.EmployeeModalObj).subscribe((res)=>{
      console.log(res);
      alert("Data posted successfully ...")
      this.registrationForm.reset();
      this.gettingData();
    },
    err=>{
      alert("Something went wrong ...")
    })
  }

  gettingData(){
    this.myapi.getData().subscribe(res=>{
      this.EmployeeData = res;
      console.log("inside getting data")
    })
  }

  deletingData(employee:any){
    this.myapi.deleteData(employee.id).subscribe(res =>{
      alert("Data has been deleted...")
      this.gettingData();
    })
  }

  onEdit(employee:any){
    this.EmployeeModalObj.id = employee.id;
    this.registrationForm.controls['firstname'].setValue(employee.firstname);
    this.registrationForm.controls['lastname'].setValue(employee.lastname);
    this.registrationForm.controls['email'].setValue(employee.email);
    this.registrationForm.controls['mobile'].setValue(employee.mobile);
    this.registrationForm.controls['salary'].setValue(employee.salary);
  }

  updatingData(){
    this.EmployeeModalObj.firstname = this.registrationForm.value.firstname;
    this.EmployeeModalObj.lastname = this.registrationForm.value.lastname;
    this.EmployeeModalObj.email = this.registrationForm.value.email;
    this.EmployeeModalObj.mobile = this.registrationForm.value.mobile;
    this.EmployeeModalObj.salary = this.registrationForm.value.salary;

    this.myapi.updateData(this.EmployeeModalObj, this.EmployeeModalObj.id).subscribe( (res)=> {
      alert("Data updated successfully ...")
      this.gettingData();
    })
  }
}

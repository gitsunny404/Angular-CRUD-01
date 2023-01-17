# Angular-CRUD-01
This is the tutorial of crud operations in angular using API.


Steps :     Description
01          Create an angular application and run it

            ng new app  
            
            ng serve

02          Add Bootstrap to angular application
            npm install bootstrap
            For adding it to the application
            Go to angular.json
            in styles [] add : 
            
            node_modules/bootstrap/dist/css/bootstrap.min.css
            
            andin script [] : 
            
            node_modules/bootstrap/dist/js/bootstrap.min.js

03          create registration form and a table to view the data

04          Add ReactiveFormModule in app.module.ts

05          in form add [formGroup] = 'registrationForm'

06          add formControlName = "firstname" etc to each input field

07          add code for the form like

            registrationForm !: FormGroup;
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

08          Create a modal for the form taking data eg. 

            export class EmployeeModal{
                id : number = 0;
                firstname : string = '';
                lastname : string = '';
                email : string = '';
                mobile : string = '';
                salary : string = '';
            }

09          create api service by 

              ng g s api 
              
              & import HttpClient in it &            HttpClientModule in app.module.ts

10          install json-server via 

            npm i json-server

11          Run json-server by : 
  
            json-server --watch db.json 
            
            for running localhost:3000

12          constructor(private http : HttpClient) { }
            create post method to send data to json server
            url : string = "http://localhost:3000/employee";

            //POST
            postData(data : any){
                return this.http.post<any>(this.url, data)
            }

13          create a function to use this api in any component.ts with

            constructor(private formbuilder : FormBuilder, private myapi : ApiService){}

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

14          create get api
            getData(){
                return this.http.get<any>(this.url)
            }

15          use this get api in any component.ts

            gettingData(){
                this.myapi.getData().subscribe(res=>{
                this.EmployeeData = res;
                console.log("inside getting data")
                })
            }

            and data res is storing in 
            EmployeeModalObj : EmployeeModal = new EmployeeModal;
            EmployeeData : any = '';

16          Use *ngFor loop in html to get data from json-server to the html table

            <table class="table">
                <thead>
                <tr>
                    <th scope="col">Employee ID</th>
                    <th scope="col">First Name</th>
                    <th scope="col">Last Name</th>
                    <th scope="col">Email ID</th>
                    <th scope="col">Mobile No.</th>
                    <th scope="col">Salary</th>
                    <th scope="col">Action</th>
                </tr>
                </thead>

                <tbody>
                    <tr *ngFor="let employee of EmployeeData">
                        <td>{{employee.id}}</td>
                        <td>{{employee.firstname}}</td>
                        <td>{{employee.lastname}}</td>
                        <td>{{employee.email}}</td>
                        <td>{{employee.mobile}}</td>
                        <td>{{employee.salary}}</td>

                        <td class="d-flex" >
                        <div class="edit">
                            <button class="btn btn-success" (click)="onEdit(employee)">Edit</button>
                        </div>
                        <div class="update">
                            <button class="btn btn-info mx-3" (click)="updatingData()">Update</button>
                        </div>
                        <div class="delete">
                            <button class="btn btn-danger mx-3" (click) ="deletingData(employee)">Delete</button>
                        </div>
                        </td>
                     </tr>
                  </tbody>
            </table>

17          Create a delete api 

                        deleteData(id:any){
                return this.http.delete<any>("http://localhost:3000/employee/"+id)
            }

18          create a function to use delete api in any component

            deletingData(employee:any){
                this.myapi.deleteData(employee.id).subscribe(res =>{
                alert("Data has been deleted...")
                this.gettingData();
                })
            }
            add each button to (click)='given post/delete' operation

19          create a onEdit function to load the data feeded data from the json to the form for the update feature


                onEdit(employee:any){
                this.EmployeeModalObj.id = employee.id;
                this.registrationForm.controls['firstname'].setValue(employee.firstname);
                this.registrationForm.controls['lastname'].setValue(employee.lastname);
                this.registrationForm.controls['email'].setValue(employee.email);
                this.registrationForm.controls['mobile'].setValue(employee.mobile);
                this.registrationForm.controls['salary'].setValue(employee.salary);
            }

20            create an update api 

                updateData(employee:any, id:number){
                    return this.http.put<any>("http://localhost:3000/employee/"+id, employee);
                }

21          create update function to use update api
            -like post data use 
            
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


DONE : @Author : Sunny Kumar 
        Github : gitsunny404

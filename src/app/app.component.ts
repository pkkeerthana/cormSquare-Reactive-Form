import { Component, OnInit } from '@angular/core';
import { FormControl,FormGroup,FormBuilder, FormArray} from '@angular/forms';
import { ApiService } from './services/api.services';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  
  name = 'Angular';
  jobForm:FormGroup;
  skills:FormArray;
  experience:string;
  showYrs:boolean = false;
  countries:any;
  state:any;
  city:any;
  showpopup:boolean = false;
  constructor(private fb: FormBuilder,
              private apiservice: ApiService) { }

  ngOnInit() {
  
    this.jobForm = this.fb.group({
        name:[''],
        email:[''],
        address:[''],
        country:[''],
        state:[{ value:'', disabled:true }],
        city:[{ value:'', disabled:true }],
        location: this.fb.group({
          blr:[''],
          chennai:[''],
          mumbai:[''],
          delhi:['']
        }),
        experience:[''],
        years:[''],
        skills:this.fb.array([])
    })

    this.apiservice.getCountries().subscribe( resdata =>{
      this.countries = resdata;
      console.log(this.countries);
    })

  }

  getState(e){
    console.log(e.value);
    this.jobForm.controls['state'].enable();
    this.apiservice.getState(e.value).subscribe( resdata => {
      this.state = resdata;
    })
   
  }

  getcity(e){
    this.jobForm.controls['city'].enable();
    this.apiservice.getCity(e.value).subscribe( resdata => {
      this.city = resdata;
    })
  }

  createGroup(): FormGroup {
    return this.fb.group({
      skillname:[''],
      description:[''],
      level:['']
    })
  }

  createArray(){
    this.skills = this.jobForm.get('skills') as FormArray;
    this.skills.push(this.createGroup());
  }

  onSubmit(){
    this.showpopup = true;
  }

  saveForm(){
    this.showpopup = false;
    console.log(this.jobForm.value);
  }

  back(){
    this.showpopup = false;
  }

  setExperience(val){
    if(val == 'true'){
      this.showYrs = true;
    } else{
      this.showYrs = false;
    }
  }
}


import { LineupgeneratorService } from './lineupgenerator.service';

import {Component, NgModule} from '@angular/core'
import {BrowserModule} from '@angular/platform-browser'
import { FormBuilder, FormGroup,FormControl, Validators, FormArray } from '@angular/forms';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Position } from './Position';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./skeleton.css', './normalize.css','./custom.css'],
  providers: [LineupgeneratorService]
})


export class AppComponent {
  constructor(private fb: FormBuilder,private _lineupgenService: LineupgeneratorService) {}
  name:string;
  userForm: FormGroup;
  fields: any;


    positions = [
     new Position('QB' ),
     new Position('RB' ),
     new Position('WR' ),
     new Position('TE'),
     new Position('D'),
     new Position('K')
    ];

  ngOnInit() {
    this.fields = {
     type:{
        options: [
          {
            pos: 'QB',
            name: '',
	    salary:'',
	    average:''
          },
          {
            pos: 'RB',
            name: '',
	    salary:'',
	    average:''
          },
          {
            pos: 'RB',
            name: '',
	    salary:'',
	    average:''
          },
          {
            pos: 'WR',
            name: '',
	    salary:'',
	    average:''
          },
          {
            pos: 'WR',
            name: '',
	    salary:'',
	    average:''
          },
          {
            pos: 'WR',
            name: '',
	    salary:'',
	    average:''
          },
          {
            pos: 'TE',
            name: '',
	    salary:'',
	    average:''
          },
          {
            pos: 'D',
            name: '',
	    salary:'',
	    average:''
          },
          {
            pos: 'K',
            name: '',
	    salary:'',
	    average:''
          }
        ]
      }
    };
    this.userForm = this.fb.group({
      type: this.fb.group({
        options: this.fb.array([])   
      })
    });
    this.patch()
  }
  
  res:any;
  submit(value) {  
 
   this._lineupgenService.generator(value).subscribe(data => this.downloadFile(data)),//console.log(data),
                error => console.log('Error downloading the file.'),
                () => console.info('OK');
  }

  downloadFile(data: any) {
    let parsedResponse = data.text();
    let blob = new Blob([parsedResponse], { type: 'text/csv' });
    let url = window.URL.createObjectURL(blob);

    if(navigator.msSaveOrOpenBlob) {
        navigator.msSaveBlob(blob, 'lineups.csv');
    } else {
        let a = document.createElement('a');
        a.href = url;
        a.download = 'lineups.csv';
        document.body.appendChild(a);
        a.click();        
        document.body.removeChild(a);
    }	
    window.URL.revokeObjectURL(url);
	}


	newRow() {
	    return this.fb.group({
		      pos: 'QB',
		      name: '',
		      salary: '',
		      average:''
	    });
	}

	addNewRow() {
		//console.log(<FormArray>this.userForm.controls['options']);
	    var count = (<FormArray>this.userForm.get('type').get('options')).length;
	    if(count>16){return;}
	    const control = <FormArray>this.userForm.get('type').get('options');
	    control.push(this.newRow());
	}



  patch() {
	console.log(<FormArray>this.userForm.get('type').get('options'));
    	const control = <FormArray>this.userForm.get('type').get('options');

    this.fields.type.options.forEach(x => {
      control.push(this.patchValues(x.pos, x.name, x.salary, x.average))
    })
  }
  
  patchValues(pos, name, salary, average) {
    return this.fb.group({
      pos: [pos],
      name: [name],
      salary: [salary],
      average:[average]
    })    
  }

}

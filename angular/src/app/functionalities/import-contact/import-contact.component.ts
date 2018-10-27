import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ImportContactsService } from '../../import-contacts.service';


@Component({
  selector: 'app-import-contact',
  templateUrl: './import-contact.component.html',
  styleUrls: ['./import-contact.component.css']
})
export class ImportContactComponent implements OnInit {

  contacts:FormControl;
  importform:FormGroup;
  unique_emails_counter:any=0;  
  selected_file:File=null;
  constructor(private import_contact_service:ImportContactsService) { }

  ngOnInit() {

    this.importform = new FormGroup({
      'contacts' : new FormControl(null,[Validators.required])
    }); 
  }

  uploadcontacts()
  {
    this.import_contact_service.import_contacts(
    this.selected_file).subscribe(
      (res:Response)=>
      { 
            this.unique_emails_counter=res;
            this.importform.reset();
            document.getElementById('modal_toggle').click();
      },  
      (err:Error)=>
      { 
        console.log(err)   
      }
    );  
  }
  
  selectedfile(event)
  {
   this.selected_file=event.target.files[0];
  }

  
}

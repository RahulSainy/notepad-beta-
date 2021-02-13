import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthUserComponent } from '../auth-user/auth-user.component';
import { NoteService } from '../note.service';
import { Notes } from '../notes.model';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  loadedNotes = [];
  isFetching = false;
  notepadForm = new FormGroup({});

  
  constructor(
    private noteservice: NoteService,
   ) { }

    get title() {
      return this.notepadForm.get('title');
    }
    get notes() {
      return this.notepadForm.get('notes');
    }

  ngOnInit(): void {
    this.isFetching = true;
    this.noteservice.fetchPost().subscribe(notes=>{
      this.isFetching = false;
      this.loadedNotes = notes;
    });
    this.notepadForm = new FormGroup({
      title: new FormControl(null, [Validators.required]),
      notes: new FormControl(null, Validators.required),
    });

  }
  onCreatePost(notesData: Notes) {
    //send http request
   this.noteservice.createAndStoreUser(notesData.title, notesData.notes);
   this.notepadForm.reset()
  }

  onfetchnotes() {
    // Send Http request
    this.isFetching = true;
    this.noteservice.fetchPost().subscribe(notes=>{
      this.isFetching = false;
      this.loadedNotes = notes;
      // popUp = true;
    });
    console.log();
  }
  onClearNotes(){
    // send Http request
    this.noteservice.deleteNotes().subscribe(()=> {

    })
  }
  


}

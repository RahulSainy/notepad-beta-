import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NoteService } from '../note.service';
import { Notes } from '../notes.model';

@Component({
  selector: 'app-display',
  templateUrl: './display.component.html',
  styleUrls: ['./display.component.css'],
  providers: [NoteService] 
})
export class DisplayComponent implements OnInit {

  loadedNotes = [];
  isFetching = false;
  notepadForm = new FormGroup({});
  
  constructor(private http: HttpClient,
    private noteservice: NoteService) { }

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
      console.log(notes);
      console.log(this.loadedNotes)
    });
    this.notepadForm = new FormGroup({
      title: new FormControl(null, [Validators.required]),
      notes: new FormControl(null, Validators.required),
    });
  }
  onCreatePost(notesData: Notes) {
    //send http request
   this.noteservice.createAndStoreUser(notesData.title, notesData.notes);
  }

  onfetchnotes() {
    // Send Http request
    this.isFetching = true;
    this.noteservice.fetchPost().subscribe(notes=>{
      this.isFetching = false;
      this.loadedNotes = notes;
    });
  }
  onClearNotes(){
    // send Http request
    this.noteservice.deleteNotes().subscribe(()=> {

    })
  }

}

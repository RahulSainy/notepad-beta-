import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { Notes } from './notes.model';

@Injectable({
  providedIn: 'root'
})
export class NoteService {

  constructor(private http: HttpClient) {}




createAndStoreUser(title: string, notes: string){
      const notesData : Notes = {title: title, notes: notes}
//send http request
this.http.post<{title:string, notes: string}>('https://note-pad-live-contact.firebaseio.com/notesData.json', notesData).subscribe(resposeData=>{
  console.log(notesData);
});
  }
  fetchPost(){
   return this.http
      .get<{ [key: string]: Notes }>(
        'https://note-pad-live-contact.firebaseio.com/notesData.json'
      )
      .pipe(
        map((responseData) => {
          const notesArray: Notes[] = [];
          for (const key in responseData) {
            if (responseData.hasOwnProperty(key)) {
              notesArray.push({ ...responseData[key], id: key });
            }
          }
          return notesArray;
          console.log(notesArray);
        })
      )
}

deleteNotes(){
  return this.http.delete('https://note-pad-live-contact.firebaseio.com/notesData.json')
}

}
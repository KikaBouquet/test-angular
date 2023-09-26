import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root',
})
export class FileService {
  constructor() {}

  getFileExtension(fileName: string) {
    const extention = fileName.substring(fileName.lastIndexOf('.') + 1);
    return extention;
  }

  readTextFile(file: File) {
    return new Observable((obs) => {
      const reader = new FileReader();
      reader.onload = () => {
        obs.next(reader.result as string);
        obs.complete();
      };
      reader.readAsText(file);
    });
  }
}

import { Component, inject } from '@angular/core';
import { isValueInEnum } from './enums/sensor-type.enum';
import { Station, StationMeasurement } from './models/station.model';
import { FileService } from './services/file.service';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  fileText: string;
  stationList: Station[];

  private fileService = inject(FileService);

  onFileUpload(event: any) {
    const element = event.currentTarget as HTMLInputElement;
    const file: File | null = element.files[0];
    if (file) {
      const fileExtention = this.fileService.getFileExtension(file.name);
      if (fileExtention === 'txt') {
        this.fileService.readTextFile(file).subscribe((data: string) => {
          this.stationList = this.mapFileContentIntoStation(data);
        });
      } else {
        console.error('The file extension is not valid.');
      }
    } else {
      console.error('A problem occured with this file.');
    }
  }

  mapFileContentIntoStation(fileContent: string) {
    let stationList: Station[] = [];
    let content = fileContent.replace(/^#.*\n?/gm, '');

    let contentList = content.split('\r\n');
    let station;

    contentList.forEach((line) => {
      if (line.length > 0) {
        const lineSplited = line.split(',');
        if (isValueInEnum(lineSplited[0])) {
          switch (lineSplited[0]) {
            case 'T':
              station.measurements.push(
                new StationMeasurement(
                  lineSplited[0],
                  +lineSplited[2],
                  lineSplited[1]
                )
              );
              break;
            case 'P':
              station.measurements.push(
                new StationMeasurement(
                  lineSplited[0],
                  +lineSplited[3],
                  lineSplited[1],
                  lineSplited[2]
                )
              );
              break;
            case 'H':
              station.measurements.push(
                new StationMeasurement(lineSplited[0], +lineSplited[1])
              );
              break;
            default:
              break;
          }
        } else {
          if (station) {
            stationList.push(station);
          }
          station = new Station();
          station.name = lineSplited[0];
          station.nbOfMeasurement = +lineSplited[1];
        }
      }
    });
    stationList.push(station);
    return stationList;
  }
}

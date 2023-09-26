import { Component, inject } from '@angular/core';
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

  readonly MAX_TEMP = 50; //Record de 46° en 2019
  readonly MIN_TEMP_FR = -40; //Record de -36.7° en 1968
  readonly MAX_PRESS_FR = 1055; //1049,7 hPa (Pb BAR / hPa dans le doc ?)
  readonly MIN_PRESS_FR = 950; //947,10 hPa en 1821
  readonly MAX_H_FR;
  readonly MIN_H_FR;

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

    console.log(contentList);

    contentList.forEach((line) => {
      if (line.length > 0) {
        const lineSplited = line.split(',');

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
          case '' || null:
            console.error('There is an empty line in the file');
            break;
          default:
            if (station) {
              stationList.push(station);
            }

            station = new Station();
            station.name = lineSplited[0];
            station.nbOfMeasurement = +lineSplited[1];
            break;
        }
      }
    });
    stationList.push(station);
    return stationList;
  }
}

import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { SensorTypeEnum } from '../../enums/sensor-type.enum';
import { Station } from '../../models/station.model';

@Component({
  standalone: true,
  selector: 'station-result',
  imports: [CommonModule],
  templateUrl: './station-result.component.html',
  styleUrls: ['./station-result.component.css'],
})
export class StationResultComponent implements OnInit {
  @Input() stationList: Station[];

  ngOnInit() {
    console.log('coucou');
    if (this.stationList) {
      const measurements = this.stationList.reduce((acc, element) => {
        return acc.concat(element.measurements);
      }, []);

      let filteredMeasurement = [];
      for (let sensorType of Object.values(SensorTypeEnum)) {
        filteredMeasurement = measurements.filter(
          (element) => (element.sensorType = sensorType)
        );
      }

      console.log('filteredMeasurement', filteredMeasurement);
    }
  }
}

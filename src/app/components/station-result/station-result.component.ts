import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { getKeyByValue, SensorTypeEnum } from '../../enums/sensor-type.enum';
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
  errors = 0;
  calculatedResults = [];

  ngOnInit() {
    if (this.stationList && this.stationList.length > 0) {
      const measurements = this.stationList.reduce((acc, element) => {
        return acc.concat(element.measurements);
      }, []);

      let filteredMeasurement = [];
      for (let sensorType of Object.values(SensorTypeEnum)) {
        console.log(sensorType);
        filteredMeasurement.push(
          measurements.filter((element) => element.sensorType == sensorType)
        );
      }

      this.measurementResultsCalculation(filteredMeasurement);

      console.log('filteredMeasurement', filteredMeasurement);
    }
  }

  measurementResultsCalculation(measurements: any) {
    measurements.forEach((element) => {
      let sum = 0;
      let max = null;
      let min = null;

      element.forEach((el) => {
        sum += el.value;
        max ? null : el.value;
        min ? null : el.value;

        el.value > max ? (max = el.value) : null;
        el.value < min ? (min = el.value) : null;
      });
      const aver = sum / element.length;

      this.calculatedResults.push({
        sensorType: getKeyByValue(element[0].sensorType),
        minimum: min,
        maximum: max,
        average: aver,
      });
    });
  }
}

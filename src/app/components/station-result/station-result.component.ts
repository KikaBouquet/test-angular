import { CommonModule } from '@angular/common';
import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
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
    if (this.stationList) {
      const measurements = this.stationList.reduce((acc, element) => {
        return acc.concat(element.measurements);
      }, []);

      console.log(measurements);
    }
  }
}

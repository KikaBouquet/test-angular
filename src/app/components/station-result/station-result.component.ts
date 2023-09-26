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
export class StationResultComponent implements OnInit, OnChanges {
  @Input() stationList: Station[];

  ngOnInit() {
    if (this.stationList) {
      console.log('coucou');
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.value && changes.stationList.firstChange) {
      // Si 'value' a changé pour la première fois,
      // vous pouvez lancer votre fonction ici.
      console.log('vc');
    }
  }
}

export class Station {
  name: string;
  nbOfMeasurement: number;
  measurements: StationMeasurement[] = [];
}

export class StationMeasurement {
  sensorType: string;
  value: number;
  unit?: string;
  date?: string;

  constructor(sensorType: string, value: number, unit?: string, date?: string) {
    this.sensorType = sensorType;
    this.unit = unit;
    this.value = value;
    this.date = date;
  }
}

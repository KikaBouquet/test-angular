import { SensorTypeEnum } from '../enums/sensor-type.enum';

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

//Peut être plus judicieux d'utiliser l'héritage ici
export class PressureMeasurement extends StationMeasurement {
  constructor(value: number, unit: string, date: string) {
    super(SensorTypeEnum['P'], value, unit, date);
  }
}

export class TemperatureMeasurement extends StationMeasurement {
  constructor(value: number, unit: string) {
    super(SensorTypeEnum['T'], value, unit);
  }
}

export class HumidityMeasurement extends StationMeasurement {
  constructor(value: number) {
    super(SensorTypeEnum['H'], value);
  }
}

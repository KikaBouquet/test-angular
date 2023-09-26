export enum SensorTypeEnum {
  Temperature = 'T',
  Humidite = 'H',
  Pression = 'P',
}

export function getKeyByValue(value: string): string | undefined {
  for (const key in SensorTypeEnum) {
    if (SensorTypeEnum[key] === value) {
      return key;
    }
  }
  return undefined;
}

export function isValueInEnum(valueToCheck: string): boolean {
  for (const key in SensorTypeEnum) {
    if (SensorTypeEnum[key] === valueToCheck) {
      return true;
    }
  }
  return false;
}

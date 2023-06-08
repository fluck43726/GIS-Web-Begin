export class CustomPoint {
  private _latitude: number | null = null;
  private _longitude: number | null = null;

  constructor(long?: number, lat?: number) {
    this._longitude = long ?? null;
    this._latitude = lat ?? null;
  }

  public set latitude(lat: number | null) {
    this._latitude = lat ?? null;
  }

  public get latitude() {
    return this._latitude;
  }

  public set longitude(long: number | null) {
    this._longitude = long ?? null;
  }

  public get longitude() {
    return this._longitude;
  }
}

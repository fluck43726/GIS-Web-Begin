export class CustomPoint {
  public latitude: number | null = null;
  public longitude: number | null = null;

  constructor(long?: number, lat?: number) {
    this.longitude = long ?? null;
    this.latitude = lat ?? null;
  }
}

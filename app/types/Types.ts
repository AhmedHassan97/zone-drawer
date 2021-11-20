export type PolygonObject = {
  path: Array<PathObject>;
  options: Object;
  name: String;
};

export type FormValues = {
  zone: string;
  color: string;
};

export type PathObject = {
  lat: number;
  lng: number;
};

export type LoginObject = {
  username: String;
  password: String;
};

export type LoginForm = {
  username: string;
  password: string;
};

export type Zone = {
  label: String;
  color: String;
  points: Array<PathObject>;
};

export type ExportedZone = {
  label: String;
  color: String;
  points: Array<PathObject>;
  _id: String;
};

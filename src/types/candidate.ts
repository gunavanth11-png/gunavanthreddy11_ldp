export type Status = "CLEAR" | "CONSIDER";

export interface Candidate {
  id: number;
  name: string;
  adjudication: string;
  status: Status;
  location: string;
  date: string;
}

export interface Column {
  id: string;
  label: string;
  width?: string;
}
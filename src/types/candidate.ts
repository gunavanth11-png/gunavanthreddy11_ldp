export type Status = "CLEAR" | "CONSIDER";

export interface Candidate {
  id: number;
  name: string;
  adjudication: string;
  status: Status;
  location: string;
  date: string;
}
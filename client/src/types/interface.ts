import { Status } from "./enum";

export interface IEmployee {
  id: string;
  name: string;
  status: Status;
  image: string;
}
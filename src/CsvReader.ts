import { promises as fs } from "fs";
import { IDataReader } from "./utils";

export class CsvReader implements IDataReader {
  public data: string[][] = [];
  constructor(
    private filename: string,
  ) { }

  public async read(): Promise<IDataReader> {
    const res = await fs.readFile(this.filename, { encoding: "utf-8" });
    this.data = res
      .split("\n")
      .map((rows: string) => rows.split(","));
    return this;
  }
}

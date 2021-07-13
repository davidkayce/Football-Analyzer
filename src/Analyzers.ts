
import { CsvReader } from "./CsvReader";
import { IAnalyzer, IDataReader, MatchData, parseDate, Winner } from "./utils";

export class MatchFormatter implements IAnalyzer {

  // Static methods are methods that can be run without a new instance of a class
  public static async fromCSV(file: string): MatchFormatter {
    return await new MatchFormatter(new CsvReader(file)).run();
  }

  constructor(
    public reader: IDataReader,
    public matches?: MatchData[],
  ) { }

  public async run(type?: string) {
    const reader = await this.reader.read();
    this.matches = reader.data.map(this.formatData);
    return this;
  }

  private formatData(row: string[]): MatchData {
    return [
      parseDate(row[0]),
      row[1],
      row[2],
      parseInt(row[3], 10),
      parseInt(row[4], 10),
      row[5] as Winner, // this is type assertion, conforming a value to match a type
      row[6],
    ];
  }
}

// tslint:disable-next-line: max-classes-per-file
export class WinsAnalyzer implements IAnalyzer {
  public wins: number = 0;
  public losses: number = 0;
  public draws: number = 0;
  public result: string = "";

  constructor(
    private team: string,
    private matches?: MatchData[],
  ) { }

  public run(type?: string): WinsAnalyzer {
    switch (type) {
      case "losses":
        if (this.matches) {
          let tempLosses = 0;
          for (const match of this.matches) {
            if (match[1] === this.team && match[5] === Winner.away) {
              tempLosses++;
            } else if (match[2] === this.team && match[5] === Winner.home) {
              tempLosses++;
            }
          }
          this.losses = tempLosses;
          this.result = `${this.team} lost ${this.losses} matches this season`;
        }
        return this;
      case "draws":
        if (this.matches) {
          let tempDraws = 0;
          for (const match of this.matches) {
            if (match[1] === this.team && match[5] === Winner.draw) {
              tempDraws++;
            } else if (match[2] === this.team && match[5] === Winner.draw) {
              tempDraws++;
            }
          }
          this.draws = tempDraws;
          this.result = `${this.team} has ${this.draws} matches ending with a draw`;
        }
        return this;
      default:
        if (this.matches) {
          let tempWins = 0;
          for (const match of this.matches) {
            if (match[1] === this.team && match[5] === Winner.home) {
              tempWins++;
            } else if (match[2] === this.team && match[5] === Winner.away) {
              tempWins++;
            }
          }
          this.wins = tempWins;
          this.result = `${this.team} won ${this.wins} matches this season`;
        }
        return this;
    }
  }
}

// tslint:disable-next-line: max-classes-per-file
export class GoalsAnalyzer implements IAnalyzer {
  public goalsFor: number = 0;
  public goalsAgainst: number = 0;
  public goalDiff: number = 0;

  constructor(
    private team?: string,
    private matches?: MatchData[],
  ) { }

  public run(type?: string): GoalsAnalyzer {
    return this;
  }
}

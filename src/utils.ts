export interface IDataReader {
  data: string[][];
  read: () => Promise<IDataReader> ;
}

export interface IAnalyzer {
  result?: string;
  run: (type?: string) => Promise<IAnalyzer> | IAnalyzer;
}

export interface IOutputTarget {
  print: (report: string) => void;
}

export interface ISummary {
  analyzer: IAnalyzer;
  output: IOutputTarget;
  create: (property: string) => ISummary
}

// Enums and Tuples
// Enums help in documenting your code for other developers to know the options
// for a particular variable or value. It gives data context.
// Note you can only use this when you KNOW ALL POSSIBLE OPITONS
export enum Winner {
  home = "H",
  away = "A",
  draw = "D",
}

// Using a tuple to define the data we expect
// like an enum this is mainly for documenting and helping other devs and can only be used
// when you know the exact shape of the data
// Data structure: 10/08/2018,Man United,Leicester,2,1,H,A Marriner (date, hometeam, awayteam,
// homescore, awayscore, winner, referee)
export type MatchData = [Date, string, string, number, number, Winner, string];

export const parseDate = (date: string): Date => {
  const dateParts = date.split("/").map((value: string) => parseInt(value, 10));
  return new Date(dateParts[2], dateParts[1] - 1, dateParts[0]);
};

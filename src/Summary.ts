import { IAnalyzer, IOutputTarget, ISummary } from "./utils";

export default class MatchSummary implements ISummary {
  constructor(
    public analyzer: IAnalyzer,
    public output: IOutputTarget,
  ) { }

  public create(property: string): MatchSummary {
    const output = this.analyzer.run(property);
    this.output.print(output.result || "No data found");
    return this;
  }
}

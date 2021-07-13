import { MatchFormatter} from "./Analyzers";
import { WinsAnalyzer } from "./Analyzers";
import { ConsoleReport, HTMLReport } from "./Reporters";
import Summary from "./Summary";

async function x() {
  const formatted = await MatchFormatter.fromCSV("football.csv");
  const matchSummary = new Summary(new WinsAnalyzer ("Liverpool", formatted.matches), new HTMLReport());
  matchSummary.create("losses");
}

x();

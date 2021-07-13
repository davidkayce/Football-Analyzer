import { promises as fs } from "fs";
import { IOutputTarget } from "./utils";

export class ConsoleReport implements IOutputTarget {
  public print(report: string): void {
    console.log(report);
  }
}

// tslint:disable-next-line: max-classes-per-file
export class HTMLReport implements IOutputTarget {
  public print(report: string): void {
    const html = `
      <div>
        <h1>Analysis Output</h1>
        <div>${report}</div>
      </div>
    `;

    fs.writeFile("report.html", html)
      .then((res) => console.log("HTML Report Generated", res))
      .catch((error) => console.log("Error while generating HTML Report", error));
  }
}

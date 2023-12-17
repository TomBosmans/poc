import { pino } from "pino";
import { highlight } from "cli-highlight";
import { format } from "sql-formatter";

class Logger {
  private pino: ReturnType<typeof pino>;

  constructor() {
    this.pino = pino({
      transport: {
        target: "pino-pretty",
        options: {
          colorize: true,
        },
      },
    });
  }

  public log(message: unknown) {
    console.log(message);
  }

  public info(message: unknown) {
    console.info(message);
  }

  public error(message: unknown) {
    console.info(message);
  }

  public sql(sql: string, params: string[], duration: number) {
    this.pino.info(`
${highlight(
  format(sql, {
    language: "postgresql",
    params,
  }),
  { language: "sql" },
)}

Duration: ${duration}ms
    `)
  }
}

const logger = new Logger();
export default logger;

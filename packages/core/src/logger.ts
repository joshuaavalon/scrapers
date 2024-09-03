import { pino } from "pino";
import pinoStd from "pino-std-serializers";

import type { LevelWithSilentOrString, Logger } from "pino";
import type { SerializedError } from "pino-std-serializers";

const filterError = function (error: SerializedError): SerializedError {
  const { type, message, stack, cause } = error;
  return { type, message, stack, cause: cause ? filterError(cause) : undefined } as SerializedError;
};

const errorSerializer = pinoStd.wrapErrorSerializer(err => filterError(pinoStd.errWithCause(err.raw)));

export function createLogger(level?: LevelWithSilentOrString): Logger {
  return pino({
    level,
    redact: ["err.screenshot"],
    transport: {
      target: "pino-pretty",
      options: { colorize: true }
    },
    serializers: { err: errorSerializer }
  });
}

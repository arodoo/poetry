/*
 * File: PgCommandRunner.java
 * Purpose: Utility class that executes PostgreSQL CLI commands
 * (initdb, pg_ctl, createdb) by resolving their full path under
 * the portable PostgreSQL binary directory.
 * All Rights Reserved. Arodi Emmanuel
 */

package poetry.desktop;

import java.io.IOException;
import java.nio.file.Path;

public final class PgCommandRunner {

  private PgCommandRunner() {}

  static void run(Path bin, String... cmd) {
    try {
      cmd[0] = bin.resolve(cmd[0] + ".exe").toString();
      process(cmd).start().waitFor();
    } catch (IOException | InterruptedException e) {
      throw new RuntimeException("PG cmd failed", e);
    }
  }

  static Process runBackground(Path bin, String... cmd) {
    try {
      cmd[0] = bin.resolve(cmd[0] + ".exe").toString();
      return process(cmd).start();
    } catch (IOException e) {
      throw new RuntimeException("PG start failed", e);
    }
  }

  static int runSafe(Path bin, String... cmd) {
    try {
      cmd[0] = bin.resolve(cmd[0] + ".exe").toString();
      return process(cmd).start().waitFor();
    } catch (IOException | InterruptedException e) {
      return -1;
    }
  }

  private static ProcessBuilder process(String... cmd)
    throws IOException {
    ProcessBuilder pb = new ProcessBuilder(cmd);
    pb.redirectErrorStream(true);
    pb.redirectOutput(
      ProcessBuilder.Redirect.appendTo(
        DesktopLog.file("postgres.log")
      )
    );
    return pb;
  }
}

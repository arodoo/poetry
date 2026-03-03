/*
 * File: EmbeddedPostgres.java
 * Purpose: Manages the bundled portable PostgreSQL lifecycle:
 * init, start, create DB. Binaries are in the install dir,
 * data lives in LOCALAPPDATA/Poetry/pgdata.
 * All Rights Reserved. Arodi Emmanuel
 */

package poetry.desktop;

import java.nio.file.Files;
import java.nio.file.Path;

public final class EmbeddedPostgres {

  static final int PORT = 5433;
  private static final String DB = "poetry";

  private EmbeddedPostgres() {}

  public static int start(Path appDir, Path dataDir) {
    Path bin = appDir.resolve("pgsql/bin");
    Path pgData = dataDir.resolve("pgdata");
    if (!Files.exists(bin.resolve("pg_ctl.exe"))) {
      throw new IllegalStateException(
        "PG binaries missing: " + bin);
    }
    initIfNeeded(bin, pgData);
    startServer(bin, pgData);
    createDbIfNeeded(bin);
    return PORT;
  }

  private static void initIfNeeded(Path b, Path d) {
    if (Files.exists(d.resolve("PG_VERSION"))) return;
    System.out.println("[Poetry] Initializing DB...");
    PgCommandRunner.run(b, "initdb", "-D",
      d.toString(), "-U", "poetry", "-A", "trust");
  }

  private static void startServer(Path b, Path d) {
    System.out.println("[Poetry] Starting PostgreSQL...");
    PgCommandRunner.runBackground(b, "pg_ctl", "start",
      "-D", d.toString(), "-o", "-p " + PORT,
      "-w", "-t", "30");
    Runtime.getRuntime().addShutdownHook(new Thread(() ->
      PgCommandRunner.run(b, "pg_ctl", "stop",
        "-D", d.toString(), "-m", "fast")
    ));
  }

  private static void createDbIfNeeded(Path b) {
    int c = PgCommandRunner.runSafe(b, "createdb",
      "-p", String.valueOf(PORT), "-U", "poetry", DB);
    if (c != 0) {
      System.out.println("[Poetry] DB may exist already");
    }
  }
}

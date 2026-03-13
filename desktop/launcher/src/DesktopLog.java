/*
 * File: DesktopLog.java
 * Purpose: Configures file logging for the desktop launcher and
 * provides shared log files for child processes started by the
 * launcher runtime.
 * All Rights Reserved. Arodi Emmanuel
 */

package poetry.desktop;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.PrintStream;
import java.nio.charset.StandardCharsets;
import java.nio.file.Files;
import java.nio.file.Path;
import java.time.Instant;

public final class DesktopLog {

  private DesktopLog() {}

  public static Path setup(Path dataDir) throws IOException {
    Path dir = resolveDir(dataDir);
    Path file = dir.resolve("launcher.log");
    PrintStream stream = new PrintStream(
      new FileOutputStream(file.toFile(), true),
      true,
      StandardCharsets.UTF_8
    );
    System.setOut(stream);
    System.setErr(stream);
    Thread.setDefaultUncaughtExceptionHandler(
      (thread, error) -> error.printStackTrace()
    );
    System.out.println("---- " + Instant.now() + " ----");
    return file;
  }

  public static File file(String name) throws IOException {
    return resolveDir(null).resolve(name).toFile();
  }

  private static Path resolveDir(Path dataDir) throws IOException {
    String configured = System.getProperty("poetry.log.dir", "");
    Path dir = configured.isBlank()
      ? dataDir.resolve("logs")
      : Path.of(configured);
    Files.createDirectories(dir);
    System.setProperty("poetry.log.dir", dir.toString());
    return dir;
  }
}
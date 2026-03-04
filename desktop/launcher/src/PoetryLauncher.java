/*
 * File: PoetryLauncher.java
 * Purpose: Main entry point for the Poetry desktop app. Starts
 * bundled Postgres, Spring Boot backend, and opens the browser.
 * RTE drivers are handled by the installer, not at runtime.
 * All Rights Reserved. Arodi Emmanuel
 */

package poetry.desktop;

import java.io.File;
import java.nio.file.Path;
import java.nio.file.Paths;

public final class PoetryLauncher {

  private PoetryLauncher() {}

  public static void main(String[] args) throws Exception {
    Path appDir = resolveAppDir();
    Path dataDir = resolveDataDir();
    System.out.println("[Poetry] App:  " + appDir);
    System.out.println("[Poetry] Data: " + dataDir);

    int pgPort = EmbeddedPostgres.start(appDir, dataDir);
    String jar = findJar(appDir, "poetry-backend");
    String statics = appDir.resolve("static").toString();
    new BackendRunner(jar, pgPort, statics).start();
    BackendProbe.waitReady(30);
    BrowserOpener.open("http://localhost:8080");
    TrayManager.install(dataDir);
  }

  private static Path resolveAppDir() {
    String home = System.getProperty(
      "poetry.home", System.getProperty("user.dir"));
    return Paths.get(home);
  }

  private static Path resolveDataDir() {
    String ad = System.getenv("LOCALAPPDATA");
    if (ad == null) ad = System.getProperty("user.home");
    Path dir = Paths.get(ad, "Poetry");
    dir.toFile().mkdirs();
    return dir;
  }

  static String findJar(Path dir, String prefix) {
    File[] f = dir.toFile().listFiles(
      (d, n) -> n.startsWith(prefix) && n.endsWith(".jar")
    );
    if (f == null || f.length == 0) {
      throw new IllegalStateException("JAR not found");
    }
    return f[0].getAbsolutePath();
  }
}

/*
 * File: BackendRunner.java
 * Purpose: Starts the Spring Boot backend as a child process
 * with desktop profile, embedded PG connection, and static
 * file serving for the frontend SPA. Uses the bundled JRE
 * so no system Java installation is required.
 * All Rights Reserved Arodi Emmanuel
 */

package poetry.desktop;

import java.io.IOException;
import java.nio.file.Path;
import java.util.ArrayList;
import java.util.List;

public final class BackendRunner {

  private final String jar;
  private final int pgPort;
  private final String staticDir;
  private final String javaExe;
  private Process process;

  BackendRunner(String jar, int pgPort, String staticDir) {
    this.jar = jar;
    this.pgPort = pgPort;
    this.staticDir = staticDir;
    this.javaExe = resolveJava();
  }

  void start() throws IOException {
    List<String> cmd = new ArrayList<>();
    cmd.add(javaExe);
    cmd.add("-Xmx512m");
    cmd.add("-jar");
    cmd.add(jar);
    cmd.add("--server.port=8080");
    cmd.add("--db.host=localhost");
    cmd.add("--db.port=" + pgPort);
    cmd.add("--db.name=poetry");
    cmd.add("--spring.web.resources.static-locations="
      + "file:" + staticDir + "/");
    cmd.add("--spring.profiles.active=desktop");
    ProcessBuilder pb = new ProcessBuilder(cmd);
    pb.inheritIO();
    pb.environment().put("DB_USERNAME", "poetry");
    pb.environment().put("DB_PASSWORD", "poetry_desktop");
    process = pb.start();
    Runtime.getRuntime().addShutdownHook(
      new Thread(this::stop)
    );
  }

  void stop() {
    if (process != null && process.isAlive()) {
      process.destroy();
    }
  }

  private static String resolveJava() {
    String home = System.getProperty("poetry.home", "");
    Path bundled = Path.of(home, "jre", "bin", "java.exe");
    if (bundled.toFile().exists()) return bundled.toString();
    return "java";
  }
}

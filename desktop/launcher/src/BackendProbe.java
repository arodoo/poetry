/*
 * File: BackendProbe.java
 * Purpose: Blocks until the Spring Boot backend responds with HTTP
 * 200 on the health endpoint, or throws if the timeout is exceeded.
 * Prevents the browser from opening before the app is ready.
 * All Rights Reserved Arodi Emmanuel
 */
package poetry.desktop;

import java.net.HttpURLConnection;
import java.net.URL;

public final class BackendProbe {

  private static final String HEALTH =
    "http://localhost:8080/api/v1/health";
  private static final int INTERVAL_MS = 500;

  private BackendProbe() {}

  public static void waitReady(int maxSeconds) throws Exception {
    int attempts = (maxSeconds * 1000) / INTERVAL_MS;
    for (int i = 0; i < attempts; i++) {
      if (ping()) {
        System.out.println("[Poetry] Backend ready");
        return;
      }
      Thread.sleep(INTERVAL_MS);
    }
    throw new IllegalStateException(
      "[Poetry] Backend did not start in " + maxSeconds + "s"
    );
  }

  private static boolean ping() {
    try {
      HttpURLConnection c =
        (HttpURLConnection) new URL(HEALTH).openConnection();
      c.setConnectTimeout(400);
      c.setReadTimeout(400);
      c.setRequestMethod("GET");
      int code = c.getResponseCode();
      c.disconnect();
      return code == 200;
    } catch (Exception e) {
      return false;
    }
  }
}

/*
 * File: BrowserOpener.java
 * Purpose: Opens the default system browser to the Poetry web
 * interface URL. Handles Desktop API unavailability gracefully
 * by falling back to the Windows 'start' command.
 * All Rights Reserved. Arodi Emmanuel
 */

package poetry.desktop;

import java.awt.Desktop;
import java.io.IOException;
import java.net.URI;

public final class BrowserOpener {

  private BrowserOpener() {}

  public static void open(String url) {
    try {
      if (Desktop.isDesktopSupported()) {
        Desktop.getDesktop().browse(URI.create(url));
      } else {
        fallback(url);
      }
    } catch (IOException e) {
      fallback(url);
    }
  }

  private static void fallback(String url) {
    try {
      new ProcessBuilder("cmd", "/c", "start", url)
        .start();
    } catch (IOException e) {
      System.err.println(
        "[Poetry] Cannot open browser: " + e.getMessage()
      );
    }
  }
}

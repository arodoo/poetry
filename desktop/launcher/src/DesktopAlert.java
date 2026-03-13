/*
 * File: DesktopAlert.java
 * Purpose: Shows a user-facing startup error message when the
 * desktop launcher cannot finish booting and points the user to
 * the generated launcher log file.
 * All Rights Reserved. Arodi Emmanuel
 */

package poetry.desktop;

import java.nio.file.Path;
import javax.swing.JOptionPane;

public final class DesktopAlert {

  private DesktopAlert() {}

  public static void show(Path logFile, Exception error) {
    String message = "Poetry could not start.\n\n"
      + error.getMessage()
      + "\n\nLog: " + logFile;
    try {
      JOptionPane.showMessageDialog(
        null,
        message,
        "Poetry startup error",
        JOptionPane.ERROR_MESSAGE
      );
    } catch (RuntimeException ignored) {
      System.err.println("[Poetry] Alert failed");
    }
  }
}
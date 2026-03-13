/*
 * File: TrayManager.java
 * Purpose: Creates a Windows system tray icon with status and
 * exit controls. Keeps the JVM alive until the user quits via
 * the tray menu. Falls back to a daemon thread if no tray.
 * All Rights Reserved. Arodi Emmanuel
 */

package poetry.desktop;

import java.awt.*;
import java.nio.file.Path;
import javax.swing.ImageIcon;

public final class TrayManager {

  private TrayManager() {}

  public static void install(Path appDir) {
    if (!SystemTray.isSupported()) { keepAlive(); return; }
    try {
      Image icon = new ImageIcon(
        appDir.resolve("poetry.png").toString()
      ).getImage();
      if (icon.getWidth(null) < 1) {
        throw new IllegalStateException("Tray icon missing");
      }
      PopupMenu menu = new PopupMenu();
      MenuItem open = new MenuItem("Open Browser");
      open.addActionListener(e ->
        BrowserOpener.open("http://localhost:8080"));
      MenuItem exit = new MenuItem("Exit Poetry");
      exit.addActionListener(e -> System.exit(0));
      menu.add(open);
      menu.addSeparator();
      menu.add(exit);
      TrayIcon ti = new TrayIcon(icon, "Poetry", menu);
      ti.setImageAutoSize(true);
      SystemTray.getSystemTray().add(ti);
    } catch (AWTException | RuntimeException e) {
      System.err.println("[Poetry] Tray failed: "
        + e.getMessage());
    }
    keepAlive();
  }

  private static void keepAlive() {
    Thread t = new Thread(() -> {
      try { Thread.currentThread().join(); }
      catch (InterruptedException ignored) { /* exit */ }
    });
    t.setDaemon(false);
    t.start();
  }
}

/*
 * File: SpaForwardController.java
 * Purpose: Catch-all error handler active only in "desktop" profile.
 * When Spring Boot cannot find a matching controller or static
 * resource, this redirects to /index.html for SPA client routing.
 * All Rights Reserved. Arodi Emmanuel
 */

package com.poetry.poetry_backend.config.desktop;

import org.springframework.boot.web.servlet.error.ErrorController;
import org.springframework.context.annotation.Profile;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import jakarta.servlet.RequestDispatcher;
import jakarta.servlet.http.HttpServletRequest;

@Controller
@Profile("desktop")
public class SpaForwardController implements ErrorController {

  @RequestMapping("/error")
  public String handleError(HttpServletRequest req) {
    Object status = req.getAttribute(
      RequestDispatcher.ERROR_STATUS_CODE
    );
    if (status != null) {
      int code = Integer.parseInt(status.toString());
      if (code == HttpStatus.NOT_FOUND.value()) {
        return "forward:/index.html";
      }
    }
    return "forward:/index.html";
  }
}

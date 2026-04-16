/*
 * File: SpaForwardController.java
 * Purpose: Catch-all error handler for SPA routing.
 * Forwards unknown non-API routes to /index.html.
 * API paths keep their original error status.
 * All Rights Reserved. Arodi Emmanuel
 */

package com.poetry.poetry_backend.config.web;

import java.io.IOException;

import org.springframework.boot.web.servlet.error.ErrorController;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import jakarta.servlet.RequestDispatcher;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

@Controller
public class SpaForwardController implements ErrorController {

  @RequestMapping("/error")
  public String handleError(
      HttpServletRequest req,
      HttpServletResponse res) throws IOException {
    String uri = (String) req.getAttribute(
        RequestDispatcher.ERROR_REQUEST_URI);
    if (uri != null && uri.startsWith("/api/")) {
      Object code = req.getAttribute(
          RequestDispatcher.ERROR_STATUS_CODE);
      int status = code != null
          ? Integer.parseInt(code.toString())
          : HttpStatus.INTERNAL_SERVER_ERROR.value();
      res.sendError(status);
      return null;
    }
    res.setStatus(HttpStatus.OK.value());
    return "forward:/index.html";
  }
}

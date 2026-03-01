/*
 * File: WsBroadcaster.java
 * Purpose: Sends a JSON TextMessage to a set of open WebSocket sessions.
 * Isolated so the handler stays within the line limit per file rule.
 * All Rights Reserved. Arodi Emmanuel
 */
package com.poetry.poetry_backend.infrastructure.websocket;

import java.util.concurrent.CopyOnWriteArraySet;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;

@Component
public class WsBroadcaster {

    private static final Logger log =
            LoggerFactory.getLogger(WsBroadcaster.class);

    public void send(
            CopyOnWriteArraySet<WebSocketSession> sessions, String payload) {
        TextMessage msg = new TextMessage(payload);
        for (WebSocketSession s : sessions) {
            try {
                if (s.isOpen()) s.sendMessage(msg);
            } catch (Exception e) {
                log.warn("[WS] send failed session={}", s.getId(), e);
            }
        }
    }
}

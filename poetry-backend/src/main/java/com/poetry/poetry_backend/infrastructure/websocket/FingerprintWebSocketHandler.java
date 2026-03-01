/*
 * File: FingerprintWebSocketHandler.java
 * Purpose: Raw WebSocket handler for fingerprint event streaming.
 * Validates JWT on first text frame. Manages authenticated sessions
 * and implements FingerprintEventPort via WsBroadcaster.
 * All Rights Reserved. Arodi Emmanuel
 */
package com.poetry.poetry_backend.infrastructure.websocket;

import java.util.concurrent.CopyOnWriteArraySet;

import javax.crypto.SecretKey;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;
import org.springframework.web.socket.CloseStatus;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;
import org.springframework.web.socket.handler.TextWebSocketHandler;

import com.poetry.poetry_backend.application.fingerprint.port.FingerprintEventPort;
import com.poetry.poetry_backend.config.auth.support.AuthProperties;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;

@Component
public class FingerprintWebSocketHandler
        extends TextWebSocketHandler
        implements FingerprintEventPort {

    private static final Logger log =
            LoggerFactory.getLogger(FingerprintWebSocketHandler.class);
    private static final CloseStatus UNAUTHORIZED =
            new CloseStatus(4001, "Unauthorized");

    private final CopyOnWriteArraySet<WebSocketSession> sessions =
            new CopyOnWriteArraySet<>();
    private final WsBroadcaster broadcaster;
    private final SecretKey key;

    public FingerprintWebSocketHandler(
            AuthProperties props, WsBroadcaster broadcaster) {
        this.key = Keys.hmacShaKeyFor(props.getSecretKey().getBytes());
        this.broadcaster = broadcaster;
    }

    @Override
    protected void handleTextMessage(
            WebSocketSession session, TextMessage msg) throws Exception {
        String token = msg.getPayload().replace("Bearer ", "").strip();
        try {
            Jwts.parserBuilder().setSigningKey(key)
                    .build().parseClaimsJws(token);
            sessions.add(session);
            log.info("[WS] authenticated: {}", session.getId());
        } catch (Exception e) {
            log.warn("[WS] invalid token, closing: {}", session.getId());
            session.close(UNAUTHORIZED);
        }
    }

    @Override
    public void afterConnectionClosed(
            WebSocketSession session, CloseStatus status) {
        sessions.remove(session);
    }

    @Override
    public void broadcastMatch(long userId) {
        broadcaster.send(sessions,
                "{\"type\":\"MATCH\",\"userId\":" + userId + "}");
    }

    @Override
    public void broadcastUnknown() {
        broadcaster.send(sessions, "{\"type\":\"UNKNOWN\"}");
    }

    @Override
    public void broadcastError(String reason) {
        broadcaster.send(sessions,
                "{\"type\":\"ERROR\",\"reason\":\"" + reason + "\"}");
    }
}

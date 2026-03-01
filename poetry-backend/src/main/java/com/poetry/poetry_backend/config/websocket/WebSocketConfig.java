/*
 * File: WebSocketConfig.java
 * Purpose: Registers the fingerprint raw WebSocket handler at /ws/fingerprint.
 * No STOMP — raw WebSocket is sufficient for a one-way event push channel.
 * All Rights Reserved. Arodi Emmanuel
 */
package com.poetry.poetry_backend.config.websocket;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.socket.config.annotation.EnableWebSocket;
import org.springframework.web.socket.config.annotation.WebSocketConfigurer;
import org.springframework.web.socket.config.annotation.WebSocketHandlerRegistry;

import com.poetry.poetry_backend.infrastructure.websocket.FingerprintWebSocketHandler;

@Configuration
@EnableWebSocket
public class WebSocketConfig implements WebSocketConfigurer {

    private final FingerprintWebSocketHandler handler;

    public WebSocketConfig(FingerprintWebSocketHandler handler) {
        this.handler = handler;
    }

    @Override
    public void registerWebSocketHandlers(WebSocketHandlerRegistry registry) {
        registry.addHandler(handler, "/ws/fingerprint")
                .setAllowedOriginPatterns("*");
    }
}

// File: HardwareClient.java
// Purpose: Spring RestTemplate client for hardware service
// All Rights Reserved. Arodi Emmanuel

package com.poetry.infrastructure.hardware;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestTemplate;

@Component
public class HardwareClient {

    private final RestTemplate restTemplate;
    private final String baseUrl;

    public HardwareClient(
        RestTemplate restTemplate,
        @Value("${hardware.service.url}") String baseUrl
    ) {
        this.restTemplate = restTemplate;
        this.baseUrl = baseUrl;
    }

    public void activateRelayChannel(int channelId) {
        String url = baseUrl + "/api/relay/channel/" + channelId + "/on";
        restTemplate.postForEntity(url, null, Void.class);
    }

    public void deactivateRelayChannel(int channelId) {
        String url = baseUrl + "/api/relay/channel/" + channelId + "/off";
        restTemplate.postForEntity(url, null, Void.class);
    }

    public boolean isHealthy() {
        try {
            String url = baseUrl + "/health";
            restTemplate.getForEntity(url, String.class);
            return true;
        } catch (Exception e) {
            return false;
        }
    }
}

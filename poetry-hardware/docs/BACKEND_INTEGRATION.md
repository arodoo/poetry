# Backend Integration Guide

How to integrate `poetry-hardware` service with `poetry-backend`.

## Architecture

```
[poetry-backend] (Java/Spring)
       ↓ HTTP
[poetry-hardware] (Node.js/Express)
       ↓ Serial
[USB-TTL + Relay Board + R503]
```

## Setup

### 1. Start Hardware Service

```bash
cd poetry-hardware
npm run dev
# Runs on http://localhost:3001
```

### 2. Add Configuration to Backend

Add to `poetry-backend/src/main/resources/application.properties`:

```properties
hardware.service.url=http://localhost:3001
hardware.service.timeout.connect=5000
hardware.service.timeout.read=10000
```

### 3. Create Hardware Client (Java)

See `integration-examples/HardwareClient.java`

Key methods:

- `activateRelayChannel(channelId)`: Turn on relay
- `deactivateRelayChannel(channelId)`: Turn off relay
- `isHealthy()`: Check if hardware service is running

### 4. Register RestTemplate Bean

In `poetry-backend/src/main/java/.../config/`:

```java
@Configuration
public class HardwareConfig {

    @Bean
    public RestTemplate hardwareRestTemplate() {
        return new RestTemplate();
    }
}
```

### 5. Use in Your Use Cases

Example: Unlock door after successful authentication

```java
@Service
public class UnlockDoorUseCase {

    private final HardwareClient hardwareClient;

    public UnlockDoorUseCase(HardwareClient hardwareClient) {
        this.hardwareClient = hardwareClient;
    }

    public void execute(UserId userId) {
        // Validate permissions...

        // Open door (relay channel 1)
        hardwareClient.activateRelayChannel(1);

        // Auto-close after 5 seconds
        CompletableFuture.delayedExecutor(5, TimeUnit.SECONDS)
            .execute(() -> hardwareClient.deactivateRelayChannel(1));
    }
}
```

## API Reference

### Relay Control

**Activate Channel**

```
POST http://localhost:3001/api/relay/channel/:id/on
```

**Deactivate Channel**

```
POST http://localhost:3001/api/relay/channel/:id/off
```

**Get Status**

```
GET http://localhost:3001/api/relay/status

Response:
{
  "channels": [
    {"id": 1, "isActive": true, "lastToggled": "2025-11-11T..."},
    {"id": 2, "isActive": false, "lastToggled": "2025-11-11T..."},
    ...
  ]
}
```

### Health Check

```
GET http://localhost:3001/health

Response:
{
  "status": "ok",
  "mode": "mock" | "real"
}
```

## Error Handling

### Hardware Service Unavailable

```java
try {
    hardwareClient.activateRelayChannel(1);
} catch (ResourceAccessException e) {
    // Hardware service not running
    log.error("Hardware service unavailable", e);
    throw new HardwareException("hardware.service.unavailable");
}
```

### Invalid Channel

```java
// Backend validates channel (1-4) before calling
if (channelId < 1 || channelId > 4) {
    throw new IllegalArgumentException("relay.channel.invalid");
}
```

## Testing Strategy

### Unit Tests (Backend)

Mock `HardwareClient`:

```java
@Test
void shouldUnlockDoor() {
    HardwareClient mockClient = mock(HardwareClient.class);
    UnlockDoorUseCase useCase = new UnlockDoorUseCase(mockClient);

    useCase.execute(userId);

    verify(mockClient).activateRelayChannel(1);
}
```

### Integration Tests

1. Start hardware service in mock mode
2. Run backend tests
3. Verify HTTP calls via WireMock

### E2E Tests

1. Start hardware service in mock mode
2. Start backend
3. Test full flow: Login → Unlock door → Door opens

## Production Deployment

### Same Machine

Both services on same PC:

- Backend: `localhost:8080`
- Hardware: `localhost:3001`

### Separate Hardware PC

Backend connects to remote hardware service:

```properties
hardware.service.url=http://192.168.1.100:3001
```

**Security**: Add API key authentication (future enhancement)

## Monitoring

### Health Check Endpoint

Backend should periodically check:

```java
@Scheduled(fixedRate = 60000) // Every minute
public void checkHardwareHealth() {
    if (!hardwareClient.isHealthy()) {
        log.error("Hardware service health check failed");
        // Alert admins
    }
}
```

### Logs

- Hardware logs: `logs/hardware/hardware-dev.log`
- Backend logs: `logs/backend/backend-dev.log`

## Troubleshooting

**Issue**: `Connection refused`

- **Fix**: Ensure hardware service is running

**Issue**: Relay not responding

- **Fix**: Check `MOCK_MODE` in hardware `.env`

**Issue**: Slow response

- **Fix**: Increase timeout in backend config

## Next Steps

1. Implement `HardwareClient.java` in backend
2. Create use cases that need hardware (unlock, fingerprint verify)
3. Add health check scheduler
4. Test with mock hardware
5. When hardware arrives, switch to real mode
6. Add error handling and retries

/*
 * File: DashboardMetricsAdapter.java
 * Purpose: Infrastructure adapter that queries database tables directly using JdbcClient
 * to fetch aggregated system metrics for the charts dashboard.
 * All Rights Reserved. Arodi Emmanuel
 */

package com.poetry.poetry_backend.infrastructure.jpa.dashboard;

import java.util.HashMap;
import java.util.Map;

import org.springframework.jdbc.core.simple.JdbcClient;
import org.springframework.stereotype.Repository;

import com.poetry.poetry_backend.application.dashboard.dto.DashboardMetricsDto;
import com.poetry.poetry_backend.application.dashboard.port.DashboardMetricsQueryPort;

@Repository
public class DashboardMetricsAdapter implements DashboardMetricsQueryPort {

  private final JdbcClient jdbcClient;

  public DashboardMetricsAdapter(JdbcClient jdbcClient) {
    this.jdbcClient = jdbcClient;
  }

  @Override
  public DashboardMetricsDto getMetrics() {
    return new DashboardMetricsDto(
        fetchCounts("SELECT status, COUNT(*) as c FROM users GROUP BY status"),
        fetchCounts("SELECT to_char(enrolled_at, 'YYYY-MM') as month, COUNT(*) as c "
            + "FROM fingerprints WHERE enrolled_at > NOW() - INTERVAL '6 months' "
            + "GROUP BY month ORDER BY month"),
        fetchCounts("SELECT status, COUNT(*) as c FROM memberships GROUP BY status"),
        fetchCounts("SELECT event_type, COUNT(*) as c FROM auth_audit_events GROUP BY event_type"),
        fetchCounts("SELECT duration_days::text as d, COUNT(*) as c FROM subscriptions GROUP BY d"),
        fetchCounts("SELECT status, COUNT(*) as c FROM events GROUP BY status"),
        fetchCounts("SELECT status, COUNT(*) as c FROM seller_codes GROUP BY status"),
        fetchCounts("SELECT 'This Month' as m, COUNT(*) as c FROM user_demographics WHERE EXTRACT(MONTH FROM birth_date) = EXTRACT(MONTH FROM NOW()) GROUP BY m"),
        fetchCounts("SELECT EXTRACT(HOUR FROM created_at)::text as h, COUNT(*) as c FROM access_logs GROUP BY h"),
        fetchCounts("SELECT z.name, COUNT(umz.membership_id) as c FROM user_membership_zones umz JOIN zones z ON umz.zone_id = z.id GROUP BY z.name")
    );
  }

  private Map<String, Long> fetchCounts(String sql) {
    Map<String, Long> result = new HashMap<>();
    jdbcClient.sql(sql).query(rs -> {
      result.put(rs.getString(1), rs.getLong(2));
    });
    return result;
  }
}

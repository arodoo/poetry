/**
 * File: AdminDashboardPage.tsx
 * Purpose: Main admin dashboard page displaying business health
 * KPIs including membership statistics with color indicators.
 * All Rights Reserved. Arodi Emmanuel
 */

import { Container, Title, Text, Loader, Alert } from '@mantine/core';
import { IconAlertCircle } from '@tabler/icons-react';
import { useMembershipStatsQuery } from '../api/useStatsQueries';
import { KpiGrid } from '../components/KpiGrid';

export function AdminDashboardPage() {
  const { data: stats, isLoading, error } = useMembershipStatsQuery();

  if (isLoading) return <Loader />;
  if (error) {
    return (
      <Alert color="red" icon={<IconAlertCircle />}>
        Error loading stats
      </Alert>
    );
  }

  return (
    <Container size="lg" py="xl">
      <Title order={1} mb="lg">Dashboard Administrativo</Title>
      <Text c="dimmed" mb="xl">Estado de membresías</Text>
      {stats && <KpiGrid stats={stats} />}
    </Container>
  );
}

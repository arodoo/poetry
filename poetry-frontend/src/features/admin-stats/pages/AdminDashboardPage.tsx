/**
 * File: AdminDashboardPage.tsx
 * Purpose: Main admin dashboard page displaying business health
 * KPIs. Uses i18n keys for translations and SDK types for data.
 * All Rights Reserved. Arodi Emmanuel
 */

import { Container, Title, Text, Loader, Alert } from '@mantine/core';
import { IconAlertCircle } from '@tabler/icons-react';
import { useMembershipStatsQuery } from '../api/useStatsQueries';
import { KpiGrid } from '../components/KpiGrid';
import { useT } from '../../../shared/i18n/useT';

export function AdminDashboardPage() {
  const t = useT();
  const { data: stats, isLoading, error } = useMembershipStatsQuery();

  if (isLoading) return <Loader />;
  if (error) {
    return (
      <Alert color="red" icon={<IconAlertCircle />}>
        {t('ui.adminStats.error.loading')}
      </Alert>
    );
  }

  return (
    <Container size="lg" py="xl">
      <Title order={1} mb="lg">{t('ui.adminStats.title')}</Title>
      <Text c="dimmed" mb="xl">{t('ui.adminStats.subtitle')}</Text>
      {stats && <KpiGrid stats={stats} />}
    </Container>
  );
}

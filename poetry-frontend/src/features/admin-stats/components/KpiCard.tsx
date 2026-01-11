/**
 * File: KpiCard.tsx
 * Purpose: Displays a single KPI metric with value, label and
 * color indicator (green/yellow/red) for admin dashboard.
 * All Rights Reserved. Arodi Emmanuel
 */

import { Card, Text, Title } from '@mantine/core';

interface KpiCardProps {
  label: string;
  value: number;
  color?: 'green' | 'yellow' | 'red' | 'gray';
}

const colorMap = {
  green: 'teal.6',
  yellow: 'yellow.6',
  red: 'red.6',
  gray: 'gray.6',
};

export function KpiCard({ label, value, color = 'gray' }: KpiCardProps) {
  return (
    <Card shadow="sm" p="lg" radius="md" withBorder>
      <Title order={3} c={colorMap[color]}>{value}</Title>
      <Text size="sm" c="dimmed">{label}</Text>
    </Card>
  );
}

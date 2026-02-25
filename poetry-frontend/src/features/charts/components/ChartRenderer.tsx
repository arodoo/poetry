/*
 * File: ChartRenderer.tsx
 * Purpose: Dynamically renders the requested chart component for the details page.
 * All Rights Reserved. Arodi Emmanuel
 */
import type { ReactElement } from 'react';
import { useT } from '../../../shared/i18n/useT';
import { UsersByStatusChart } from './UsersByStatusChart';
import { FingerprintsOverTimeChart } from './FingerprintsOverTimeChart';
import { MembershipsByStatusChart } from './MembershipsByStatusChart';
import { EventsByTypeChart } from './EventsByTypeChart';
import { SubscriptionsByDurationChart } from './SubscriptionsByDurationChart';
import { ScheduledEventsByStatusChart } from './ScheduledEventsByStatusChart';
import { SellerCodesByStatusChart } from './SellerCodesByStatusChart';
import { BirthdaysThisMonthChart } from './BirthdaysThisMonthChart';
import { MostActiveHoursChart } from './MostActiveHoursChart';
import { MostPopulatedRegionsChart } from './MostPopulatedRegionsChart';

export function ChartRenderer({ chartId, data }: { chartId: string | undefined; data: any }): ReactElement | null {
    const t = useT();
    if (!data) return null;

    switch (chartId) {
        case 'usersByStatus': return <UsersByStatusChart data={data.usersByStatus} />;
        case 'birthdaysThisMonth': return <BirthdaysThisMonthChart data={data.birthdaysThisMonth} />;
        case 'activeHours': return <MostActiveHoursChart data={data.activeHours} />;
        case 'populatedRegions': return <MostPopulatedRegionsChart data={data.populatedRegions} />;
        case 'enrollmentsOverTime': return <FingerprintsOverTimeChart data={data.enrollmentsOverTime} />;
        case 'membershipsByStatus': return <MembershipsByStatusChart data={data.membershipsByStatus} />;
        case 'eventsByType': return <EventsByTypeChart data={data.eventsByType} />;
        case 'subscriptionsByDuration': return <SubscriptionsByDurationChart data={data.subscriptionsByDuration} />;
        case 'scheduledEventsByStatus': return <ScheduledEventsByStatusChart data={data.scheduledEventsByStatus} />;
        case 'sellerCodesByStatus': return <SellerCodesByStatusChart data={data.sellerCodesByStatus} />;
        default: return <div className="p-4">{t('ui.common.notFound')}</div>;
    }
}

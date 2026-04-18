/*
 * File: mostActiveHoursUtils.ts
 * Purpose: Data aggregation helpers for the active-hours chart.
 * Converts UTC hour buckets into the viewer's local 12h format and
 * computes Peak Hour / Busiest Day KPI labels respecting i18n.
 * All Rights Reserved. Arodi Emmanuel
 */

export interface HourPoint {
  name: string
  value: number
}

export function computeActiveHoursData(
  data: Record<string, number>,
  amLabel = 'AM',
  pmLabel = 'PM'
): HourPoint[] {
  const tzOffsetHours = Math.floor(new Date().getTimezoneOffset() / 60)
  const hoursMap = new Map<number, number>()
  for (let i = 0; i < 24; i++) hoursMap.set(i, 0)
  Object.entries(data).forEach(([hourStr, count]) => {
    const utcHour = parseInt(hourStr, 10)
    if (isNaN(utcHour)) return
    let localHour = (utcHour - tzOffsetHours) % 24
    if (localHour < 0) localHour += 24
    hoursMap.set(localHour, (hoursMap.get(localHour) ?? 0) + count)
  })
  const result: HourPoint[] = []
  for (let i = 0; i < 24; i++) {
    const ampm = i >= 12 ? pmLabel : amLabel
    const h12 = i % 12 === 0 ? 12 : i % 12
    result.push({
      name: `${String(h12)}:00 ${ampm}`,
      value: hoursMap.get(i) ?? 0,
    })
  }
  return result
}

export function computeActiveHoursKpis(
  chartData: HourPoint[],
  daysData: Record<string, number>,
  locale?: string
): { peakHourInfo: string; busiestDayInfo: string } {
  let peakVal = -1
  let peakName = '--'
  chartData.forEach((d) => {
    if (d.value > peakVal) {
      peakVal = d.value
      peakName = d.name
    }
  })
  let bDayVal = -1
  let bDayName = '--'
  Object.entries(daysData).forEach(([isoDayStr, count]) => {
    if (count <= bDayVal) return
    const iso = parseInt(isoDayStr, 10)
    if (isNaN(iso)) return
    bDayVal = count
    const d = new Date(2024, 0, iso)
    bDayName = new Intl.DateTimeFormat(locale ?? 'en', {
      weekday: 'long',
    }).format(d)
  })
  const capDay = bDayName.charAt(0).toUpperCase() + bDayName.slice(1)
  return {
    peakHourInfo: peakVal > 0 ? `${peakName} (${String(peakVal)})` : '--',
    busiestDayInfo: bDayVal > 0 ? `${capDay} (${String(bDayVal)})` : '--',
  }
}

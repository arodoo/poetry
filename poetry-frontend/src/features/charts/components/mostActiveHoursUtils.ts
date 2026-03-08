/*
 * File: mostActiveHoursUtils.ts
 * Purpose: Data formatting utilities decoupled from MostActiveHoursChart to comply with 80-line limits.
 * All Rights Reserved. Arodi Emmanuel
 */

export function computeActiveHoursData(
  data: Record<string, number>
): { name: string; value: number }[] {
  const tzOffsetHours = Math.floor(new Date().getTimezoneOffset() / 60)
  const hoursMap = new Map<number, number>()

  for (let i = 0; i < 24; i++) hoursMap.set(i, 0)

  Object.entries(data).forEach(([hourStr, count]) => {
    const utcHour = parseInt(hourStr, 10)
    if (!isNaN(utcHour)) {
      let localHour = (utcHour - tzOffsetHours) % 24
      if (localHour < 0) localHour += 24
      hoursMap.set(localHour, (hoursMap.get(localHour) ?? 0) + count)
    }
  })

  const result = []
  for (let i = 0; i < 24; i++) {
    const ampm = i >= 12 ? 'PM' : 'AM'
    const h12 = i % 12 === 0 ? 12 : i % 12
    result.push({
      name: `${String(h12)}:00 ${ampm}`,
      value: hoursMap.get(i) ?? 0,
    })
  }
  return result
}

export function computeActiveHoursKpis(
  chartData: { name: string; value: number }[],
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
    if (count > bDayVal) {
      bDayVal = count
      const iso = parseInt(isoDayStr, 10)
      if (!isNaN(iso)) {
        // 2024-01-01 was Monday (ISO day 1)
        const d = new Date(2024, 0, iso)
        bDayName = new Intl.DateTimeFormat(locale ?? 'en', {
          weekday: 'long',
        }).format(d)
      }
    }
  })

  return {
    peakHourInfo: peakVal > 0 ? `${peakName} (${String(peakVal)})` : '--',
    busiestDayInfo:
      bDayVal > 0
        ? `${bDayName.charAt(0).toUpperCase() + bDayName.slice(1)} (${String(bDayVal)})`
        : '--',
  }
}

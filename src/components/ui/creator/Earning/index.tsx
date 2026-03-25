import React from 'react'
import EarningOverview from './EarningOverview'
import AnalyticsCharts from './AnalyticsCharts'
import RecentTransaction from './RecentTransaction'

const EarningPage = () => {
  return (
    <div>
        <EarningOverview />
        <AnalyticsCharts />
        <RecentTransaction />
    </div>
  )
}

export default EarningPage
import React from "react";

interface StatItem {
  label: string;
  value: string;
  icon: React.ReactNode;
}

interface StatsBarProps {
  stats: StatItem[];
}

const StatsBar: React.FC<StatsBarProps> = ({ stats }) => {
  return (
    <div className="stats-bar">
      {stats.map((stat, i) => (
        <div key={i} className="stat-card">
          <div className="stat-icon">{stat.icon}</div>
          <div className="stat-content">
            <span className="stat-label">{stat.label}</span>
            <span className="stat-value">{stat.value}</span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default StatsBar;
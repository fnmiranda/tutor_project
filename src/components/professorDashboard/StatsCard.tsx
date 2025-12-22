"use client";
import React from "react";
import "./professorCSS.css";

interface StatsCardProps {
  title: string;
  value: number | string;
  description: string;
  icon?: string;
  trend?: {
    value: number;
    isPositive: boolean;
  };
}

export default function StatsCard({ 
  title, 
  value, 
  description, 
  trend 
}: StatsCardProps) {
  return (
    <div className="stats-card">
      <div className="stats-content">
        <h3 className="stats-title">{title}</h3>
        <p className="stats-value">{value}</p>
        <p className="stats-description">{description}</p>
        {trend && (
          <div className={`stats-trend ${trend.isPositive ? 'positive' : 'negative'}`}>
            {trend.isPositive ? '↗' : '↘'} {Math.abs(trend.value)}%
          </div>
        )}
      </div>
    </div>
  );
}
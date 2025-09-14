import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { TrendingUp, TrendingDown, Clock, BarChart3, Target, Zap } from 'lucide-react';
import { KPI } from '@/types/railway';
import { mockKPIs } from '@/lib/mockData';

export const KpiPanel = () => {
  const [kpis, setKpis] = useState<KPI>(mockKPIs);

  useEffect(() => {
    // Simulate real-time KPI updates
    const interval = setInterval(() => {
      setKpis(prev => ({
        ...prev,
        averageDelay: Math.max(0, prev.averageDelay + (Math.random() - 0.5) * 0.5),
        throughput: Math.max(0, prev.throughput + (Math.random() - 0.5) * 2),
        onTimePercentage: Math.min(100, Math.max(0, prev.onTimePercentage + (Math.random() - 0.5) * 2)),
        systemEfficiency: Math.min(100, Math.max(0, prev.systemEfficiency + (Math.random() - 0.5) * 1)),
      }));
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  const kpiItems = [
    {
      title: 'Average Delay',
      value: `${kpis.averageDelay.toFixed(1)} min`,
      icon: Clock,
      trend: kpis.averageDelay < 3 ? 'up' : 'down',
      color: kpis.averageDelay < 3 ? 'text-status-success' : 'text-status-warning',
    },
    {
      title: 'Throughput',
      value: `${kpis.throughput} trains/hr`,
      icon: BarChart3,
      trend: 'up',
      color: 'text-status-success',
    },
    {
      title: 'On-Time %',
      value: `${kpis.onTimePercentage.toFixed(1)}%`,
      icon: Target,
      trend: kpis.onTimePercentage > 85 ? 'up' : 'down',
      color: kpis.onTimePercentage > 85 ? 'text-status-success' : 'text-status-warning',
    },
    {
      title: 'Conflicts Resolved',
      value: kpis.conflictsResolved.toString(),
      icon: Zap,
      trend: 'up',
      color: 'text-status-info',
    },
    {
      title: 'System Efficiency',
      value: `${kpis.systemEfficiency.toFixed(1)}%`,
      icon: TrendingUp,
      trend: kpis.systemEfficiency > 90 ? 'up' : 'down',
      color: kpis.systemEfficiency > 90 ? 'text-status-success' : 'text-status-warning',
    },
  ];

  return (
    <div className="p-4">
      <div className="grid grid-cols-5 gap-4">
        {kpiItems.map((item) => (
          <Card key={item.title} className="p-4 bg-card border-border">
            <div className="flex items-center justify-between mb-2">
              <item.icon className="w-5 h-5 text-muted-foreground" />
              {item.trend === 'up' ? (
                <TrendingUp className="w-4 h-4 text-status-success" />
              ) : (
                <TrendingDown className="w-4 h-4 text-status-danger" />
              )}
            </div>
            <div className="space-y-1">
              <p className="text-sm font-medium text-muted-foreground">{item.title}</p>
              <p className={`text-xl font-bold ${item.color}`}>{item.value}</p>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};
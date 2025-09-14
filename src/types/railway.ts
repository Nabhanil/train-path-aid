export interface Train {
  id: string;
  type: 'express' | 'freight' | 'local';
  position: {
    lat: number;
    lng: number;
  };
  destination: string;
  eta: string;
  delay: number; // minutes
  speed: number; // km/h
  priority: number; // 1-10, higher = more priority
  status: 'on_time' | 'delayed' | 'stopped';
}

export interface Station {
  id: string;
  name: string;
  position: {
    lat: number;
    lng: number;
  };
  type: 'station' | 'junction' | 'platform';
  capacity: number;
  currentOccupancy: number;
}

export interface Recommendation {
  id: string;
  trainId: string;
  type: 'hold' | 'release' | 'platform_assignment' | 'speed_adjustment';
  description: string;
  rationale: string;
  priority: 'low' | 'medium' | 'high' | 'critical';
  estimatedImpact: {
    delayReduction: number;
    throughputImprovement: number;
  };
  timestamp: string;
}

export interface KPI {
  averageDelay: number;
  throughput: number; // trains per hour
  onTimePercentage: number;
  conflictsResolved: number;
  systemEfficiency: number;
}

export interface Action {
  id: string;
  recommendationId: string;
  type: 'accepted' | 'overridden';
  timestamp: string;
  userId: string;
  reason?: string;
}

export interface RailwaySection {
  id: string;
  name: string;
  bounds: {
    north: number;
    south: number;
    east: number;
    west: number;
  };
  stations: Station[];
  railwayLines: {
    id: string;
    path: { lat: number; lng: number }[];
    type: 'main' | 'siding' | 'junction';
  }[];
}
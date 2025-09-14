import { Train, Station, Recommendation, KPI, RailwaySection } from '@/types/railway';

export const mockRailwaySection: RailwaySection = {
  id: 'section-1',
  name: 'Central Metro Section',
  bounds: {
    north: 40.7831,
    south: 40.7489,
    east: -73.9441,
    west: -73.9927,
  },
  stations: [
    {
      id: 'station-1',
      name: 'Central Station',
      position: { lat: 40.7589, lng: -73.9851 },
      type: 'station',
      capacity: 4,
      currentOccupancy: 2,
    },
    {
      id: 'junction-1', 
      name: 'North Junction',
      position: { lat: 40.7731, lng: -73.9650 },
      type: 'junction',
      capacity: 2,
      currentOccupancy: 1,
    },
    {
      id: 'station-2',
      name: 'East Terminal',
      position: { lat: 40.7614, lng: -73.9776 },
      type: 'station',
      capacity: 3,
      currentOccupancy: 1,
    }
  ],
  railwayLines: [
    {
      id: 'main-line-1',
      path: [
        { lat: 40.7589, lng: -73.9851 },
        { lat: 40.7731, lng: -73.9650 },
        { lat: 40.7614, lng: -73.9776 }
      ],
      type: 'main'
    }
  ]
};

export const mockTrains: Train[] = [
  {
    id: 'TRN-301',
    type: 'express',
    position: { lat: 40.7589, lng: -73.9851 },
    destination: 'East Terminal',
    eta: '14:25',
    delay: 0,
    speed: 85,
    priority: 9,
    status: 'on_time',
  },
  {
    id: 'TRN-102',
    type: 'local',
    position: { lat: 40.7631, lng: -73.9750 },
    destination: 'Central Station', 
    eta: '14:28',
    delay: 3,
    speed: 45,
    priority: 5,
    status: 'delayed',
  },
  {
    id: 'FRT-205',
    type: 'freight',
    position: { lat: 40.7731, lng: -73.9650 },
    destination: 'North Yard',
    eta: '14:45',
    delay: 8,
    speed: 30,
    priority: 3,
    status: 'delayed',
  },
  {
    id: 'TRN-403',
    type: 'express',
    position: { lat: 40.7614, lng: -73.9776 },
    destination: 'Central Station',
    eta: '14:32',
    delay: 0,
    speed: 80,
    priority: 8,
    status: 'on_time',
  }
];

export const mockRecommendations: Recommendation[] = [
  {
    id: 'rec-1',
    trainId: 'TRN-102',
    type: 'hold',
    description: 'Hold Train 102 for 2 minutes',
    rationale: 'Allow Express 301 to pass through North Junction first',
    priority: 'high',
    estimatedImpact: {
      delayReduction: 5,
      throughputImprovement: 12,
    },
    timestamp: new Date().toISOString(),
  },
  {
    id: 'rec-2',
    trainId: 'TRN-403',
    type: 'platform_assignment',
    description: 'Assign Platform 2 to Train 403',
    rationale: 'Platform 1 will be occupied by incoming Express 301',
    priority: 'medium',
    estimatedImpact: {
      delayReduction: 2,
      throughputImprovement: 8,
    },
    timestamp: new Date().toISOString(),
  },
  {
    id: 'rec-3',
    trainId: 'FRT-205',
    type: 'speed_adjustment',
    description: 'Reduce speed to 25 km/h',
    rationale: 'Heavy traffic ahead, maintain safe following distance',
    priority: 'critical',
    estimatedImpact: {
      delayReduction: 0,
      throughputImprovement: 15,
    },
    timestamp: new Date().toISOString(),
  }
];

export const mockKPIs: KPI = {
  averageDelay: 2.8,
  throughput: 24,
  onTimePercentage: 87.5,
  conflictsResolved: 12,
  systemEfficiency: 91.2,
};
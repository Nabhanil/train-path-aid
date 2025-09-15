import { Train, Station, Recommendation, KPI, RailwaySection } from '@/types/railway';

export const mockRailwaySection: RailwaySection = {
  id: 'section-1',
  name: 'Delhi-Mumbai Railway Corridor',
  bounds: {
    north: 28.7041,
    south: 19.0176,
    east: 77.3025,
    west: 72.8777,
  },
  stations: [
    {
      id: 'station-1',
      name: 'New Delhi Railway Station',
      position: { lat: 28.6428, lng: 77.2197 },
      type: 'station',
      capacity: 6,
      currentOccupancy: 4,
    },
    {
      id: 'junction-1', 
      name: 'Mathura Junction',
      position: { lat: 27.4924, lng: 77.6737 },
      type: 'junction',
      capacity: 4,
      currentOccupancy: 2,
    },
    {
      id: 'station-2',
      name: 'Agra Cantt Railway Station',
      position: { lat: 27.1767, lng: 78.0081 },
      type: 'station',
      capacity: 5,
      currentOccupancy: 3,
    },
    {
      id: 'junction-2',
      name: 'Jhansi Junction',
      position: { lat: 25.4484, lng: 78.5685 },
      type: 'junction',
      capacity: 4,
      currentOccupancy: 1,
    },
    {
      id: 'station-3',
      name: 'Bhopal Railway Station',
      position: { lat: 23.2599, lng: 77.4126 },
      type: 'station',
      capacity: 4,
      currentOccupancy: 2,
    },
    {
      id: 'junction-3',
      name: 'Nagpur Junction',
      position: { lat: 21.1458, lng: 79.0882 },
      type: 'junction',
      capacity: 5,
      currentOccupancy: 3,
    },
    {
      id: 'station-4',
      name: 'Mumbai Central',
      position: { lat: 18.9690, lng: 72.8205 },
      type: 'station',
      capacity: 8,
      currentOccupancy: 5,
    }
  ],
  railwayLines: [
    {
      id: 'delhi-mumbai-main',
      path: [
        { lat: 28.6428, lng: 77.2197 }, // New Delhi
        { lat: 27.4924, lng: 77.6737 }, // Mathura Junction
        { lat: 27.1767, lng: 78.0081 }, // Agra Cantt
        { lat: 25.4484, lng: 78.5685 }, // Jhansi Junction
        { lat: 23.2599, lng: 77.4126 }, // Bhopal
        { lat: 21.1458, lng: 79.0882 }, // Nagpur Junction
        { lat: 18.9690, lng: 72.8205 }  // Mumbai Central
      ],
      type: 'main'
    },
    {
      id: 'mathura-agra-branch',
      path: [
        { lat: 27.4924, lng: 77.6737 }, // Mathura Junction
        { lat: 27.1767, lng: 78.0081 }  // Agra Cantt
      ],
      type: 'junction'
    }
  ]
};

export const mockTrains: Train[] = [
  {
    id: '12301', // Rajdhani Express
    type: 'express',
    position: { lat: 28.6428, lng: 77.2197 },
    destination: 'Mumbai Central',
    eta: '14:25',
    delay: 0,
    speed: 110,
    priority: 10,
    status: 'on_time',
  },
  {
    id: '12615', // Grand Trunk Express
    type: 'express',
    position: { lat: 27.4924, lng: 77.6737 },
    destination: 'Chennai Central', 
    eta: '14:28',
    delay: 5,
    speed: 95,
    priority: 8,
    status: 'delayed',
  },
  {
    id: 'GOODS-001',
    type: 'freight',
    position: { lat: 25.4484, lng: 78.5685 },
    destination: 'Mumbai Port',
    eta: '16:45',
    delay: 12,
    speed: 45,
    priority: 3,
    status: 'delayed',
  },
  {
    id: '12137', // Punjab Mail
    type: 'express',
    position: { lat: 23.2599, lng: 77.4126 },
    destination: 'Mumbai Central',
    eta: '15:32',
    delay: 0,
    speed: 105,
    priority: 9,
    status: 'on_time',
  },
  {
    id: '12809', // Howrah Mail
    type: 'local',
    position: { lat: 21.1458, lng: 79.0882 },
    destination: 'New Delhi',
    eta: '18:15',
    delay: 8,
    speed: 75,
    priority: 6,
    status: 'delayed',
  },
  {
    id: '12953', // August Kranti Rajdhani
    type: 'express',
    position: { lat: 18.9690, lng: 72.8205 },
    destination: 'New Delhi',
    eta: '06:30',
    delay: 0,
    speed: 115,
    priority: 10,
    status: 'on_time',
  }
];

export const mockRecommendations: Recommendation[] = [
  {
    id: 'rec-1',
    trainId: '12615',
    type: 'hold',
    description: 'Hold Grand Trunk Express for 3 minutes at Mathura Junction',
    rationale: 'Allow Rajdhani Express 12301 to clear the main line first for priority passage',
    priority: 'high',
    estimatedImpact: {
      delayReduction: 8,
      throughputImprovement: 15,
    },
    timestamp: new Date().toISOString(),
  },
  {
    id: 'rec-2',
    trainId: '12137',
    type: 'platform_assignment',
    description: 'Assign Platform 3 to Punjab Mail at Bhopal',
    rationale: 'Platform 1 will be occupied by incoming Howrah Mail 12809',
    priority: 'medium',
    estimatedImpact: {
      delayReduction: 4,
      throughputImprovement: 10,
    },
    timestamp: new Date().toISOString(),
  },
  {
    id: 'rec-3',
    trainId: 'GOODS-001',
    type: 'speed_adjustment',
    description: 'Reduce freight train speed to 35 km/h',
    rationale: 'Multiple express trains approaching Jhansi Junction, maintain safe clearance',
    priority: 'critical',
    estimatedImpact: {
      delayReduction: 0,
      throughputImprovement: 20,
    },
    timestamp: new Date().toISOString(),
  },
  {
    id: 'rec-4',
    trainId: '12953',
    type: 'release',
    description: 'Clear August Kranti Rajdhani for departure',
    rationale: 'All safety checks completed, platform clear for priority express service',
    priority: 'high',
    estimatedImpact: {
      delayReduction: 6,
      throughputImprovement: 12,
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
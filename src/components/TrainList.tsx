import { useState, useEffect } from 'react';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Train as TrainIcon, Clock, AlertTriangle, CheckCircle2 } from 'lucide-react';
import { Train } from '@/types/railway';
import { mockTrains } from '@/lib/mockData';

export const TrainList = () => {
  const [trains, setTrains] = useState<Train[]>([]);

  useEffect(() => {
    // Simulate real-time updates
    setTrains(mockTrains);
    
    const interval = setInterval(() => {
      setTrains(prev => prev.map(train => ({
        ...train,
        // Simulate position updates
        position: {
          lat: train.position.lat + (Math.random() - 0.5) * 0.001,
          lng: train.position.lng + (Math.random() - 0.5) * 0.001,
        }
      })));
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const getStatusIcon = (status: Train['status']) => {
    switch (status) {
      case 'on_time':
        return <CheckCircle2 className="w-4 h-4 text-status-success" />;
      case 'delayed':
        return <AlertTriangle className="w-4 h-4 text-status-warning" />;
      case 'stopped':
        return <Clock className="w-4 h-4 text-status-danger" />;
    }
  };

  const getTrainTypeColor = (type: Train['type']) => {
    switch (type) {
      case 'express':
        return 'bg-railway-express';
      case 'freight':
        return 'bg-railway-freight';
      case 'local':
        return 'bg-primary';
    }
  };

  return (
    <div className="h-full flex flex-col">
      <div className="p-4 border-b border-border">
        <h2 className="text-lg font-semibold">Live Trains</h2>
        <p className="text-sm text-muted-foreground">{trains.length} active trains</p>
      </div>
      
      <ScrollArea className="flex-1">
        <div className="p-4 space-y-3">
          {trains.map((train) => (
            <div key={train.id} className="control-panel p-4 space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <TrainIcon className="w-5 h-5" />
                  <span className="font-mono font-medium">{train.id}</span>
                  <Badge 
                    variant="secondary" 
                    className={`${getTrainTypeColor(train.type)} text-white`}
                  >
                    {train.type}
                  </Badge>
                </div>
                {getStatusIcon(train.status)}
              </div>
              
              <div className="grid grid-cols-2 gap-2 text-sm">
                <div>
                  <span className="text-muted-foreground">Destination:</span>
                  <div className="font-medium">{train.destination}</div>
                </div>
                <div>
                  <span className="text-muted-foreground">ETA:</span>
                  <div className="font-medium font-mono">{train.eta}</div>
                </div>
                <div>
                  <span className="text-muted-foreground">Speed:</span>
                  <div className="font-medium">{train.speed} km/h</div>
                </div>
                <div>
                  <span className="text-muted-foreground">Delay:</span>
                  <div className={`font-medium ${train.delay > 0 ? 'text-status-warning' : 'text-status-success'}`}>
                    {train.delay > 0 ? `+${train.delay}` : train.delay} min
                  </div>
                </div>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="text-xs text-muted-foreground">
                  Priority: {train.priority}/10
                </div>
                <div className="flex">
                  {Array.from({ length: 10 }).map((_, i) => (
                    <div
                      key={i}
                      className={`w-1 h-3 mr-0.5 ${
                        i < train.priority ? 'bg-primary' : 'bg-muted'
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
};
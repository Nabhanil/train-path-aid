import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { CheckCircle, XCircle, Clock, MapPin, Gauge, AlertTriangle } from 'lucide-react';
import { Recommendation } from '@/types/railway';
import { mockRecommendations } from '@/lib/mockData';
import { useToast } from '@/hooks/use-toast';

export const RecommendationPanel = () => {
  const [recommendations, setRecommendations] = useState<Recommendation[]>([]);
  const { toast } = useToast();

  useEffect(() => {
    setRecommendations(mockRecommendations);
  }, []);

  const handleAccept = (rec: Recommendation) => {
    toast({
      title: "Recommendation Accepted",
      description: `${rec.description} - Action logged`,
      variant: "default",
    });
    
    // Remove from recommendations list
    setRecommendations(prev => prev.filter(r => r.id !== rec.id));
  };

  const handleOverride = (rec: Recommendation) => {
    toast({
      title: "Recommendation Overridden",
      description: `${rec.description} - Override logged`,
      variant: "destructive",
    });
    
    // Remove from recommendations list
    setRecommendations(prev => prev.filter(r => r.id !== rec.id));
  };

  const getRecommendationIcon = (type: Recommendation['type']) => {
    switch (type) {
      case 'hold':
        return <Clock className="w-4 h-4" />;
      case 'platform_assignment':
        return <MapPin className="w-4 h-4" />;
      case 'speed_adjustment':
        return <Gauge className="w-4 h-4" />;
      case 'release':
        return <CheckCircle className="w-4 h-4" />;
    }
  };

  const getPriorityColor = (priority: Recommendation['priority']) => {
    switch (priority) {
      case 'critical':
        return 'bg-status-danger';
      case 'high':
        return 'bg-status-warning';
      case 'medium':
        return 'bg-status-info';
      case 'low':
        return 'bg-muted';
    }
  };

  return (
    <div className="h-full flex flex-col">
      <div className="p-4 border-b border-border">
        <h2 className="text-lg font-semibold">Recommendations</h2>
        <p className="text-sm text-muted-foreground">{recommendations.length} pending actions</p>
      </div>
      
      <ScrollArea className="flex-1">
        <div className="p-4 space-y-4">
          {recommendations.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              <CheckCircle className="w-12 h-12 mx-auto mb-4 opacity-50" />
              <p>No pending recommendations</p>
            </div>
          ) : (
            recommendations.map((rec) => (
              <div key={rec.id} className="control-panel p-4 space-y-4">
                <div className="flex items-start justify-between">
                  <div className="flex items-center space-x-2">
                    {getRecommendationIcon(rec.type)}
                    <span className="font-mono text-sm">{rec.trainId}</span>
                    <Badge 
                      variant="secondary" 
                      className={`${getPriorityColor(rec.priority)} text-white`}
                    >
                      {rec.priority}
                    </Badge>
                  </div>
                  <span className="text-xs text-muted-foreground">
                    {new Date(rec.timestamp).toLocaleTimeString()}
                  </span>
                </div>
                
                <div>
                  <h3 className="font-medium mb-2">{rec.description}</h3>
                  <p className="text-sm text-muted-foreground">{rec.rationale}</p>
                </div>
                
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-muted-foreground">Delay Reduction:</span>
                    <div className="font-medium text-status-success">
                      -{rec.estimatedImpact.delayReduction} min
                    </div>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Throughput:</span>
                    <div className="font-medium text-status-success">
                      +{rec.estimatedImpact.throughputImprovement}%
                    </div>
                  </div>
                </div>
                
                <div className="flex space-x-2">
                  <Button
                    size="sm"
                    onClick={() => handleAccept(rec)}
                    className="flex-1 bg-control-accept hover:bg-control-accept/90"
                  >
                    <CheckCircle className="w-4 h-4 mr-2" />
                    Accept
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleOverride(rec)}
                    className="flex-1 border-control-override text-control-override hover:bg-control-override hover:text-white"
                  >
                    <XCircle className="w-4 h-4 mr-2" />
                    Override
                  </Button>
                </div>
              </div>
            ))
          )}
        </div>
      </ScrollArea>
    </div>
  );
};
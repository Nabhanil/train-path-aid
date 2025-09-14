import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Badge } from '@/components/ui/badge';
import { X, CheckCircle, XCircle, Clock, User } from 'lucide-react';
import { Action } from '@/types/railway';

interface ActionHistoryProps {
  onClose: () => void;
}

export const ActionHistory = ({ onClose }: ActionHistoryProps) => {
  const [actions, setActions] = useState<Action[]>([]);

  useEffect(() => {
    // Mock action history data
    const mockActions: Action[] = [
      {
        id: 'action-1',
        recommendationId: 'rec-1',
        type: 'accepted',
        timestamp: new Date(Date.now() - 5 * 60 * 1000).toISOString(),
        userId: 'controller-1',
      },
      {
        id: 'action-2',
        recommendationId: 'rec-2',
        type: 'overridden',
        timestamp: new Date(Date.now() - 15 * 60 * 1000).toISOString(),
        userId: 'controller-1',
        reason: 'Platform conflict with maintenance schedule',
      },
      {
        id: 'action-3',
        recommendationId: 'rec-3',
        type: 'accepted',
        timestamp: new Date(Date.now() - 25 * 60 * 1000).toISOString(),
        userId: 'controller-2',
      },
      {
        id: 'action-4',
        recommendationId: 'rec-4',
        type: 'accepted',
        timestamp: new Date(Date.now() - 35 * 60 * 1000).toISOString(),
        userId: 'controller-1',
      },
      {
        id: 'action-5',
        recommendationId: 'rec-5',
        type: 'overridden',
        timestamp: new Date(Date.now() - 45 * 60 * 1000).toISOString(),
        userId: 'controller-2',
        reason: 'Emergency train priority',
      },
    ];
    
    setActions(mockActions);
  }, []);

  const getActionIcon = (type: Action['type']) => {
    return type === 'accepted' ? (
      <CheckCircle className="w-4 h-4 text-status-success" />
    ) : (
      <XCircle className="w-4 h-4 text-status-warning" />
    );
  };

  const formatTimeAgo = (timestamp: string) => {
    const now = new Date();
    const actionTime = new Date(timestamp);
    const diffMinutes = Math.floor((now.getTime() - actionTime.getTime()) / (1000 * 60));
    
    if (diffMinutes < 60) {
      return `${diffMinutes}m ago`;
    } else if (diffMinutes < 1440) {
      return `${Math.floor(diffMinutes / 60)}h ago`;
    } else {
      return `${Math.floor(diffMinutes / 1440)}d ago`;
    }
  };

  return (
    <div className="h-full flex flex-col">
      <div className="p-4 border-b border-border flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold">Action History</h2>
          <p className="text-sm text-muted-foreground">{actions.length} logged actions</p>
        </div>
        <Button variant="ghost" size="sm" onClick={onClose}>
          <X className="w-4 h-4" />
        </Button>
      </div>
      
      <ScrollArea className="flex-1">
        <div className="p-4 space-y-3">
          {actions.map((action) => (
            <div key={action.id} className="control-panel p-4 space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  {getActionIcon(action.type)}
                  <Badge 
                    variant={action.type === 'accepted' ? 'default' : 'secondary'}
                    className={action.type === 'accepted' ? 'bg-status-success' : 'bg-status-warning'}
                  >
                    {action.type}
                  </Badge>
                </div>
                <span className="text-xs text-muted-foreground">
                  {formatTimeAgo(action.timestamp)}
                </span>
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center space-x-2 text-sm">
                  <span className="text-muted-foreground">Recommendation:</span>
                  <span className="font-mono">{action.recommendationId}</span>
                </div>
                
                <div className="flex items-center space-x-2 text-sm">
                  <User className="w-3 h-3 text-muted-foreground" />
                  <span className="text-muted-foreground">Controller:</span>
                  <span>{action.userId}</span>
                </div>
                
                {action.reason && (
                  <div className="text-sm">
                    <span className="text-muted-foreground">Reason:</span>
                    <p className="mt-1 p-2 bg-muted rounded text-xs">{action.reason}</p>
                  </div>
                )}
              </div>
              
              <div className="flex items-center text-xs text-muted-foreground">
                <Clock className="w-3 h-3 mr-1" />
                {new Date(action.timestamp).toLocaleString()}
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
};
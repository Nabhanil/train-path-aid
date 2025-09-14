import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Card } from '@/components/ui/card';
import { Play, Pause, RotateCcw, TrendingUp, TrendingDown } from 'lucide-react';

interface SimulationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SimulationModal = ({ isOpen, onClose }: SimulationModalProps) => {
  const [isRunning, setIsRunning] = useState(false);
  const [progress, setProgress] = useState(0);
  const [results, setResults] = useState<any>(null);

  const runSimulation = async () => {
    setIsRunning(true);
    setResults(null);
    
    // Simulate 10-minute fast-forward
    for (let i = 0; i <= 100; i += 10) {
      await new Promise(resolve => setTimeout(resolve, 200));
      setProgress(i);
    }
    
    // Generate mock results
    setResults({
      currentMetrics: {
        averageDelay: 2.8,
        throughput: 24,
        onTimePercentage: 87.5,
        conflicts: 3,
      },
      predictedMetrics: {
        averageDelay: 2.1,
        throughput: 28,
        onTimePercentage: 92.3,
        conflicts: 1,
      },
      improvements: {
        delayReduction: 0.7,
        throughputIncrease: 4,
        onTimeImprovement: 4.8,
        conflictReduction: 2,
      }
    });
    
    setIsRunning(false);
  };

  const resetSimulation = () => {
    setProgress(0);
    setResults(null);
    setIsRunning(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Traffic Simulation - 10 Min Fast-Forward</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          {/* Simulation Controls */}
          <div className="flex items-center space-x-4">
            <Button
              onClick={runSimulation}
              disabled={isRunning}
              className="flex-1"
            >
              <Play className="w-4 h-4 mr-2" />
              {isRunning ? 'Running...' : 'Start Simulation'}
            </Button>
            <Button
              variant="outline"
              onClick={resetSimulation}
              disabled={isRunning}
            >
              <RotateCcw className="w-4 h-4 mr-2" />
              Reset
            </Button>
          </div>

          {/* Progress Bar */}
          {(isRunning || progress > 0) && (
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Simulation Progress</span>
                <span>{progress}%</span>
              </div>
              <Progress value={progress} className="w-full" />
            </div>
          )}

          {/* Results */}
          {results && (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Predicted Outcomes</h3>
              
              <div className="grid grid-cols-2 gap-4">
                <Card className="p-4">
                  <h4 className="font-medium mb-3">Current Metrics</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>Avg Delay:</span>
                      <span>{results.currentMetrics.averageDelay} min</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Throughput:</span>
                      <span>{results.currentMetrics.throughput} trains/hr</span>
                    </div>
                    <div className="flex justify-between">
                      <span>On-Time %:</span>
                      <span>{results.currentMetrics.onTimePercentage}%</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Conflicts:</span>
                      <span>{results.currentMetrics.conflicts}</span>
                    </div>
                  </div>
                </Card>

                <Card className="p-4">
                  <h4 className="font-medium mb-3">Predicted (10 min)</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>Avg Delay:</span>
                      <span className="text-status-success">{results.predictedMetrics.averageDelay} min</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Throughput:</span>
                      <span className="text-status-success">{results.predictedMetrics.throughput} trains/hr</span>
                    </div>
                    <div className="flex justify-between">
                      <span>On-Time %:</span>
                      <span className="text-status-success">{results.predictedMetrics.onTimePercentage}%</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Conflicts:</span>
                      <span className="text-status-success">{results.predictedMetrics.conflicts}</span>
                    </div>
                  </div>
                </Card>
              </div>

              <Card className="p-4">
                <h4 className="font-medium mb-3">Expected Improvements</h4>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="flex items-center justify-between">
                    <span>Delay Reduction:</span>
                    <div className="flex items-center text-status-success">
                      <TrendingDown className="w-4 h-4 mr-1" />
                      -{results.improvements.delayReduction} min
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Throughput Increase:</span>
                    <div className="flex items-center text-status-success">
                      <TrendingUp className="w-4 h-4 mr-1" />
                      +{results.improvements.throughputIncrease} trains/hr
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>On-Time Improvement:</span>
                    <div className="flex items-center text-status-success">
                      <TrendingUp className="w-4 h-4 mr-1" />
                      +{results.improvements.onTimeImprovement}%
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Conflict Reduction:</span>
                    <div className="flex items-center text-status-success">
                      <TrendingDown className="w-4 h-4 mr-1" />
                      -{results.improvements.conflictReduction} conflicts
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};
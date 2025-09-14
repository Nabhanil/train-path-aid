import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { TrainList } from '@/components/TrainList';
import { RecommendationPanel } from '@/components/RecommendationPanel';
import { KpiPanel } from '@/components/KpiPanel';
import { MapView } from '@/components/MapView';
import { SimulationModal } from '@/components/SimulationModal';
import { ActionHistory } from '@/components/ActionHistory';
import { Play, Pause, RotateCcw } from 'lucide-react';

const Index = () => {
  const [isSimulationModalOpen, setIsSimulationModalOpen] = useState(false);
  const [isHistoryOpen, setIsHistoryOpen] = useState(false);
  const [simulationRunning, setSimulationRunning] = useState(false);

  useEffect(() => {
    // Set up dark theme by default
    document.documentElement.classList.add('dark');
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <header className="bg-card border-b border-border px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <h1 className="text-2xl font-bold">Railway Traffic Control</h1>
            <div className="flex items-center space-x-2">
              <div className="status-indicator bg-status-success"></div>
              <span className="text-sm text-muted-foreground">System Online</span>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setIsHistoryOpen(!isHistoryOpen)}
            >
              Action History
            </Button>
            <Button
              onClick={() => setIsSimulationModalOpen(true)}
              className="bg-primary hover:bg-primary/90"
            >
              <Play className="w-4 h-4 mr-2" />
              Run Simulation
            </Button>
          </div>
        </div>
      </header>

      {/* Main Dashboard Layout */}
      <div className="flex h-[calc(100vh-5rem)]">
        {/* Left Panel - Train List */}
        <div className="w-80 bg-card border-r border-border">
          <TrainList />
        </div>

        {/* Center Panel - Map */}
        <div className="flex-1 relative">
          <MapView />
        </div>

        {/* Right Panel - Recommendations */}
        <div className="w-96 bg-card border-l border-border">
          <RecommendationPanel />
        </div>

        {/* Action History Sidebar */}
        {isHistoryOpen && (
          <div className="w-80 bg-card border-l border-border">
            <ActionHistory onClose={() => setIsHistoryOpen(false)} />
          </div>
        )}
      </div>

      {/* Bottom Panel - KPIs */}
      <div className="bg-card border-t border-border">
        <KpiPanel />
      </div>

      {/* Simulation Modal */}
      <SimulationModal 
        isOpen={isSimulationModalOpen}
        onClose={() => setIsSimulationModalOpen(false)}
      />
    </div>
  );
};

export default Index;
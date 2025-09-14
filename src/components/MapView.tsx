import { useEffect, useRef, useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { MapPin, Layers, ZoomIn, ZoomOut, Navigation } from 'lucide-react';
import { mockTrains, mockRailwaySection } from '@/lib/mockData';
import { Train, Station } from '@/types/railway';

export const MapView = () => {
  const mapRef = useRef<HTMLDivElement>(null);
  const [apiKey, setApiKey] = useState<string>('');
  const [isApiKeySet, setIsApiKeySet] = useState(false);
  const [trains, setTrains] = useState<Train[]>(mockTrains);
  const [selectedTrain, setSelectedTrain] = useState<Train | null>(null);

  useEffect(() => {
    // Check if Google Maps API key is available
    const savedApiKey = localStorage.getItem('googleMapsApiKey');
    if (savedApiKey) {
      setApiKey(savedApiKey);
      setIsApiKeySet(true);
      initializeMap(savedApiKey);
    }
  }, []);

  const handleApiKeySubmit = () => {
    if (apiKey.trim()) {
      localStorage.setItem('googleMapsApiKey', apiKey);
      setIsApiKeySet(true);
      initializeMap(apiKey);
    }
  };

  const initializeMap = (key: string) => {
    // In a real implementation, you would load the Google Maps JavaScript API
    // For now, we'll simulate the map with a styled div
    console.log('Initializing map with API key:', key.substring(0, 10) + '...');
  };

  const getTrainMarkerColor = (type: Train['type']) => {
    switch (type) {
      case 'express':
        return 'bg-railway-express';
      case 'freight':
        return 'bg-railway-freight';
      case 'local':
        return 'bg-primary';
    }
  };

  const getStationIcon = (type: Station['type']) => {
    switch (type) {
      case 'station':
        return '🚉';
      case 'junction':
        return '🔀';
      case 'platform':
        return '🚏';
    }
  };

  if (!isApiKeySet) {
    return (
      <div className="h-full flex items-center justify-center bg-muted/20">
        <Card className="p-6 w-96">
          <div className="text-center space-y-4">
            <MapPin className="w-12 h-12 mx-auto text-muted-foreground" />
            <h3 className="text-lg font-semibold">Google Maps API Required</h3>
            <p className="text-sm text-muted-foreground">
              Please enter your Google Maps API key to display the railway network
            </p>
            <div className="space-y-2">
              <Input
                type="password"
                placeholder="Enter Google Maps API Key"
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleApiKeySubmit()}
              />
              <Button onClick={handleApiKeySubmit} className="w-full">
                Initialize Map
              </Button>
            </div>
            <p className="text-xs text-muted-foreground">
              Get your API key from the Google Cloud Console
            </p>
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className="h-full relative">
      {/* Map Controls */}
      <div className="absolute top-4 right-4 z-10 space-y-2">
        <div className="flex flex-col space-y-2">
          <Button size="sm" variant="outline" className="bg-card">
            <ZoomIn className="w-4 h-4" />
          </Button>
          <Button size="sm" variant="outline" className="bg-card">
            <ZoomOut className="w-4 h-4" />
          </Button>
          <Button size="sm" variant="outline" className="bg-card">
            <Layers className="w-4 h-4" />
          </Button>
          <Button size="sm" variant="outline" className="bg-card">
            <Navigation className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* Simulated Map Container */}
      <div 
        ref={mapRef} 
        className="w-full h-full bg-slate-800 relative overflow-hidden"
        style={{
          backgroundImage: `
            radial-gradient(circle at 25% 25%, #1e40af 0%, transparent 50%),
            radial-gradient(circle at 75% 75%, #059669 0%, transparent 50%),
            linear-gradient(45deg, #0f172a 0%, #1e293b 100%)
          `
        }}
      >
        {/* Railway Lines */}
        <svg className="absolute inset-0 w-full h-full">
          <defs>
            <pattern id="railway-pattern" patternUnits="userSpaceOnUse" width="20" height="4">
              <rect width="20" height="4" fill="none"/>
              <rect x="0" y="1" width="15" height="2" fill="hsl(var(--railway-line))"/>
            </pattern>
          </defs>
          {mockRailwaySection.railwayLines.map((line, index) => (
            <polyline
              key={line.id}
              points={line.path.map(p => `${(p.lng + 74) * 1000},${(40.8 - p.lat) * 1000}`).join(' ')}
              stroke="url(#railway-pattern)"
              strokeWidth="4"
              fill="none"
            />
          ))}
        </svg>

        {/* Stations */}
        {mockRailwaySection.stations.map((station) => (
          <div
            key={station.id}
            className="absolute transform -translate-x-1/2 -translate-y-1/2"
            style={{
              left: `${(station.position.lng + 74) * 1000}px`,
              top: `${(40.8 - station.position.lat) * 1000}px`,
            }}
          >
            <div className="bg-railway-station p-2 rounded-full shadow-lg border-2 border-white">
              <span className="text-lg">{getStationIcon(station.type)}</span>
            </div>
            <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-1">
              <div className="bg-card px-2 py-1 rounded text-xs font-medium whitespace-nowrap">
                {station.name}
              </div>
            </div>
          </div>
        ))}

        {/* Trains */}
        {trains.map((train) => (
          <div
            key={train.id}
            className="absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer"
            style={{
              left: `${(train.position.lng + 74) * 1000}px`,
              top: `${(40.8 - train.position.lat) * 1000}px`,
            }}
            onClick={() => setSelectedTrain(train)}
          >
            <div className={`${getTrainMarkerColor(train.type)} p-2 rounded-full shadow-lg border-2 border-white animate-pulse`}>
              <span className="text-white text-sm font-bold">🚂</span>
            </div>
            <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-1">
              <div className="bg-card px-2 py-1 rounded text-xs font-medium">
                {train.id}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Train Details Popup */}
      {selectedTrain && (
        <div className="absolute bottom-4 left-4 z-10">
          <Card className="p-4 w-80">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-semibold">{selectedTrain.id}</h3>
              <Button 
                size="sm" 
                variant="outline" 
                onClick={() => setSelectedTrain(null)}
              >
                ×
              </Button>
            </div>
            <div className="grid grid-cols-2 gap-2 text-sm">
              <div>
                <span className="text-muted-foreground">Type:</span>
                <div className="font-medium capitalize">{selectedTrain.type}</div>
              </div>
              <div>
                <span className="text-muted-foreground">Speed:</span>
                <div className="font-medium">{selectedTrain.speed} km/h</div>
              </div>
              <div>
                <span className="text-muted-foreground">Destination:</span>
                <div className="font-medium">{selectedTrain.destination}</div>
              </div>
              <div>
                <span className="text-muted-foreground">ETA:</span>
                <div className="font-medium">{selectedTrain.eta}</div>
              </div>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
};
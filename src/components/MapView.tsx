import { useEffect, useRef, useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { MapPin, Layers, ZoomIn, ZoomOut, Navigation } from 'lucide-react';
import { mockTrains, mockRailwaySection } from '@/lib/mockData';
import { Train, Station } from '@/types/railway';

// Declare Google Maps types
declare global {
  interface Window {
    google: any;
  }
}

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
    // Load Google Maps JavaScript API
    const script = document.createElement('script');
    script.src = `https://maps.googleapis.com/maps/api/js?key=${key}&libraries=geometry`;
    script.async = true;
    script.onload = () => {
      if (mapRef.current && window.google) {
        const map = new window.google.maps.Map(mapRef.current, {
          center: { lat: 23.5, lng: 77.5 }, // Central India for railway demo
          zoom: 6,
          mapTypeId: 'terrain',
          styles: [
            {
              "featureType": "all",
              "elementType": "geometry.fill",
              "stylers": [{"color": "#1a1a1a"}]
            },
            {
              "featureType": "all",
              "elementType": "labels.text.fill",
              "stylers": [{"color": "#ffffff"}]
            },
            {
              "featureType": "all",
              "elementType": "labels.text.stroke",
              "stylers": [{"color": "#000000"}, {"lightness": 13}]
            },
            {
              "featureType": "road",
              "elementType": "geometry",
              "stylers": [{"color": "#333333"}]
            },
            {
              "featureType": "water",
              "elementType": "geometry",
              "stylers": [{"color": "#2c5282"}]
            }
          ]
        });

        // Add railway lines as polylines
        mockRailwaySection.railwayLines.forEach(line => {
          const polyline = new window.google.maps.Polyline({
            path: line.path,
            geodesic: true,
            strokeColor: '#facc15',
            strokeOpacity: 1.0,
            strokeWeight: 4,
          });
          polyline.setMap(map);
        });

        // Add stations as markers
        mockRailwaySection.stations.forEach(station => {
          const marker = new window.google.maps.Marker({
            position: station.position,
            map: map,
            title: station.name,
            icon: {
              path: window.google.maps.SymbolPath.CIRCLE,
              fillColor: '#10b981',
              fillOpacity: 1,
              strokeColor: '#ffffff',
              strokeWeight: 2,
              scale: 8
            }
          });

          const infoWindow = new window.google.maps.InfoWindow({
            content: `<div class="p-2"><h3 class="font-semibold">${station.name}</h3><p class="text-sm">${station.type}</p></div>`
          });

          marker.addListener('click', () => {
            infoWindow.open(map, marker);
          });
        });

        // Add trains as animated markers
        trains.forEach(train => {
          const marker = new window.google.maps.Marker({
            position: train.position,
            map: map,
            title: `Train ${train.id}`,
            icon: {
              path: window.google.maps.SymbolPath.FORWARD_CLOSED_ARROW,
              fillColor: train.type === 'express' ? '#ef4444' : train.type === 'freight' ? '#f97316' : '#3b82f6',
              fillOpacity: 1,
              strokeColor: '#ffffff',
              strokeWeight: 1,
              scale: 6,
              rotation: 45
            }
          });

          const infoWindow = new window.google.maps.InfoWindow({
            content: `
              <div class="p-3">
                <h3 class="font-semibold">Train ${train.id}</h3>
                <p class="text-sm">Type: ${train.type}</p>
                <p class="text-sm">Speed: ${train.speed} km/h</p>
                <p class="text-sm">Destination: ${train.destination}</p>
                <p class="text-sm">ETA: ${train.eta}</p>
              </div>
            `
          });

          marker.addListener('click', () => {
            infoWindow.open(map, marker);
          });
        });
      }
    };
    document.head.appendChild(script);
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

      {/* Real Google Map Container */}
      <div 
        ref={mapRef} 
        className="w-full h-full"
      />

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
'use client'

import 'leaflet/dist/leaflet.css';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { LatLngExpression } from 'leaflet';

// 定义 House 类型 (可以考虑放到共享类型文件中)
type House = {
  id: number;
  name: string;
  province: string;
  lat: number;
  lng: number;
  available: number;
  // ... other properties if needed
};

interface MapComponentProps {
  houses: House[];
}

const MapComponent: React.FC<MapComponentProps> = ({ houses }) => {
  // 中国大致中心点和缩放级别
  const mapCenter: LatLngExpression = [34.0, 108.0]; // Roughly central China
  const mapZoom = 5;

  return (
    <MapContainer center={mapCenter} zoom={mapZoom} scrollWheelZoom={true} style={{ height: '100%', width: '100%' }}>
      <TileLayer
        attribution='Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community'
        url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
      />
      {houses.map((house) => (
        <Marker key={house.id} position={[house.lat, house.lng]}>
          <Popup>
            <b>{house.name}</b><br />
            省份: {house.province}<br />
            可预订: {house.available} 间
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
};

export default MapComponent; 
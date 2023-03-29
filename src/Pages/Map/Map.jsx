import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { Helmet } from 'react-helmet';
import L from 'leaflet';

const blackIcon = new L.Icon({
  iconUrl: 'https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-black.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png'
});

const Map = () => {
    return (
      <div>
      <Helmet>
        <link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.3/dist/leaflet.css"
              integrity="sha256-kLaT2GOSpHechhsozzB+flnD+zUyjE2LlfWPgU04xyI=" crossorigin="" />
      </Helmet>

      <MapContainer center={[1.2833817398360576, 103.84521723728845]} zoom={12} style={{ height: '600px' , width: '80%'}}>
      <TileLayer url='https://tile.openstreetmap.org/{z}/{x}/{y}.png' maxZoom={15} attribution='&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'/>
      <Marker position={[1.3007569461909423, 103.84514976459786]} icon={blackIcon}>
        <Popup>
          <b>Plaza Singapura</b>
        </Popup>
      </Marker>
      <Marker position={[1.2651111493649967, 103.82207305110627]} icon={blackIcon}>
        <Popup>
          <b>Vivo City</b>
        </Popup>
      </Marker>
      <Marker position={[1.3042291282795053, 103.83190627994239]} icon={blackIcon}>
        <Popup>
          <b>ION Orchard</b>
        </Popup>
      </Marker>
    </MapContainer>
    </div>
    )
    
  }
  

  export default Map;
import { Constants, LocalStorage } from "@/classes/Constants";
import useLocalStorage from "@/hooks/useLocalStorage";
import GoogleMapReact from "google-map-react";
import { useCallback, useEffect, useMemo, useState } from "react";
import LocationBottomSheet from "../templates/LocationBottomSheet";

export interface MapMarker {
  latitude: number;
  longitude: number;
  icon: string;
  name: string;
  color: string;
}

interface MapsProps {
  mapMarkers: MapMarker[];
  type?: "ROADMAP" | "SATELLITE" | "HYBRID" | "TERRAIN";
}

const Maps: React.FC<MapsProps> = ({ mapMarkers, type = "ROADMAP" }) => {
  const [maps, setMaps] = useState<any>();
  const [map, setMap] = useState<any>();
  const [markers, setMarkers] = useState<any>();
  const [openLocationBS, setOpenLocationBS] = useState(false);
  const [selectedMarker, setSelectedMarker] = useState<any>();

  //! ZOOM / SET ZOOM
  const [zoom, setZoom] = useLocalStorage(
    LocalStorage.mapZoom,
    Constants.DefaulMapZoom
  );

  //! ZOOM UPDATE
  const onMapChange = (e: GoogleMapReact.ChangeEventValue) => {
    setZoom(e.zoom);
  };

  //! TOGGLE LOCATION BOTTOM SHEET
  const toggleOpenLocation = useCallback(
    (marker: any) => {
      setSelectedMarker(marker);
      setOpenLocationBS((open) => !open);
    },
    [setOpenLocationBS]
  );

  //! MAP TYPE ID
  const mapTypeId = useMemo(() => {
    if (maps) return maps.MapTypeId[type];
  }, [maps]);

  //! UPDATE WATCH MARKER POSITION
  useEffect(() => {
    for (let i = 0; i < mapMarkers.length; i++) {
      if (!markers) return;
      markers[i].setPosition({
        lat: mapMarkers[i].latitude,
        lng: mapMarkers[i].longitude,
      });
    }
  }, [markers, mapMarkers]);

  //! GET CENTER
  const defaultCenter = useMemo(
    () =>
      getCenter(
        mapMarkers.map((marker) => ({
          lat: marker.latitude,
          lng: marker.longitude,
        }))
      ),
    [mapMarkers]
  );

  useEffect(() => {
    if (!map || !maps || !mapMarkers) return;
    var bounds = new maps.LatLngBounds();
    for (const marker of mapMarkers) {
      bounds.extend({ lat: marker.latitude, lng: marker.longitude });
    }
    map.fitBounds(bounds);
  }, [map, maps, mapMarkers]);

  const generateKeyFrames = useCallback((mapMarker: MapMarker) => {
    return `
      div:has(> img[src='${mapMarker.icon}']) {
        animation: pulse-animation-${mapMarker.name} 2s infinite;
        border-radius: 50%;
      }

      @keyframes pulse-animation-${mapMarker.name} {
        0% {
          box-shadow: 0 0 0 0px ${mapMarker.color};
        }
        100% {
          box-shadow: 0 0 0 20px rgba(42, 183, 183, 0);
        }
      }
    `;
  }, []);

  console.log(mapMarkers.map((marker) => generateKeyFrames(marker)).join("\n"));

  return (
    <div
      className="relative overflow-hidden"
      style={{
        minHeight: "16rem",
        width: "100%",
        height: "100%",
      }}
    >
      <style>
        {mapMarkers.map((marker) => generateKeyFrames(marker)).join("\n")}
      </style>
      <GoogleMapReact
        bootstrapURLKeys={{ key: "AIzaSyAzPN7p1Nx8VgwDWN7QmheKnvAI4Bov-X8" }}
        defaultCenter={defaultCenter}
        center={defaultCenter}
        defaultZoom={zoom}
        onChange={onMapChange}
        style={{
          width: "100%",
          height: "100%",
          position: "relative",
          zIndex: 1,
        }}
        yesIWantToUseGoogleMapApiInternals
        onGoogleApiLoaded={({ map, maps }) => {
          setMaps(maps);
          setMap(map);

          const _markers = [];

          for (const marker of mapMarkers) {
            const _marker = new maps.Marker({
              position: { lat: marker.latitude, lng: marker.longitude },
              map,
              title: marker.name,
              icon: {
                url: marker.icon, // url
                scaledSize: new maps.Size(50, 50), // scaled size
                origin: new maps.Point(0, 0), // origin
                anchor: new maps.Point(25, 25), // anchor
              },
              clickable: true,
            });

            //! MARKER CLICK
            maps.event.addDomListener(_marker, "click", () =>
              toggleOpenLocation(_marker)
            );
            maps.event.addDomListener(
              _marker,
              "touchstart",
              toggleOpenLocation
            );
            _markers.push(_marker);
          }

          setMarkers(_markers);
        }}
        options={{
          mapTypeId: mapTypeId,
          // zoomControl: !isScreenCapturing,
          // fullscreenControl: !isScreenCapturing,
          zoomControl: false,
          fullscreenControl: false,
        }}
      ></GoogleMapReact>
      <LocationBottomSheet
        open={openLocationBS}
        lat={selectedMarker?.position.lat() ?? defaultCenter.lat}
        lng={selectedMarker?.position.lng() ?? defaultCenter.lng}
        onClose={() => setOpenLocationBS(false)}
      />
    </div>
  );
};

export default Maps;

function getCenter(points: GoogleMapReact.Coords[]): GoogleMapReact.Coords {
  const lat = points.reduce((acc, point) => acc + point.lat, 0) / points.length;
  const lng = points.reduce((acc, point) => acc + point.lng, 0) / points.length;
  return { lat, lng };
}

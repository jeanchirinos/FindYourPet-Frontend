'use client'
import { Skeleton } from '@nextui-org/skeleton'
import { GoogleMap, useJsApiLoader } from '@react-google-maps/api'
import { memo, useCallback, useState } from 'react'

const containerStyle = {
  // width: '400px',
  width: '100%',
  height: '100%',
}

const center = {
  lat: -12.05718,
  lng: -77.038058,
}

function PetMap() {
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: '',
  })

  const [map, setMap] = useState(null)

  // const onLoad = useCallback(function callback(map) {
  const onLoad = useCallback((map: any) => {
    // This is just an example of getting and using the map instance!!! don't just blindly copy!
    const bounds = new window.google.maps.LatLngBounds(center)
    map.fitBounds(bounds)

    setMap(map)
  }, [])

  const onUnmount = useCallback(() => {
    setMap(null)
  }, [])

  return isLoaded ? (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={center}
      zoom={3}
      onLoad={onLoad}
      onUnmount={onUnmount}
    >
      {/* Child components, such as markers, info windows, etc. */}
      <></>
    </GoogleMap>
  ) : (
    <Skeleton className='size-full' />
  )
}

export default memo(PetMap)

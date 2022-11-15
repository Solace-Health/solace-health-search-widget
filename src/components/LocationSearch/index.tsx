import * as React from 'react';
import GooglePlacesAutocomplete from 'react-google-places-autocomplete';

const LocationSearch = () => {
  return (
    <div>
      <GooglePlacesAutocomplete
        apiKey="AIzaSyBGOo1GJODONvZ_02ouO1lm0NnEPsZks7k"
      />
    </div>
  )
}

export default LocationSearch;


 // @ts-nocheck
import * as React from 'react';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import usePlacesAutocomplete, {
  getGeocode,
  getLatLng,
} from "use-places-autocomplete";
import "./LocationSearch.css"

interface LocationSearch {
  onHandleSelect?: (data: any) => void
}
const LocationSearch = ({ address, onHandleSelect }: LocationSearch) => {
  const [address, setAddress] = React.useState('')

  const {
    ready,
    value,
    suggestions: { status, data },
    setValue,
    clearSuggestions,
  } = usePlacesAutocomplete({
    debounce: 300,
  });

  const handleInput = (e) => setValue(e.target.value);

  const handleSelect = (description) => {
    setValue(description, false);
    clearSuggestions();

    // Get latitude and longitude via utility functions
    getGeocode({ address: description }).then((results) => {
      const { lat, lng } = getLatLng(results[0]);
      onHandleSelect({ address: description, lat, lng })
    });
  };

  return (
      <Autocomplete
        freeSolo
        disableClearable
        options={data.map((option) => option.description)}
        renderInput={(params) => (
          <TextField
            {...params}
            placeholder="Search for location..."
            onSelect={(data) => handleSelect(data.target.value)}
            value={value}
            onChange={handleInput}
            shrink={false}
          />
        )}
      />  
  );
}

export default LocationSearch;

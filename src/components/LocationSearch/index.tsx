
 // @ts-nocheck
import * as React from 'react';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import InputBase from '@mui/material/InputBase';
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

  const handleChange = address => {
    setAddress(address);
  };

  const {
    ready,
    value,
    suggestions: { status, data },
    setValue,
    clearSuggestions,
  } = usePlacesAutocomplete({
    debounce: 300,
  });

  const handleInput = (e) => {
    // Update the keyword of the input element
    console.log(e.target.value)
    setValue(e.target.value);
  };

  const handleSelect =
    ({ description }) =>
    () => {
      // When user selects a place, we can replace the keyword without request data from API
      // by setting the second parameter to "false"
      setValue(description, false);
      clearSuggestions();

      // Get latitude and longitude via utility functions
      getGeocode({ address: description }).then((results) => {
        const { lat, lng } = getLatLng(results[0]);
        console.log("📍 Coordinates: ", { lat, lng });
      });
    };

  const renderSuggestions = () =>
    data.map((suggestion) => {
      const {
        place_id,
        structured_formatting: { main_text, secondary_text },
      } = suggestion;

      return (
        <li key={place_id} onClick={handleSelect(suggestion)}>
          <strong>{main_text}</strong> <small>{secondary_text}</small>
        </li>
      );
    });

  console.log(data)

  return (
      <Autocomplete
        freeSolo
        disableClearable
        options={data.map((option) => option.description)}
        renderInput={(params) => (
          <TextField
            {...params}
            placeholder="Search for location..."
            value={value}
            sx={{ height: 50, width: 300 }}
            onChange={handleInput}
            shrink={false}
          />
        )}
      />  
  );
}

export default LocationSearch;

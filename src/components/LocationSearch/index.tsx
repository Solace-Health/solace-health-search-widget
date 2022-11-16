
 // @ts-nocheck
import * as React from 'react';
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from 'react-places-autocomplete';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import { styled } from '@mui/system';

interface LocationSearch {
  onHandleSelect?: (data: any) => void
}
const LocationSearch = ({ address, onHandleSelect }: LocationSearch) => {
  const [address, setAddress] = React.useState('')

  const handleChange = address => {
    setAddress(address);
  };

  const handleSelect = address => {
    geocodeByAddress(address)
      .then(results => getLatLng(results[0]))
      .then(latLng => {
        onHandleSelect({ address, ...latLng })
      })
      .catch(error => console.error('Error', error));
  };

  const StyledContainer = styled('div')`
  width: 300px;
  `

  return (
    
    <PlacesAutocomplete
      value={address}
      onChange={handleChange}
      onSelect={handleSelect}
    >
      {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
        <div>
        
          <Autocomplete
            freeSolo
            disablePortal
            disableClearable
            options={suggestions.map((option) => option.description)}
            renderInput={(params) => (
              <TextField
                {...params}
                label={"Find Location"}
                onChange={(data) => handleChange(data.target.value)}
                onSelect={(data) => handleSelect(data.target.value)}
                sx={{
                  width: 300,
                }}
                {...getInputProps({
                  
                  placeholder: 'Enter location',
                  className: 'location-search-input',
                })}
              />
            )}
          />
          
        </div>
      )}
    </PlacesAutocomplete>
    
  );
  
}

export default LocationSearch;

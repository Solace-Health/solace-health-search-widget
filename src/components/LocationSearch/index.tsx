import * as React from "react";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import usePlacesAutocomplete, {
  getGeocode,
  getLatLng,
} from "use-places-autocomplete";
import "./LocationSearch.css";

interface LocationSearch {
<<<<<<< Updated upstream
  onHandleSelect?: (data: {
    address: string;
    lat: number;
    lng: number;
  }) => void;
  register?: any;
  error?: any;
=======
  onHandleSelect?: (data: {address: string, lat: number, lng: number}) => void
>>>>>>> Stashed changes
}
const LocationSearch = ({ onHandleSelect }: LocationSearch) => {
  const {
    ready,
    value,
    suggestions: { status, data },
    setValue,
    clearSuggestions,
  } = usePlacesAutocomplete({
    debounce: 300,
  });

<<<<<<< Updated upstream
  const handleInput = (e: { target: { value: string } }) =>
    setValue(e.target.value);
=======
  const handleInput = (e: {target: {value: string}}) => setValue(e.target.value)
>>>>>>> Stashed changes

  const handleSelect = (description: string) => {
    // debugger
    setValue(description, false);
    clearSuggestions();

    // Get latitude and longitude via utility functions
    getGeocode({ address: description }).then((results) => {
      const { lat, lng } = getLatLng(results[0]);
<<<<<<< Updated upstream
      onHandleSelect({ address: description, lat, lng });
    });
  };

  return (
    <Autocomplete
      style={{ alignSelf: "flex-start" }}
      freeSolo
      disableClearable
      options={data.map((option) => option.description)}
      renderInput={(params) => (
        <TextField
          {...params}
          name="location"
          placeholder="Search for location..."
          onSelect={(data: any) => handleSelect(data.target.value)}
          value={value}
          onChange={handleInput}
          {...register("location.address", {
            minLength: { value: 1, message: "This field is required." },
          })}
        />
      )}
    />
=======
      onHandleSelect({ address: description, lat, lng })
    }).catch(e => {});
  };

  return (
      <Autocomplete
        style={{alignSelf: 'flex-start'}}
        freeSolo
        disableClearable
        options={data.map((option) => option.description)}
        renderInput={(params) => (
          <TextField
            {...params}
            name="location"
            placeholder="Search for location..."
            onSelect={(data: any) => handleSelect(data.target.value)}
            value={value}
            onChange={handleInput}
          />
        )}
      />  
>>>>>>> Stashed changes
  );
};

export default LocationSearch;

import * as React from "react";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import usePlacesAutocomplete, {
  getGeocode,
  getLatLng,
} from "use-places-autocomplete";
import "./LocationSearch.css";

interface LocationSearch {
  onHandleSelect?: (data: {
    address: string;
    lat: number;
    lng: number;
  }) => void;
  register?: any;
  error?: any;
}
const LocationSearch = ({ onHandleSelect, register }: LocationSearch) => {
  const {
    ready,
    value,
    suggestions: { status, data },
    setValue,
    clearSuggestions,
  } = usePlacesAutocomplete({
    debounce: 300,
  });

  const handleInput = (e: { target: { value: string } }) =>
    setValue(e.target.value);

  const handleSelect = (description: string) => {
    setValue(description, false);
    clearSuggestions();

    // Get latitude and longitude via utility functions
    getGeocode({ address: description }).then((results) => {
      const { lat, lng } = getLatLng(results[0]);
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
  );
};

export default LocationSearch;

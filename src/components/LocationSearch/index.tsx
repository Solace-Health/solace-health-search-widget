import * as React from "react";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import usePlacesAutocomplete, {
  getGeocode,
  getLatLng,
} from "use-places-autocomplete";
import "./LocationSearch.css";
import styled from "@emotion/styled";
import { InputAdornment } from "@mui/material";

interface LocationSearch {
  onHandleSelect?: (data: {
    address: string;
    lat: number;
    lng: number;
  }) => void;
  icon: React.ReactNode;
}

const IconWrapper = styled("div")`
  display: flex;
  margin-right: 15px;
  width: 26px;
  min-width: 26px;
  max-width: 26px;
`;

const LocationSearch = ({ icon, onHandleSelect }: LocationSearch) => {
  const {
    value,
    suggestions: { data },
    setValue,
    clearSuggestions,
  } = usePlacesAutocomplete({
    requestOptions: {
      types: ["locality", "postal_code"],
      componentRestrictions: { country: "us" },
    },
    debounce: 300,
  });

  const handleInput = (e: { target: { value: string } }) => {
    setValue(e.target.value);
    onHandleSelect({ address: e.target.value, lat: null, lng: null });
  };

  const handleSelect = (description: string) => {
    setValue(description, false);
    clearSuggestions();

    if (description.length <= 2) return;

    // Get latitude and longitude via utility functions
    getGeocode({ address: description })
      .then((results) => {
        const { lat, lng } = getLatLng(results[0]);
        onHandleSelect({ address: description, lat, lng });
      })
      .catch((e) => console.log(`Google Maps API error: ${e}`));
  };

  return (
    <Autocomplete
      freeSolo
      disableClearable
      options={data.map((option) => option.description)}
      renderInput={(params) => (
        <>
          <TextField
            {...params}
            InputProps={{
              ...params.InputProps,
              startAdornment: (
                <InputAdornment position="start">
                  <IconWrapper>{icon}</IconWrapper>
                </InputAdornment>
              ),
            }}
            name="location"
            placeholder="City or Zip Code"
            onSelect={(data: any) => handleSelect(data.target.value)}
            value={value}
            onChange={handleInput}
          />
        </>
      )}
    />
  );
};

export default LocationSearch;

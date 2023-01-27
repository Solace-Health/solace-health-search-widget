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
import { Location } from "../../Widget";

interface LocationSearch {
  onHandleSelect?: (data: Location) => void;
  icon: React.ReactNode;
}

type GeocodeResult = {
  address_components: [
    {
      long_name: string;
      short_name: string;
      types: ["postal_code"]; // Zip
    },
    {
      long_name: string;
      short_name: string;
      types: ["locality", "political"]; // City
    },
    {
      long_name: string;
      short_name: string;
      types: ["administrative_area_level_3", "political"];
    },
    {
      long_name: string;
      short_name: string;
      types: ["administrative_area_level_2", "political"];
    },
    {
      long_name: "New York";
      short_name: string;
      types: ["administrative_area_level_1", "political"]; // State
    },
    {
      long_name: "United States";
      short_name: "US";
      types: ["country", "political"];
    }
  ];
};

const IconWrapper = styled("div")`
  display: flex;
  margin-right: 15px;
  width: 26px;
  min-width: 26px;
  max-width: 26px;
`;

const getCityStateZip = (result: {
  address_components: { short_name: string; types: string[] }[];
}): { city: string; state: string; zip: string } => {
  let city;
  let state;
  let zip;

  result.address_components.forEach((component) => {
    const isCity = component.types.some((type) => type === "locality");
    const isState = component.types.some(
      (type) => type === "administrative_area_level_1"
    );
    const isZip = component.types.some((type) => type === "postal_code");

    if (isCity) {
      city = component.short_name;
    } else if (isState) {
      state = component.short_name;
    } else if (isZip) {
      zip = component.short_name;
    }
  });

  return { city, state, zip };
};

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
    onHandleSelect({
      address: e.target.value,
      lat: null,
      lng: null,
      city: null,
      state: null,
      zip: null,
    });
  };

  const handleSelect = (description: string) => {
    setValue(description, false);
    clearSuggestions();

    if (description.length <= 2) return;

    getGeocode({ address: description })
      .then((results) => {
        console.log(results);
        const { city, state, zip } = getCityStateZip(results[0]);
        const { lat, lng } = getLatLng(results[0]);
        onHandleSelect({
          address: description,
          lat,
          lng,
          city,
          state,
          zip,
        });
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

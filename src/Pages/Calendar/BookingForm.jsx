import { useState } from "react";
import { makeupArtist } from "../../../time";

const BookingForm = ({ setSelectedArtist, date }) => {
  const [form, setForm] = useState({});
  const [selectArtist, setSelectArtist] = useState({});
  const [selectLocation, setSelectLocation] = useState("");


  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });

    if (e.target.name === "location") {
      setSelectLocation(e.target.value);

      const artistLocation = makeupArtist.find(
        (artist) => artist.location === e.target.value
      );
      if (artistLocation) {
        setSelectArtist(artistLocation.employee);
        console.log(
          `artistLocation.employee: ${JSON.stringify(artistLocation)}`
        );
      } else {
        setSelectArtist({});
      }
    }
    if (e.target.name === "artist") {
      const selectedArtist = selectArtist.find(
        (artist) => artist.name === e.target.value
      );

      setSelectedArtist(selectedArtist);
      console.log(
        `selectedArtist in BookingForm: ${JSON.stringify(selectedArtist)}`
      );
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>Name:</label>
      <input type="text" name="name" onChange={handleChange} />
      <br />
      <label>Email:</label>
      <input type="text" name="email" onChange={handleChange} />

      <label htmlFor="location">Choose a location:</label>

      <select name="location" onChange={handleChange}>
        <option value="">--Please choose location</option>
        {makeupArtist.map((artist, index) => {
          return (
            <option key={index} value={artist.location}>
              {" "}
              {artist.location}
            </option>
          );
        })}
      </select>

      {selectLocation && (
        <select name="artist" onChange={handleChange}>
          <option value="">--Please select makeup artist</option>
          {selectArtist.map((artist, index) => (
            <option key={index} value={artist.name}>
              {" "}
              {artist.name}
              {/* {console.log(artist)} */}
            </option>
          ))}
        </select>
      )}

      <button type="submit">Submit Booking</button>
    </form>
  );
};

export default BookingForm;

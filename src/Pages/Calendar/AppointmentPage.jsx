import "react-calendar/dist/Calendar.css";
import { useState } from "react";
import Calendar from "react-calendar";
import "../App.css";
import Times from "./Times";
import BookingForm from "./BookingForm";

const AppointmentPage = () => {
  const [date, setDate] = useState(new Date());
  const [showTime, setShowTime] = useState(false);
  const [selectArtist, setSelectedArtist] = useState([]);
  console.log(`selectArtist in ApptPage: ${JSON.stringify(selectArtist)}`);
  const todayDate = () => {
    let today = new Date();
    return today;
  };

  const getMinDate = (artist) => {
    const startDate = artist.workingSchedule[0].startDate;
    // console.log(`minDate: ${startDate}`)
    return startDate;
  };

  const getMaxDate = (artist) => {
    const endDate = artist.workingSchedule[0].endDate;
    // console.log(`maxDate: ${endDate}`)
    return endDate;
  };

  return (
    <div className="app">
      <h1 className="header">Calendar</h1>
      <BookingForm
        setSelectedArtist={setSelectedArtist}
        showTime={showTime}
        date={date}
      />
      {showTime ? (
        <Times date={date} selectArtist={selectArtist} showTime={showTime} />
      ) : null}
      <div>
        <Calendar
          onChange={setDate}
          value={date}
          onClickDay={() => {
            setShowTime(true);
          }}
          minDate={
            selectArtist && selectArtist.workingSchedule
              ? new Date(getMinDate(selectArtist)) && todayDate()
              : todayDate()
          }
          maxDate={
            selectArtist && selectArtist.workingSchedule
              ? new Date(getMaxDate(selectArtist))
              : todayDate()
          }
        />
      </div>
      <p>
        <span>Date Selected:</span>
        {date.toLocaleDateString("en-UK")}
      </p>
    </div>
  );
};

export default AppointmentPage;
//

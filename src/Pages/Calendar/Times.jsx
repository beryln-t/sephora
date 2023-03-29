import React, { useState, useEffect } from "react";
import "../App.css";
import { makeupArtist } from "../../../time";

const now = new Date();
const currentTime = now.toLocaleTimeString([], {
  hour: "2-digit",
  minute: "2-digit",
  hour12: false,
});

function timeToMins(time) {
  console.log(`time: ${time}`);
  const [hours, minutes] = time.split(":");
  // console.log(`Received time: ${time}`);
  // console.log(`Parsed hours: ${hours}, Parsed minutes: ${minutes}`);
  const calculateInMins = parseInt(hours) * 60 + parseInt(minutes);
  return calculateInMins;
}

const checkTimeSlot = (startTime) => {
  const startTimeInMins = timeToMins(startTime);
  const currTimeInMins = timeToMins(currentTime);

  return currTimeInMins > startTimeInMins;
};

function Times({ date, selectLocation, selectArtist }) {
  const [event, setEvent] = useState(null);
  const [info, setInfo] = useState(false);
  const [dateChanged, setDateChanged] = useState(false);
  const [apptTiming, setApptTiming] = useState([]);

  const makeAppt = (preAppointments) => {
    return [...apptTiming, preAppointments];
  };

  console.log("selectLocation in Times:", selectLocation);
  console.log("selectArtist in Times:", selectArtist);
  
  function displayInfo(e) {
    setInfo(true);
    setEvent(e.target.innerText);
    setDateChanged(false);
    setApptTiming(
      makeAppt({
        date: date.toLocaleDateString("en-UK"),
        timeSlot: e.target.innerText,
        makeupArtist: selectArtist,
        location: selectLocation,
      })
    );
  }

  useEffect(() => {
    console.log(apptTiming);
  }, [apptTiming]);

  const todayDate = new Date();
  const futureDate = date > todayDate;

  useEffect(() => {
    setDateChanged(true);
    setInfo(false);
  }, [date]);

  const isTimeSlotWithinWorkingHours = async (startTime, endTime, selectArtist) => {
    console.log(selectArtist);
    const artist = await selectArtist;
    const workingHourStartInMins = timeToMins(artist.workingHours[0].startTime);
    const workingHourEndInMins = timeToMins(artist.workingHours[0].endTime);
    const timeSlotStartInMins = timeToMins(startTime);
    const timeSlotEndInMins = timeToMins(endTime);
  
    console.log(`workingHourStartInMins: ${workingHourStartInMins}`);
    console.log(`workingHourEndInMins: ${workingHourEndInMins}`);
    console.log(`timeSlotStartInMins: ${timeSlotStartInMins}`);
    console.log(`timeSlotEndInMins: ${timeSlotEndInMins}`);
  
    return (
      timeSlotStartInMins >= workingHourStartInMins &&
      timeSlotEndInMins <= workingHourEndInMins
    );
  };

  const isTimeSlotWithinBreakTime = async (startTime, endTime, selectArtist) => {
    const artist = await selectArtist;
    const breakStartTimeInMins = timeToMins(artist.breakTime[0].startTime);
    const breakEndTimeInMins = timeToMins(artist.breakTime[0].endTime);
    const breakTimeSlotStartTimeInMins = timeToMins(startTime);
    const breakTimeSlotEndTimeInMins = timeToMins(endTime);
  
    console.log(`breakStartTimeInMins: ${breakStartTimeInMins}`);
    console.log(`breakEndTimeInMins: ${breakEndTimeInMins}`);
    console.log(`breakTimeSlotStartTimeInMins: ${breakTimeSlotStartTimeInMins}`);
    console.log(`breakTimeSlotEndTimeInMins: ${breakTimeSlotEndTimeInMins}`);
  
    return (
      breakStartTimeInMins >= breakTimeSlotStartTimeInMins &&
      breakEndTimeInMins <= breakTimeSlotEndTimeInMins
    );
  };

 const timeSlotDisabled = async (startTime, futureDate, endTime) => {
  const isPastTimeSlot = checkTimeSlot(startTime) && !futureDate;
  const isMakeUpArtistWithinWorkingHours = await isTimeSlotWithinWorkingHours(
    startTime,
    endTime,
    selectArtist
  );
  const isMakeUpArtistWithinBreakHours = await isTimeSlotWithinBreakTime(
    startTime,
    endTime,
    selectArtist
  );
  return (
    isPastTimeSlot ||
    !isMakeUpArtistWithinWorkingHours ||
    isMakeUpArtistWithinBreakHours
  );
};


  const disabledTimeslotForBooking = (findDate, findTimeSlot) => {
    // console.log(`findDate: ${findDate}`);
    // console.log(`findTimeSlot: ${findTimeSlot}`);
    const checkBooking = apptTiming.find(
      (appt) => appt.date === findDate && appt.timeSlot === findTimeSlot
    ); //find for appt made for the same date and that time slot
    console.log(`checkBooking: ${checkBooking}`);
    return checkBooking;
  };

  return (
    <div className="times">
      {time.map((times, index) => {
        const startTime = times.split(" - ")[0];
        const endTime = times.split(" - ")[1];
        //console.log(startTime)
        // const disabledTime = checkTimeSlot(startTime) && !futureDate || disabledTimeslotForBooking(date.toLocaleDateString("en-UK"), times);
        const disabledTime =
          timeSlotDisabled(startTime, futureDate, endTime) ||
          disabledTimeslotForBooking(date.toLocaleDateString("en-UK"), times);
        return (
          <div key={index}>
            <button onClick={(e) => displayInfo(e)} disabled={disabledTime}>
              {times}
            </button>
          </div>
        );
      })}
      <div>
        {!dateChanged && info
          ? `Makeup session booked on ${date.toLocaleDateString(
              "en-UK"
            )} for timeslot ${event}.`
          : null}
      </div>
    </div>
  );
}

export default Times;

import React, { useState, useEffect } from "react";
import { gapi } from "gapi-script";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import axios from "axios";
import { MyApiUrl } from "../services/service";
import moment from "moment";
import "../App.css";

const CLIENT_ID =
  "42125472539-jjbouj26bil9h1icga858o7ng5p3u247.apps.googleusercontent.com";
const API_KEY = "AIzaSyDY14P01K1UdYumM_gYFC55qNKtPFH0UVA";
const CALENDAR_ID = "primary";
const SCOPES = "https://www.googleapis.com/auth/calendar.readonly";

const PatientViewAppointment = () => {
  const [events, setEvents] = useState([]);
  let PatientID = localStorage.getItem("PatientID");
  const [countdown, setCountdown] = useState("");

  const GetPatientProfile = () => {
    axios
      .get(MyApiUrl + "AppointmentsByPatientEvent/" + PatientID)
      .then((response) => {
        if (response.data.length > 0) {
          console.log(response.data[1].start.dateTime);
          setEvents(response.data);

          const sortedAppointments = response.data.sort(
            (a, b) => new Date(b.start.dateTime) - new Date(a.start.dateTime)
          );

          console.log("Most recent appointment: ", sortedAppointments[0]);

          // Assuming you want to update the countdown for the first appointment
          updateCountdown(sortedAppointments[0].start.dateTime); // Change index if needed
        }
      })
      .catch((error) => {
        console.error("Error fetching patient profile:", error);
      });
  };

  const updateCountdown = (appointmentDate) => {
    const appointmentTime = moment(appointmentDate);
    const currentTime = moment();
  
    console.log("Current Time: ", currentTime.format());
    console.log("Appointment Time: ", appointmentTime.format());
  
    if (appointmentTime.isAfter(currentTime)) {
      const totalMs = appointmentTime.diff(currentTime);
  
      const msPerDay = 1000 * 60 * 60 * 24;
      const msPerHour = 1000 * 60 * 60;
      const msPerMinute = 1000 * 60;
      const msPerSecond = 1000;
  
      const days = Math.floor(totalMs / msPerDay);
      const hours = Math.floor((totalMs % msPerDay) / msPerHour);
      const minutes = Math.floor((totalMs % msPerHour) / msPerMinute);
      const seconds = Math.floor((totalMs % msPerMinute) / msPerSecond);
  
      let timeRemaining = "";
  
      if (days > 0) {
        timeRemaining = `${days} day(s) ${hours} hour(s) left`;
      } else if (hours > 0) {
        timeRemaining = `${hours} hour(s) ${minutes} minute(s) left`;
      } else if (minutes > 0) {
        timeRemaining = `${minutes} minute(s) ${seconds} second(s) left`;
      } else {
        timeRemaining = `${seconds} second(s) left`;
      }
  
      setCountdown(timeRemaining);
    } else {
      setCountdown("Your appointment has already passed.");
    }
  };
  

  const initClient = () => {
    console.log("Initializing Google API Client...");

    gapi.client
      .init({
        apiKey: API_KEY,
        clientId: CLIENT_ID,
        discoveryDocs: [
          "https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest",
        ],
        scope: SCOPES,
      })
      .then(() => {
        console.log("gapi client initialized.");
      })
      .catch((error) => {
        console.error("Error initializing gapi client: ", error);
      });
  };

  const eventsForDays = events.reduce((acc, event) => {
    const eventDate = new Date(event.start.dateTime || event.start.date);
    const dateKey = eventDate.toLocaleDateString();
    if (!acc[dateKey]) {
      acc[dateKey] = [];
    }
    acc[dateKey].push(event);
    return acc;
  }, {});

  useEffect(() => {
    // Fetch patient profile when the component mounts
    gapi.load("client:auth2", initClient);
    GetPatientProfile();

    // Set interval to update the countdown every second
    // const interval = setInterval(() => {
    //   if (events.length > 0) {
    //     updateCountdown(events[0].dateTime); // Update countdown for the first event
    //   }
    // }, 1000);

    // // Clean up the interval when the component unmounts
    // return () => clearInterval(interval);
  }, [events]);

  return (
    <React.Fragment>
      <main>
        <div className="mb-4 pb-4"></div>
        <section className="about-us container">
          <div className="mw-930">
            <div className="row">
              <div className="col-md-6">
                <h2 className="page-title">All Your Appointment</h2>
              </div>
              <div className="col-md-6">
                <p
                  className="page-title"
                  style={{
                    textAlign: "right",
                    fontSize: "25px",
                    fontWeight: "600",
                    marginTop: "2%",
                  }}
                >
                  Upcoming Appointment: {countdown}
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="container" style={{ marginBottom: "10%" }}>
          <div className="row">
            <div className="col-md-12">
              <div
                className="calendar-container"
                style={{ width: "100%", maxWidth: "100%", padding: 0 }}
              >
                <Calendar
                  tileContent={({ date, view }) => {
                    const dateKey = date.toLocaleDateString();
                    if (eventsForDays[dateKey]) {
                      return (
                        <ul
                          style={{
                            margin: 0,
                            padding: 0,
                            fontSize: "10px",
                            marginTop: "10%",
                          }}
                        >
                          {eventsForDays[dateKey].map((event) => (
                            <li
                              key={event.id}
                              style={{ color: "blue", fontSize: "12px" }}
                            >
                              {event.summary}
                            </li>
                          ))}
                        </ul>
                      );
                    }
                    return null;
                  }}
                />
              </div>
            </div>
          </div>
        </section>
      </main>
    </React.Fragment>
  );
};

export default PatientViewAppointment;

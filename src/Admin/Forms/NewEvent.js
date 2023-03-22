import React, { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import { DateTime, Duration, Interval } from 'luxon';
import axios from 'axios';
import { showAlert } from '../../alert';

const NewEventForm = () => {
  const [activeDate, setActiveDate] = useState(DateTime.now());
  const [timeslots, setTimeslots] = useState([]);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    category: 'meditation',
    price: 10,
    start: '',
    end: '',
    capacity: 7,
  });

  useEffect(() => {
    // Working Hours: Weekdays, 6pm - 9 pm; Weekend, 12pm - 8pm
    let workingHours;
    if (activeDate.weekday === 6 || activeDate.weekday === 7) {
      workingHours = Interval.fromDateTimes(
        activeDate.set({ hour: 12, minute: 0, second: 0 }),
        activeDate.set({ hour: 20, minute: 0, second: 0 })
      );
    } else {
      workingHours = Interval.fromDateTimes(
        activeDate.set({ hour: 18, minute: 0, second: 0 }),
        activeDate.set({ hour: 21, minute: 0, second: 0 })
      );
    }

    createTimeSlots(workingHours);
  }, [activeDate]);

  const createTimeSlots = (workingHours) => {
    // workingHours is a luxon Interval
    const timeslots = workingHours.splitBy({ minutes: 15 });
    updateFormData('start', timeslots[0].start.toISO());
    updateFormData('end', timeslots[0].end.toISO());
    setTimeslots(timeslots);
  };

  const updateActiveDate = (value) => {
    setActiveDate(DateTime.fromJSDate(value));
  };

  const updateFormData = (key, value) => {
    setFormData((prevState) => {
      let data = Object.assign({}, prevState);
      return Object.defineProperty(data, key, {
        value,
      });
    });
  };

  const createEvent = async (e) => {
    e.preventDefault();
    try {
      await axios({
        method: 'POST',
        url: 'http://127.0.0.1:3000/api/v1/events/create-event',
        withCredentials: true,
        data: formData,
      }).then(() => {
        console.log('Event created!');
        setFormData({
          name: '',
          description: '',
          category: 'meditation',
          price: 10,
          start: '',
          end: '',
          capacity: 7,
        });
        showAlert('Event created!');
      });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <form onSubmit={createEvent}>
        <Calendar
          calendarType="US"
          onChange={updateActiveDate}
          minDate={new Date()}
        />
        <label htmlFor="category">Category:</label>
        <select
          id="category"
          onChange={(e) => {
            updateFormData('category', e.target.value);
          }}
          required
        >
          <option value="meditation">Meditation</option>
          <option value="workshop">Workshop</option>
        </select>
        <br />
        <label htmlFor="name">Name Your Event:</label>
        <input
          type="text"
          id="name"
          value={formData.name}
          onChange={(e) => {
            updateFormData('name', e.target.value);
          }}
          required
        />
        <br />
        <label htmlFor="description">Description:</label>
        <input
          type="text"
          id="description"
          value={formData.description}
          onChange={(e) => {
            updateFormData('description', e.target.value);
          }}
          required
        />
        <br />
        <label htmlFor="price">Price:</label>
        <input
          type="number"
          id="price"
          value={formData.price}
          onChange={(e) => {
            updateFormData('price', Number(e.target.value));
          }}
          required
        />
        <br />
        <label htmlFor="start">Start:</label>
        <select
          id="start"
          onChange={(e) => {
            updateFormData('start', e.target.value);
          }}
          value={formData.start}
          required
        >
          {timeslots.map((timeslot, index) => {
            return (
              <option key={index} value={timeslot.start.toISO()}>
                {timeslot.start.toLocaleString(DateTime.TIME_SIMPLE)}
              </option>
            );
          })}
        </select>
        <br />
        <label htmlFor="end">End:</label>
        <select
          id="end"
          onChange={(e) => {
            updateFormData('end', e.target.value);
          }}
          value={formData.end}
          required
        >
          {timeslots.map((timeslot, index) => {
            return (
              <option key={index} value={timeslot.end.toISO()}>
                {timeslot.end.toLocaleString(DateTime.TIME_SIMPLE)}
              </option>
            );
          })}
        </select>
        <br />
        <label htmlFor="capacity">Max Capacity:</label>
        <select
          id="capacity"
          onChange={(e) => {
            updateFormData('capacity', e.target.value);
          }}
          value={formData.capacity}
          required
        >
          <option>7</option>
          <option>6</option>
          <option>5</option>
          <option>4</option>
          <option>3</option>
          <option>2</option>
          <option>1</option>
        </select>
        <button type="submit">Submit</button>
      </form>
    </>
  );
};

export default NewEventForm;

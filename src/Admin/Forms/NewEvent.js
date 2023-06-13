import React, { useState, useEffect, useContext } from 'react';
import Calendar from 'react-calendar';
import { DateTime, Duration, Interval } from 'luxon';
import { EventContext } from '../../Context/EventContext';
import { showAlert } from '../../alert';
import { createUseStyles } from 'react-jss';
import adminStyles from '../adminStyles';

const useStyles = createUseStyles(adminStyles);
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

  const classes = useStyles();

  const { createEvent } = useContext(EventContext);

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    await createEvent(formData).then(() => {
      setFormData({
        name: '',
        description: '',
        category: 'meditation',
        price: 10,
        start: '',
        end: '',
        capacity: 7,
      });
      showAlert('Event created!', 'success');
    });
  };
  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className={classes.formSection}>
          <h3 className={classes.fsHeading}>Event Details</h3>
          <div className={classes.fsRow}>
            <label htmlFor="category" className={classes.label}>
              Category:
            </label>
            <select
              className={classes.select}
              id="category"
              onChange={(e) => {
                updateFormData('category', e.target.value);
              }}
              required
            >
              <option value="meditation">Meditation</option>
              <option value="workshop">Workshop</option>
            </select>
          </div>
          <div className={classes.fsRow}>
            <label htmlFor="name" className={classes.label}>
              Name:
            </label>
            <input
              type="text"
              className={classes.textInput}
              id="name"
              value={formData.name}
              onChange={(e) => {
                updateFormData('name', e.target.value);
              }}
              required
            />
          </div>
          <div className={classes.fsRow}>
            <label htmlFor="description" className={classes.label}>
              Description:
            </label>
            <input
              type="textarea"
              className={classes.textInput}
              id="description"
              value={formData.description}
              onChange={(e) => {
                updateFormData('description', e.target.value);
              }}
              required
            />
          </div>
          <div className={classes.fsRow}>
            <label htmlFor="start" className={classes.label}>
              Start:
            </label>
            <select
              className={classes.select}
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
            <label htmlFor="end" className={classes.label}>
              End:
            </label>
            <select
              className={classes.select}
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
          </div>
          <div className={classes.fsRow}>
            <label htmlFor="price" className={classes.label}>
              Price:
            </label>
            <input
              type="number"
              className={classes.numInput}
              id="price"
              value={formData.price}
              onChange={(e) => {
                updateFormData('price', Number(e.target.value));
              }}
              required
            />
            <label htmlFor="capacity" className={classes.label}>
              Max Capacity:
            </label>
            <select
              className={classes.select}
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
          </div>
        </div>
        <div className={classes.calendar}>
          <Calendar
            calendarType="US"
            onChange={updateActiveDate}
            minDate={new Date()}
          />
        </div>
        <button type="submit" className={classes.submitButton}>
          Submit
        </button>
      </form>
    </>
  );
};

export default NewEventForm;

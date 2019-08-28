import React from 'react';
import style from './calendarSelectTime.module.sass';
import moment from "../timerElement";
import "react-datepicker/dist/react-datepicker.css";
import DatePicker, { registerLocale } from 'react-datepicker';
import ru from "date-fns/locale/ru";
registerLocale("ru", ru);


const CalendarSelectTime = (props) => {
    const {valuesForTimer, updateTrigger} = props;


    return (
        <DatePicker
            selected={new Date(valuesForTimer[Object.keys(valuesForTimer)[0]])}
            dateFormat="MMMM d, yyyy h:mm aa"
            timeFormat="HH:mm"
            timeIntervals={15}
            timeCaption="time"
            locale={ru}
            onChange={(date) => {
                const dateObject = {
                    target: {
                        value: moment(date).format('YYYY-MM-DD')
                    }
                };
                updateTrigger(dateObject, 'send_time')
            }}
            minDate={new Date()}
            className={style.datePickerInput}
            calendarClassName={style}
            showTimeSelect
            style={style}
        />
    )
};

export default CalendarSelectTime;
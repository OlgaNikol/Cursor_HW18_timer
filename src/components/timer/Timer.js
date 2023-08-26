import './Timer.css';

import { Component } from "react";
import Progress from "../progressBar/Progress";

class Timer extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
            hours: this.props.hours,
            minutes: this.props.minutes,
            seconds: this.props.seconds,
            pause: !this.props.autostart,
            time: 0,
            timeLeft: 0,
            step: this.props.step
        }
    }

    componentDidMount() {
        if (this.props.autostart === true) {
            this.startTimer();
        }
    }

    componentWillUnmount() {
        this.pauseTimer();
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        const {hours, minutes, seconds, step} = this.props;
        const {hours : hoursPrev, minutes : minutesPrev, seconds : secondsPrev, step : stepPrev} = prevProps;

        if (hours !== hoursPrev || minutes !== minutesPrev || seconds !== secondsPrev || step !== stepPrev) {
            this.setState({
                hours: hours,
                minutes: minutes,
                seconds: seconds,
                time: hours * (1000 * 60 * 60) + minutes * (1000 * 60) + seconds * 1000,
                timeLeft: hours * (1000 * 60 * 60) + minutes * (1000 * 60) + seconds * 1000,
                step: step
            });

            this.pauseTimer();

            this.props.onTimeChange(`${hours}:${minutes}:${seconds}`);
        }
    }

    tick() {
        this.setState((state) => {
            const time = state.hours * (1000 * 60 * 60) + state.minutes * (1000 * 60) + state.seconds * 1000;
            const timeLeft = time - this.state.step * 1000;
            const hours = Math.floor(timeLeft / (1000 * 60 * 60));
            const minutes = Math.floor((timeLeft / 1000 / 60) % 60);
            const seconds = Math.floor((timeLeft / 1000) % 60);

            if (timeLeft <= 0) {
                this.props.onTimeEnd();
                clearInterval(this.timerId);
                return {
                    hours: 0,
                    minutes: 0,
                    seconds: 0,
                    time: 0,
                    timeLeft: 0,
                    pause: true,
                    step: 1
                }
            } else {
                this.props.onTick(`${hours}:${minutes}:${seconds}`);
            }

            return {
                hours: hours,
                minutes: minutes,
                seconds: seconds,
                timeLeft: timeLeft
            }
        });
    }

    startTimer() {
        this.timerId = setInterval(() => this.tick(), this.state.step * 1000);
        this.setState(() => ({pause: false}));
        this.props.onTimeStart();
    }

    pauseTimer() {
        clearInterval(this.timerId);
        this.setState(() => ({pause: true}));
        this.props.onTimePause();
    }

    toggleTimer() {
        if (this.state.pause) this.startTimer();
        else this.pauseTimer();
    }
    
    render() {
        return (
            <div className="timer">
                <div className="time">{this.state.hours}:{this.state.minutes}:{this.state.seconds}</div>
                <button className="button" onClick={() => this.toggleTimer()}>start/pause</button> <br/>
                <Progress timeLeft={this.state.timeLeft} maxTime={this.state.time}/>
            </div>
        )
    }
}

export default Timer;
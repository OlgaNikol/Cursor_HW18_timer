import './App.css';

import { Component } from "react";
import Timer from "./components/timer/Timer";

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            hours: 0,
            minutes: 0,
            seconds: 0
        };
    }

    render() {
        const onPickingTime = (value, inputType) => {
            let time;
            if (!value || value < 0) time = 0;
            else time = value;
            this.setState({
                [inputType]: time
            });
        }

        return (
            <div className="app">
                <h1>Pick a timer time</h1>
                <div className="timePicker">
                    <div id="timer">
                        <label>Hours</label>
                        <input value={this.state.hours} onChange={(e) => onPickingTime(e.target.value, 'hours')} type="number" min="0" />
                    </div>
                    <div>
                        <label>Minutes</label>
                        <input value={this.state.minutes} onChange={(e) => onPickingTime(e.target.value, 'minutes')} type="number" min="0" />
                    </div>
                    <div>
                        <label>Seconds</label>
                        <input value={this.state.seconds} onChange={(e) => onPickingTime(e.target.value, 'seconds')} type="number" min="0" />
                    </div>
                </div>
                <Timer
                    autostart={false}
                    startTime={this.state}
                    step={2000}
                    onTick={(time) => console.log("Залишилось часу: " + time)}
                    onTimeEnd={() => console.log("Час вийшов!")}
                    onTimeStart={() => console.log("Таймер запущено!")}
                    onTimePause={() => console.log("Таймер на паузі!")}
                    onTimeChange= {(time) => console.log("Час таймеру змінено: " + time)}/>
            </div>
        )
    }
}

export default App;
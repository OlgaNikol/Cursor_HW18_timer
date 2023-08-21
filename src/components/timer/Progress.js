import "./Progress.css";

import { Component } from "react";

const getWidth = (timeLeft, maxTime) => {
    if (timeLeft <= 0) return 0;

    return timeLeft * 100 / maxTime;
};

class Progress extends Component {

    render() {
        const {timeLeft, maxTime} = this.props;

        return (
            <div className="progress">
                <div
                    className="progress-done"
                    style={{
                        width: `${getWidth(timeLeft, maxTime)}%`,
                    }}
                />
            </div>
        );
    }
}

export default Progress;
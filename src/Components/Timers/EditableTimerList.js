import React from "react";
import EditableTimer from "./EditableTimer";

export default class EditableTimerList extends React.Component{
    handleStartClick = (timerId) => {
        this.startTimer(timerId);
    };
    handleStopClick = (timerId) => {
        this.stopTimer(timerId);
    };
    deleteTimer = (timerId) => {
        this.setState({
            timers: this.state.timers.filter(t => t.id !== timerId),
        });
    };
    startTimer = (timerId) => {
        const now = Date.now();
        this.setState({
            timers: this.state.timers.map((timer) => {
                if (timer.id === timerId) {
                    return Object.assign({}, timer, {
                        runningSince: now,
                    });
                } else {
                    return timer;
                } }),
        }); };
    stopTimer = (timerId) => {
        const now = Date.now();this.setState({
            timers: this.state.timers.map((timer) => {
                if (timer.id === timerId) {
                    const lastElapsed = now - timer.runningSince;
                    return Object.assign({}, timer, {
                        elapsed: timer.elapsed + lastElapsed,
                        runningSince: null,
                    });
                } else {
                    return timer;
                }
            }),
        }
        );
    }
    render() {
        const {timers} = this.props;
        const timerList = timers.map((t)=>(
                <EditableTimer
                    key={t.id}
                    id={t.id}
                    title={t.title}
                    project={t.project}
                    elapsed={t.elapsed}
                    runningSince={t.runningSince}
                    onStartClick={this.props.onStartClick}
                    onStopClick={this.props.onStopClick}
                />
            )
        );
        return (
            <div className="row d-flex">
                {timerList}
            </div>
            //{timerList}
        );
    }
}
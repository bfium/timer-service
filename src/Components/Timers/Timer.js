import React from "react";
import TimerActionButton from "./TimerActionButton";

export default class Timer extends React.Component{
    timerStyle={
        borderRadius: 10,
        borderStyle: 'solid',
        borderColor: 'var(--bs-body-bg)',
        background: 'var(--bs-body-bg)',
        boxShadow: '0.5px 0.5px 2px 0px var(--bs-secondary-color)'
    };
    btnStyle={
        width: '100%',
        background: 'var(--bs-cyan)',
        borderRadius: 10,
        boxShadow: '0.5px 0.5px 1px var(--bs-btn-active-border-color)'
    }
    handleStartClick = () => {
        this.props.onStartClick(this.props.id);
    };
    handleStopClick = () => {
        this.props.onStopClick(this.props.id);
    };
    render() {
        const {id,title,project,elapsed,runningSince} = this.props;
        return (
            <div className="col m-3">
                <div className="row flex-column p-3" style={this.timerStyle}>
                    <div className="col">
                        <h1>{title}</h1>
                        <h6>{project}</h6>
                    </div>
                    <div className="col">
                        <h1 className="display-1 fw-bold text-center">{elapsed}</h1>
                    </div>
                    <div className="col fs-2 text-end">
                        <i className="far fa-trash-alt px-2"></i>
                        <i onClick={this.props.onEditBtnClick} className="far fa-edit"></i>
                    </div>
                    <div className="col">
                        <button className="btn btn-light btn-lg" type="button" style={this.btnStyle}>Start</button>
                    </div>
                </div>
                <TimerActionButton
                    timerIsRunning={!!this.props.runningSince}
                    onStartClick={this.handleStartClick}
                    onStopClick={this.handleStopClick}
                />
            </div>
        );
    }
}
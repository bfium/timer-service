import React from "react";
import EditableTimerList from "./EditableTimerList";
import ToggleableTimerForm from "./ToggleableTimerForm";

export default class TimersDachboard extends React.Component{
    render() {
        return (
            <div className="ui three column centered grid row ">
                <div className="column">
                    <EditableTimerList/>
                </div>
                <ToggleableTimerForm/>
            </div>
        );
    }

}
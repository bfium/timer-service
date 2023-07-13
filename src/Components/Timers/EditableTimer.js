import React from "react";
import Timer from "./Timer";
import TimerForm from "./TimerForm";

export default class EditableTimer extends React.Component{
    render() {
        return (
            <div >
                <Timer/>
                <Timer/>
                <TimerForm/>
            </div>
        );
    }

}
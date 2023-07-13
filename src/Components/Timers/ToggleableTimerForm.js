import React from "react";

export  default class ToggleableTimerForm extends React.Component{
    render() {
        return (
            <div className='ui basic content center aligned segment'>
                <button className='ui basic button icon'>
                    <i className='plus icon' />
                </button>
            </div>
        );
    }

}
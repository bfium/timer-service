import React from "react";
import EditableTimerList from "./EditableTimerList";
import ToggleableTimerForm from "./ToggleableTimerForm";
import {v4} from "uuid";

export default class TimersDachboard extends React.Component{
    state = {
        timers :[
            {
                title: 'Practice Yoga',
                project: 'Gym Chores',
                id: v4(),
                elapsed: 5456099,
                runningSince: Date.now(),
            }, {
                title: 'Learn to Cook',
                project: 'Kitchen Chores',
                id: v4(),
                elapsed: 1273998,
                runningSince: null,
            },
        ],
    }

    handleCreateTimer=(timer)=>{
        console.log(timer.title+' '+timer.project);

        const t = {
            id: v4(),
            title: timer.title,
            project: timer.project,
            elapsed: Date.now(),
            runningSince: null
        }
        this.setState({timers:this.state.timers.concat(t)});
    }
    handleEditFormSubmit = (attrs) => {
        this.updateTimer(attrs);
    };
    updateTimer=(attrs)=>{
        const updatedTimers = this.state.timers.map((timer)=>{
            if(attrs.id === timer.id){
                return Object.assign({},timer,{title: attrs.title,project:attrs.project});
            }else{
                return timer;
            }
        });
        this.setState({timers:updatedTimers});
    }
    render() {
        return (
            <>
                <div className="row d-flex">
                    <EditableTimerList
                        timers={this.state.timers}
                        onFormSubmit={this.handleEditFormSubmit}
                    />
                </div>
                <div className="col m-3">
                    <ToggleableTimerForm
                        isOpenState={false}
                        onFormSubmit={this.handleCreateTimer}
                    />
                </div>
            </>
        );
    }

}
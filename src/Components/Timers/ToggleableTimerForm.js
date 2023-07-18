import React from "react";
import TimerForm from "./TimerForm";

/*
*   state-dependent-Component: depend on the isOpenState properties, which is set by the parent(TimersDashboard) of this class
*
* */
export  default class ToggleableTimerForm extends React.Component{
    state = {
        isOpenState:false,
    }
    handleIsOpenState=()=>{
        this.setState({isOpenState:true});
    }
    toggleableTimerStyle={
        borderRadius: 10,
        borderStyle: 'solid',
        borderColor: 'var(--bs-body-bg)',
        background:' var(--bs-btn-active-border-color)',
        boxShadow: '0.5px 0.5px 2px 0px var(--bs-secondary-color)'
    }
    btnStyle={
        width: '100%',
        background: 'var(--bs-cyan)',
        borderRadius: 10,
        boxShadow: '0.5px 0.5px 1px var(--bs-btn-active-border-color)'
    }
    handleOnFormSubmit=(timer)=>{
        this.props.onFormSubmit(timer);
        this.setState({isOpenState:false});
    }
    handleOnFormCancel=()=>{
        this.setState({isOpenState:false});
    }
    render() {
        if (this.state.isOpenState){        // state 1
            return (
                <TimerForm
                    onFormSubmit={this.handleOnFormSubmit}
                    onFormCancel={this.handleOnFormCancel}
                />
            );
        }else{
            return (                        // state 2
                <div className="col m-3">
                    <div className="row flex-column p-3" >
                        <div className="col fs-2 text-end d-flex justify-content-center">
                            <button onClick={this.handleIsOpenState} style={this.btnStyle}>+</button>
                        </div>
                    </div>
                </div>
            );
        }
    }

}
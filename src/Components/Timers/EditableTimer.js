import React from "react";
import Timer from "./Timer";
import TimerForm from "./TimerForm";

// a state-dependent Component
export default class EditableTimer extends React.Component{

    handleEditClick = () => {
        this.openForm();
    };
    handleFormClose = () => {
        this.closeForm();
    };
    handleSubmit = (timer) => {
        this.props.onFormSubmit(timer);
        this.closeForm();
    };
    closeForm = () => {
        this.setState({ editFormOpen: false });
    };

    openForm = () => {
        this.setState({ editFormOpen: true });
    };
    render() {
        const {id,title,project,elapsed,runningSince} = this.props;

        if (this.props.editFormOpen) {
            return (
                <TimerForm
                    id={id}
                    title ={title}
                    project={project}
                    onFormSubmit={this.handleSubmit}
                    onFormClose={this.handleFormClose}
                />
            );
        } else {
            return (
                <Timer
                    id={id}
                    title={title}
                    project={project}
                    elapsed={elapsed}
                    runningSince={runningSince}
                    onEditBtnClick={this.handleEditClick}
                    onStartClick={this.props.onStartClick}
                    onStopClick={this.props.onStopClick}
                />
            );
        }
    }
}
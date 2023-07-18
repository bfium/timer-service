import React from "react";

export default class TimerForm extends React.Component{
    state ={
        title:this.props.title ||'',
        project:this.props.project ||'',
        submitText:this.props.id ? 'Update' : 'Create',
    }
    timerStyle={
        borderRadius: 10,
        borderStyle: 'solid',
        borderColor: 'var(--bs-body-bg)',
        background: 'var(--bs-body-bg)',
        boxShadow: '0.5px 0.5px 2px 0px var(--bs-secondary-color)'
    };
    inputStyle={
        width: '100%',
        borderWidth: 0.5,
        borderRadius: 1
    }
    btnStyle={
        width: '50%',
        background: 'var(--bs-body-bg)',
        borderRadius: 10,
        boxShadow: '0.5px 0.5px 1px var(--bs-btn-active-border-color)'
    }

    handleTitleInputChange =(e)=>{
        this.setState({title: e.target.value});
    }
    handleProjectInputChange = (e) => {
        this.setState({title: e.target.value});
    }
    OnSubmitClick = () => {
        // collect the data and send them to the parent handler
        this.props.onFormSubmit({
            id:this.props.id,
            title:this.props.title,
            project:this.props.project,
        })
    }

    render() {
        //const submitText = this.props.id ? 'Update' : 'Create';

        return (
            <div className="col m-3">
                <div className="row flex-column p-3" style={this.timerStyle}>
                    <div className="col mb-3">
                        <h3>Title</h3>
                        <input type="text" onChange={this.handleTitleInputChange} style={this.inputStyle} defaultValue={this.state.title}/>
                        <h5 >Project</h5>
                        <input type="text" onChange={this.handleProjectInputChange} style={this.inputStyle} defaultValue={this.state.project}/>
                    </div>
                    <div className="col">
                        <button
                            className="btn btn-light btn-lg"
                            type="button"
                            style={this.btnStyle}
                            onClick={this.OnSubmitClick}
                        >
                            {this.state.submitText}
                        </button>
                        <button
                            className="btn btn-light btn-lg"
                            type="button"
                            style={this.btnStyle}
                            onClick={this.props.onFormCancel}
                        >
                            Cancel
                        </button>
                    </div>
                </div>
            </div>
        );
    }
}
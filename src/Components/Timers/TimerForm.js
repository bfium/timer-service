import React from "react";

export default class TimerForm extends React.Component{
    render() {
        return (
            <div className="col my-3 ui centered card">
                <div className="row flex-column p-3">
                    <div className="col mb-3">
                        <h5>Title</h5>
                        <input type="text"/>
                        <h5>Project</h5>
                        <input type="text"/>
                    </div>
                    <div className="col">
                        <button className="btn btn-light btn-lg" type="button">Update</button>
                        <button className="btn btn-light btn-lg" type="button">Cancel</button>
                    </div>
                </div>
            </div>
        );
    }
}
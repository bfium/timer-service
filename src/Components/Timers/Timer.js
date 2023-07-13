import React from "react";

export default class Timer extends React.Component{
    render() {
        return (
            <div className="col my-3 ui centered card">
                <div className="row flex-column p-3">
                    <div className="col">
                        <h1>Start Coding</h1>
                        <h6>Heading</h6>
                    </div>
                    <div className="col">
                        <h1 className="display-1 fw-bold text-center">00.00.00.00</h1>
                    </div>
                    <div className="col fs-2 text-end">
                        <i className="far fa-trash-alt px-2"></i>
                        <i className="far fa-edit"></i></div>
                    <div className="col">
                        <button className="btn btn-light btn-lg" type="button">Start</button>
                    </div>
                </div>
            </div>
        );
    }
}
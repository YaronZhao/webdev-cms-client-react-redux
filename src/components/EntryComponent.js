import React from 'react'
import '../styles/entry-component.style.client.css'
import {Link} from "react-router-dom"

const EntryComponent = () =>
    <div className="row align-items-center h-50">
        <div className="col-md-4"/>
        <div className="card text-center col bg-primary border-primary text-white entry-point">
            <div className="card-body">
                <h5 className="card-title pt-5">Whiteboard</h5>
                <Link to="/login"
                      className="btn bg-warning text-dark"
                      style={{textDecoration : 'none'}}>
                    Go To Login
                </Link>
            </div>
        </div>
        <div className="col-md-4"/>
    </div>;

export default EntryComponent;
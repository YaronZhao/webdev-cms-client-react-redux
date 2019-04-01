import React from 'react'
import {Link} from "react-router-dom";

const TableHead = () =>
    <div className="d-none d-sm-block border-bottom">
        <table className="table course-table-head">
            <thead>
                <tr>
                    <th className="course-head-title">Title</th>
                    <th className="course-head-owner">Owned by me</th>
                    <th className="course-head-modify-time">Last modified</th>
                    <th className="course-head-view-sort">
                        <span>
                            <Link to="/course/grid"
                                  className="fas fa-th fa-x"
                                  title="Grid"
                                  role="button"
                                  style={{color:
                                          (window.location.href.indexOf("grid") > -1 ? '#007bff' : '#555555'),
                                          textDecoration: 'none'}}/>
                            <Link to="/course/table"
                                  className="fas fa-list fa-x ml-4"
                                  title="Table"
                                  role="button"
                                  style={{color:
                                          (window.location.href.indexOf("table") > -1 ? '#007bff' : '#555555'),
                                          textDecoration: 'none'}}/>
                            <i className="fas fa-sort-alpha-down fa-lg btn-sort"
                               role="button"/>
                        </span>
                    </th>
                </tr>
            </thead>
        </table>
    </div>;

export default TableHead;

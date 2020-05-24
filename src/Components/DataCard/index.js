import React, { useEffect, useState } from "react";
import axios from "axios";
import "./styles.scss";
import Card from "../Card";
import DropDown from "../Dropdown";
import { Line, Bar } from "react-chartjs-2";

export default props => {
    const [data, setData] = useState({
        label: [],
        data: []
    });

    const [range, setRange] = useState("month");

    const handleChange = e => {
        let value = e.target.value;
        console.log(e);
        setRange(() => value);
    };

    const arrSum = arr => arr.reduce((a, b) => a + b, 0);

    useEffect(() => {
        axios
            .get(
                `${process.env.REACT_APP_BASE_URL}/api/v1/stats/${props.statType}/?range=${range}`
            )
            .then(res => {
                setData(() => res.data.payload);
            });
    }, [range]);
    return (
        <Card className="data-card">
            <div className="data-card-header">
                <h3 className="title">
                    Total{" "}
                    {props.title.charAt(0).toUpperCase() +
                        props.title.substring(1).toLowerCase()}
                </h3>
                {/* <a href="/" className="data-card-link">
                    View report
                </a> */}
                <DropDown change={handleChange}>
                    <option value="year">Year</option>
                    <option value="month">
                        Month
                    </option>
                    <option value="week" selected>Week</option>
                </DropDown>
            </div>
            <div className="data-card-body">
                {props.title ? (
                    <>
                        <div className="data-card-value">
                            {props.title.toLowerCase() === "order" ? (
                                <span className="value">{`${arrSum(data.data)} Orders`}</span>
                            ) : (
                                <span className="value">
                                    $
                                    {(arrSum(data.data)).toLocaleString()}
                                </span>
                            )}

                            {/* <span>-</span> */}
                        </div>
                        <div className="data-card-content">
                            {props.children}

                            <h4>{props.title}</h4>
                            {props.title.toLowerCase() === "order" ? (
                                <Bar
                                    data={{
                                        labels: data.label,
                                        title: props.title,
                                        datasets: [
                                            {
                                                label: props.label,
                                                data: data.data,
                                                backgroundColor: "#FAF"
                                            }
                                        ]
                                    }}
                                />
                            ) : (
                                <Line
                                    data={{
                                        labels: data.label,
                                        title: props.title,
                                        datasets: [
                                            {
                                                label: props.label,
                                                data: data.data,
                                                backgroundColor: "#FAF"
                                            }
                                        ]
                                    }}
                                />
                            )}
                        </div>
                    </>
                ) : (
                    <h3>There were no sales in this date range.</h3>
                )}
            </div>
        </Card>
    );
};

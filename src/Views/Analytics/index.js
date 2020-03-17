import React, { useState, useEffect } from "react";
import "./styles.scss";
import DataCard from "../../Components/DataCard";
import MasonryLayout from "../../Components/MasonryLayout";
import axios from "axios";

export default props => {
    const [state, setState] = useState({
        // data: {},
        chartData: [
            "revenue", 'order', 'revenue'
        ]
    });

    return (
        <div className="admin-row">
            <div className="container">
                <div className="admin-header">
                    <h2 className="title">Overview dashboard</h2>
                </div>
                <div className="filter-data"></div>
                <div className="content">
                    <MasonryLayout>
                        {state.chartData.map((item, index) => {
                            return (<DataCard 
                            data={item} 
                            key={index} 
                            statType={item}
                            title={item.toUpperCase()}
                            backgroundColor={''}
                            label={'Date'}
                            />);
                        })}
                    </MasonryLayout>
                </div>
            </div>
        </div>
    );
};


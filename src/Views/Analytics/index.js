import React, { useState } from "react";
import "./styles.scss";
import DataCard from "../../Components/DataCard";
import MasonryLayout from "../../Components/MasonryLayout";
import Card from "../../Components/Card";

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
                <div className="filter-data">
                    <Card className="metrics-card">
                        <h3>300</h3>
                        <p>Products</p>
                    </Card>
                    <Card className="metrics-card">
                        <h3>50</h3>
                        <p>Orders</p>
                    </Card>
                    <Card className="metrics-card">
                        <h3>30</h3>
                        <p>Discounts</p>
                    </Card>
                    <Card className="metrics-card">
                        <h3>27</h3>
                        <p>Customers</p>
                    </Card>
                </div>
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


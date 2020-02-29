import React from "react";
import "./styles.scss";
import DataCard from "../../Components/DataCard";
import MasonryLayout from "../../Components/MasonryLayout";

export default props => {
  return (
    <div className="admin-row">
      <div className="container">
        <div className="admin-header">
          <h2 className="title">Overview dashboard</h2>
        </div>
        <div className="filter-data"></div>
        <div className="content">
          <MasonryLayout>
            <DataCard data={{ title: "Sales", data: { date: "25/02/2020" } }} />
            <DataCard data={{ title: "Sales", data: { date: "25/02/2020" } }}>
              <div className="sub-section">
                <span>Visitors</span>
                <span>0</span>
              </div>
            </DataCard>
            <DataCard data={{ title: "Sales", data: { date: "25/02/2020" } }} />
            <DataCard data={{ title: "Sales", data: { date: "25/02/2020" } }} />
            <DataCard data={{ title: "Sales", data: { date: "25/02/2020" } }} />
            <DataCard data={{ title: "Sales", data: { date: "25/02/2020" } }}>
              <div className="sub-section">
                <span>Visitors</span>
                <span>0</span>
              </div>
            </DataCard>
          </MasonryLayout>
        </div>
      </div>
    </div>
  );
};

import React, { useState,useEffect } from 'react';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
} from 'recharts';
import { getStats } from "../../utils/axiosFunctions"
import Select from "react-select";
import "./styles.scss";

export default props => {

  const [days, setDays] = useState([]);
  const [month, setMonth] = useState([]);

  const [range, setRange] = useState("Month");

  useEffect( () => {
 async function fetchData() {
		// You can await here
 const getWeekData = await getStats("week")
    const getYearData = await getStats("year");
    const week = getWeekData.data;
    const month = getYearData.data;
    week && setDays(week);
    month && setMonth(month);
		// ...
 }
 fetchData();

  }, []);


  const weekData = [
    days[0],
    days[1],
    days[2],
    days[3],
    days[4],
    days[5],
    days[6]
  ];
  const monthData = [
    month[0],
    month[1],
    month[2],
    month[3],
    month[4],
    month[5],
    month[6],
    month[7],
    month[8],
    month[9],
    month[10],
    month[11],

  ];

  const weekLabel = [
		"Sunday",
		"Monday",
		"Tuesday",
		"Wednesday",
		"Thursday",
		"Friday",
		"Saturday",
  ];

  const monthLabel = [
    	"January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December"
  ];


  const weekChartData = [
    {name:weekLabel[0],transaction:weekData[0]},
    {name:weekLabel[1],transaction:weekData[1]},
    {name:weekLabel[2],transaction:weekData[2]},
    {name:weekLabel[3],transaction:weekData[3]},
    {name:weekLabel[4],transaction:weekData[4]},
    {name:weekLabel[5],transaction:weekData[5]},
    {name:weekLabel[6],transaction:weekData[6]},
  ]

  const monthChartData = [
    {name:monthLabel[0],transaction:monthData[0]},
    {name:monthLabel[1],transaction:monthData[1]},
    {name:monthLabel[2],transaction:monthData[2]},
    {name:monthLabel[3],transaction:monthData[3]},
    {name:monthLabel[4],transaction:monthData[4]},
    {name:monthLabel[5],transaction:monthData[5]},
    { name: monthLabel[6], transaction: monthData[6] },
    {name:monthLabel[7],transaction:monthData[7]},
    {name:monthLabel[8],transaction:monthData[8]},
    {name:monthLabel[9],transaction:monthData[9]},
    {name:monthLabel[10],transaction:monthData[10]},
    { name: monthLabel[11], transaction: monthData[11] },

  ]



  const statRange =[{ value: 'Month', label: 'Monthly' },
    { value: 'Week', label: 'Weekly' }
  ]

 const handleSelectChange = (value) => {

		if (value.value==="Month") {
      setRange("Month")
      return;
   }
		if (value.value==="Week") {
      setRange("Week");
      return;
   }

 };

    return (
			<div className="chartContainer">
				<div className="form-group chartSelect">
					<Select
						options={statRange}
						onChange={handleSelectChange}
						name="role"
						defaultValue={statRange[0]}
						required
					/>
				</div>
				<div style={{ padding: 40 }}>
					<LineChart
						width={1000}
						height={400}
						data={range === "Month" ? monthChartData : weekChartData}
						margin={{
							top: 5,
							right: 30,
							left: 30,
							bottom: 5,
						}}
					>
						<CartesianGrid strokeDasharray="3 3" />
						<XAxis dataKey="name" />
						<YAxis datakey="transaction" />
						<Tooltip />
						<Legend />
						<Line
							type="monotone"
							dataKey="transaction"
							stroke="white"
							activeDot={{ r: 8 }}
						/>
					</LineChart>
				</div>
			</div>
		);

}

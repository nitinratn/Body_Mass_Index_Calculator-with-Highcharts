import React, { useState } from "react";
import "./BmiCalc.css";
import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'

function BmiCalc() {
  const [bmi, setBmi] = useState([]);
  const [result, setResult] = useState();
  const [height, setHeight] = useState();
  const [weight, setWeight] = useState();

  const handleBmiData = () => {
    let value = ([Number(weight) / Number(height) / Number(height)] * 10000).toFixed(1);

    setBmi((e) => {
        return [...e, Number(value)];
      });
      if (value < 18.5) {
        setResult("Under Weight");
      } else if (value > 18.5 && value <= 24.9) {
        setResult("Healthy");
      } else if (value > 24.9 && value < 30) {
        setResult("Over Weight");
      } else {
        setResult("Obese");
      }
  };
  
  const options = {
    chart: {
        type: 'areaspline',
        height: '46%',
    },
    title: {
        text: 'My Chart'
    },
    credits: {
        enabled: false
    },
    plotOptions: {
        areaspline: {
            fillOpacity: 0.5
        }
    },
    tooltip: {
        shared: true,
        valueSuffix: 'kg/sq. m'
    },
    series: [{
        data: bmi
    }],
    yAxis: {
        title: {
            text: 'BMI'
        }
    },
    xAxis: {
        title: {
            text: `${bmi.length} days data`
        }
    },
  }
  return (
    <div className="main_div">
      <h1>BMI Tracker</h1>
      <div className="inner_div">
        <div className="input_div">
          <div className="height_div">
            <label>Height (in cm)</label>
            <input
              type="text"
              name="height"
              onChange={(e) => setHeight(e.target.value)}
              placeholder="Height in cm"
            />
          </div>
          <div className="weight">
            <label>Weight (in kg)</label>
            <input
              type="text"
              name="weight"
              onChange={(e) => setWeight(e.target.value)}
              placeholder="Weight in kg"
            />
          </div>
        </div>
        <div className="btn_div">
          <button
            onClick={handleBmiData}
            disabled={height?.length > 0 && weight?.length > 0 ? false : true}
          >
            Calculate BMI
          </button>
          <h2>{result}</h2>
        </div>
      </div>
      <HighchartsReact highcharts={Highcharts} options={options} />
    </div>
  );
}

export default BmiCalc;

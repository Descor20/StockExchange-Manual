import {debug, error, info} from "../utils/logger.js";
import {useState} from "react";
import './chart.css'
import LineChart from "./Linechart.jsx";
import {LinearScale} from 'chart.js';
import Chart from 'chart.js/auto';

import BarChart from "./Barchart.jsx";

Chart.register(LinearScale);
function CreateChart() {
    /*
     * The function creates a new graph ready to be used.
     ---- Param
     * type_    -> A string. 
                This string is used to specify the kind of graph to create.
     ---- Return
     * return   -> A chart object used to display a graph.
    */
    return useState({
        labels: [],
        datasets: [{
            label: "",
            data: []
        }]
    });
}


export function AddValue(charts, chartid, Idataset, label, value) {
    /*
     * The function add a value to the graph chart.
     ---- Param
     * TODO: Update the description

     * chart    -> A string.
                This string represent the id given to the graph to update
     * Idataset -> An int.
                This int is used to index the layer of the graph.
     * label    -> A string or a number.
                This string/number is used to define the x-axis of the value.
     * value    -> A number.
                This number is used to define the y-axis of the value.
     ---- Return
     * return   -> A boolean.
                This boolean value is used to determine if the graph has been updated or not.
     ---- template
     * Chart template :
     {
        labels: [Xvalues....],
        datasets: [{
            label: "curb name",
            data: [Yvalues...]
        }]
     }
    */

    if (typeof charts !== 'object') {
        debug("[addValue]");
        error("The charts wasn't passed to the function");
        return <></>;
    }

    if (typeof chartid !== "string" ||
        typeof Idataset !== "number" || 
        Idataset < 0 || 
        (typeof label !== 'number' && typeof label !== 'string') || 
        typeof value != 'number') {

        debug("[addValue]");

        if (typeof chartid !== "string") {
            error("The graph to update doesn't exists or is incorrect");
        }
        else if (Idataset == null || typeof Idataset !== "number" || Idataset < 0) {
            error("The dataSet index to update doesn't exists or is incorrect");
        }
        else if (label == null || (typeof label !== 'number' && typeof label !== 'string')) {
            error("The label to create doesn't exists or is incorrect");
        }
        else if (value == null || typeof value != 'number') {
            error("The value to insert doesn't exists or is incorrect");
        }
        return false;
    }

    const chart = charts[chartid];

    if (chart == null) {
        debug("[addValue]");
        error("This chartid: \"" + chartid + "\" does not exist");
        return false;
    }
    if (Idataset > chart[0].datasets.length || Idataset < 0) {
        debug("[addValue]");
        error("The given datasetindex is not in the range of possible values.");
        return false;
    }

    let new_chart = {
        labels: chart[0].labels,
        datasets: chart[0].datasets,
    }
    if (new_chart.datasets.length <= Idataset) {
        new_chart.datasets.push({
            label: '',
            data: [],
        });
    }

    let labelIndex = -1;
    for (let i = 0; i < new_chart.labels.length; i++) {
        const label_ = new_chart.labels[i]
        if (label_ === label) {
            labelIndex = i;
            break;
        }
    }
    if (labelIndex === -1) {
        new_chart.labels.push(label);

        new_chart.datasets[Idataset].data.push(value);
    }
    else {
        new_chart.datasets[Idataset].data[labelIndex] = value;
    }

    debug("[addValue]");
    info("The value: " + value +" has been uploaded at " + label);
    chart[1] = new_chart;

    return true;
}

export function AddValues(charts, chartid, Idatasets, labels, values) {
    /*
     * The function add a value to the graph chart.
     ---- Param
     * TODO: Update the description

     * chart    -> A string.
                This string represent the id given to the graph to update
     * Idataset -> An int.
                This int is used to index the layer of the graph.
     * label    -> A string or a number.
                This string/number is used to define the x-axis of the value.
     * value    -> A number.
                This number is used to define the y-axis of the value.
     ---- Return
     * return   -> A boolean.
                This boolean value is used to determine if the graph has been updated or not.
     ---- template
     * Chart template :
     {
        labels: [Xvalues....],
        datasets: [{
            label: "curb name",
            data: [Yvalues...]
        }]
     }
    */
    if (typeof charts !== 'object') {
        debug("[addValue]");
        error("The charts wasn't passed to the function");
        return <></>;
    }
    if (typeof chartid !== "string" ||
        typeof Idatasets !== "object" ||
        typeof labels !== 'object' ||
        typeof values != 'object') {

        debug("[addValue]");

        if (typeof chartid !== "string") {
            error("The graph to update doesn't exists or is incorrect");
        }
        else if (typeof Idatasets !== "object") {
            error("The dataSet index to update doesn't exists or isn't a list");
        }
        else if (typeof labels !== 'object') {
            error("The label to create doesn't exists or isn't a list");
        }
        else if (typeof values != 'object') {
            error("The values to insert doesn't exists or isn't a list");
        }
        return false;
    }

    if (Idatasets.length !== labels.length || Idatasets.length !== values.length) {
        debug("[addValue]");
        error("The lists of items doesn't have the same sizes");
    }

    for (let i = 0; i < Idatasets.length; i++) {
        AddValue(charts, chartid, Idatasets[i], labels[i], values[i]);
    }

    return true;
}

function CreateGraphComponent(object) {

    /*
     * The function gets the chart of the corresponding id.
     ---- Param
     * id       -> A string.
                This string correspond to a graph id.
     * type_    -> Optional(String).
                This string express the kind of graph that you want.
                The value be between ["bar", "line"].
                
     * TODO: Update the description
     ---- Return
     * return   -> A React Component.
                This corresponds to the graph component (with chart and under bar).
    */

    if (typeof object != "object") {
        debug("[createGraphComponent]");
        error("The object must contain all statement {id, (Optional)type_}");
        return <></>;
    }
    const id = object.id;

    let type_ = object.type_;
    let charts = object.charts_;
    if (typeof type_ !== "string") {
        type_ = "bar";
    }
    if (typeof id !== "string") {
        debug("[createGraphComponent]");
        error("The id must be a string");
        return <></>;
    }
    else if (typeof charts !== 'object') {
        debug("[createGraphComponent]");
        error("The charts wasn't passed to the function");
        return <></>;
    }

    if (type_ !== "bar" && type_ !== "line") {
        debug("[createGraphComponent]");
        error("The graph type isn't correct");
        return <></>;
    }

    const chart = CreateChart();

    charts[id] = chart;
    if (typeof object.callback !== "undefined") {
        object.callback();
    }

    return (
        <div className="graphic">
            {type_ === "bar" ? BarChart(chart[0]) : LineChart(chart[0])}
            <div className="graphicBar"></div>
        </div>
    );
}

// Usage :  const chart = <CreateGraphComponent id="a" type_={"bar"} charts_={charts} callback={function ()  {
//              AddValue(charts, "a", 0, "ok", 1)
//              AddValue(charts, "a", 0, "ok2", 2)
//          }}/>

export default CreateGraphComponent;
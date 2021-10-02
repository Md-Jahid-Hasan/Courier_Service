import React, {useState, useEffect} from "react";

import {
    Card, Button,
    CardBody,
    CardTitle
} from 'reactstrap';
import DatePicker from "react-datepicker";

import Chart from 'react-apexcharts';

const TotalRevenue = (props) => {
    const [total, setTotal] = useState([])
    const [paid, setPaid] = useState([])
    const [payable, setPayable] = useState([])
    
    console.log(props.data)
    const mnth = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
    const day = []
    const column = props.period === "Monthly" ? 31 : 12; 

    for(let i=1;i<=31; i++)
        day.push(i)


    let t = new Array(column).fill(0)
    let p = new Array(column).fill(0)
    let pa = new Array(column).fill(0)

    useEffect(() => {
        props.data.forEach(i => {
            let x =  props.period === "Monthly" ? parseInt(i.week_day.slice(-2)) : parseInt(i.Month.slice(-2))
            t[x] = i.Booked
            p[x] = i.PaidAmount
            pa[x] = i.PayableAmount
        });
        setTotal(t)
        setPaid(p)
        setPayable(pa)
    }, [props.data])

    const options = {
        chart: {
            toolbar: {
                show: false
            },
            stacked: true,
        },
        dataLabels: {
            enabled: false
        },
        stroke: {
            show: true,
            width: 4,
            colors: ['transparent']
        },
        legend: {
            show: false
        },
        plotOptions: {
            bar: {
                horizontal: false,
                endingShape: 'flat'
            },
        },
        colors: ['#008000', '#FF0000', '#FFFF00'],
        xaxis: {
            categories: props.period === "Monthly" ? day : mnth
        },
        responsive: [
            {
                breakpoint: 2500,
                options: {
                    plotOptions: {
                        bar: {
                            columnWidth: '30%',
                        }
                    }
                }
            }
        ]
    };
    const series = [
        {
            name: "Total",
            //data: [800000, 1200000, 1400000, 1300000, 1200000, 1400000, 1300000, 1300000, 1200000]
            data: total
        },
        {
            name: "Paid",
            //data: [200000, 400000, 500000, 300000, 400000, 500000, 300000, 300000, 400000]
            data: paid
        },
        {
            name: "Payable",
            //data: [100000, 200000, 400000, 600000, 200000, 400000, 600000, 600000, 200000]
            data: payable
        }
    ];

    return (
        <Card className="card">
            <CardBody className="card-body">
                <div className="d-md-flex align-items-center">
                    <CardTitle className="card-title">Total Revenue</CardTitle>
                    <div className="ml-auto">
                        <ul className="list-inline">
                            {props.sortingParam()}
                            <li className="list-inline-item">
                                <h6 className="text-muted"><i className="fa fa-circle mr-1" style={{ color: '#51bdff' }}></i>Total</h6>
                            </li>
                            <li className="list-inline-item">
                                <h6 className="text-muted"><i className="fa fa-circle mr-1" style={{ color: '#11a0f8' }}></i>Paid</h6>
                            </li>
                            <li className="list-inline-item">
                                <h6 className="text-muted"><i className="fa fa-circle mr-1 text-info"></i>Payable</h6>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className="clear"></div>
                <div className="total-sales" style={{ height: '339px' }}>
                    <Chart
                        options={options}
                        series={series}
                        type="bar"
                        height="339"
                    />
                </div>
            </CardBody>
        </Card>
    );
}

export default TotalRevenue;

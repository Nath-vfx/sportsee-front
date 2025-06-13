import React, { PureComponent } from 'react';
import { RadialBarChart, RadialBar, Legend, ResponsiveContainer } from 'recharts';

const data = [
    {
        name: 'unknow',
        uv: 6.67,
        pv: 4800,
        fill: 'red',
    },
];

export default class Example extends PureComponent {
    static demoUrl = 'https://codesandbox.io/p/sandbox/simple-radial-bar-chart-gnwjjg';

    render() {
        return (
            <ResponsiveContainer width="100%" height="100%">
                <RadialBarChart cx="50%" cy="50%" innerRadius="80%" outerRadius="80%" barSize={16} data={data} >
                    <RadialBar
                        background
                        clockWise
                        dataKey="uv"
                    />

                </RadialBarChart>
            </ResponsiveContainer>
        );
    }
}

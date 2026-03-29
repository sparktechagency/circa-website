'use client'

import React from 'react'
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    Cell,
} from 'recharts';
import { Star, MessageSquare, ShoppingBag } from 'lucide-react';
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '../../select';


const ChartCard = ({ title, icon, iconBg, iconColor, barColor }: any) => {
    return (
        <div className="flex flex-col gap-4 w-full">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                    {/* Icon Header */}
                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${iconBg}`}>
                        <div style={{ color: iconColor }}>{icon}</div>
                    </div>
                    <span>{title}</span>
                </div>

                <Select>
                    <SelectTrigger className="w-32">
                        <SelectValue placeholder="Year" />
                    </SelectTrigger>
                    <SelectContent className='bg-black'>
                        <SelectGroup>
                            <SelectItem value="week">Week</SelectItem>
                            <SelectItem value="month">Month</SelectItem>
                            <SelectItem value="year">Year</SelectItem>
                        </SelectGroup>
                    </SelectContent>
                </Select>
            </div>


            {/* Chart Container */}
            <div className="bg-[#121218] border border-gray-800 rounded-2xl p-4 md:p-6 shadow-xl overflow-hidden">
                <div className="h-48 w-full">
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart
                            data={data}
                            margin={{ top: 10, right: 0, left: -25, bottom: 0 }}
                            barGap={8}
                        >
                            <CartesianGrid
                                strokeDasharray="3 3"
                                vertical={false}
                                stroke="#2d2d3d"
                            />
                            <XAxis
                                dataKey="day"
                                axisLine={false}
                                tickLine={false}
                                tick={{ fill: '#9ca3af', fontSize: 12 }}
                                dy={10}
                            />
                            <YAxis
                                axisLine={false}
                                tickLine={false}
                                tick={{ fill: '#9ca3af', fontSize: 12 }}
                                domain={[0, 100]}
                                ticks={[0, 50, 100]}
                            />
                            <Tooltip
                                cursor={{ fill: 'rgba(255,255,255,0.05)' }}
                                contentStyle={{
                                    backgroundColor: '#1f1f29',
                                    border: '1px solid #374151',
                                    borderRadius: '8px',
                                    color: '#fff'
                                }}
                                itemStyle={{ color: barColor }}
                            />
                            <Bar
                                dataKey="value"
                                radius={[4, 4, 0, 0]}
                                barSize={24}
                            >
                                {data.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={barColor} fillOpacity={0.8} />
                                ))}
                            </Bar>
                        </BarChart>
                    </ResponsiveContainer>
                </div>

                {/* Legend */}
                <div className="flex justify-center items-center gap-2 mt-4">
                    <div
                        className="w-3 h-3 rounded-sm"
                        style={{ backgroundColor: barColor }}
                    ></div>
                    <span className="text-gray-400 text-xs font-medium">Day</span>
                </div>
            </div>
        </div>
    );
};

const data = [
    { day: 'Sun', value: 28 },
    { day: 'Mon', value: 42 },
    { day: 'Tue', value: 88 },
    { day: 'Wed', value: 44 },
    { day: 'Thu', value: 72 },
    { day: 'Fri', value: 15 },
    { day: 'Sat', value: 38 },
];

const AnalyticsCharts = () => {
    return (
        <div>
            <div className=" w-full">
                {/* Responsive Grid: 1 column on mobile, 3 columns on large screens */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">

                    {/* Chart 1: Orange/Gold */}
                    <ChartCard
                        title={"Tier"}
                        icon={<Star size={20} fill="currentColor" />}
                        iconBg="bg-orange-500/10"
                        iconColor="#d97706"
                        barColor="#c2844a"
                    />

                    {/* Chart 2: Blue */}
                    <ChartCard
                        title={"Message"}
                        icon={<MessageSquare size={20} fill="currentColor" />}
                        iconBg="bg-blue-500/10"
                        iconColor="#3b82f6"
                        barColor="#4a82c2"
                    />

                    {/* Chart 3: Red/Pink */}
                    <ChartCard
                        title={"Shop"}
                        icon={<ShoppingBag size={20} fill="currentColor" />}
                        iconBg="bg-red-500/10"
                        iconColor="#ef4444"
                        barColor="#c27367"
                    />

                </div>
            </div>
        </div>
    )
}

export default AnalyticsCharts

"use client"

import { Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"

const data = [
  {
    name: "Monday",
    "On Time": 32,
    Late: 4,
    Absent: 2,
  },
  {
    name: "Tuesday",
    "On Time": 35,
    Late: 2,
    Absent: 1,
  },
  {
    name: "Wednesday",
    "On Time": 30,
    Late: 5,
    Absent: 3,
  },
  {
    name: "Thursday",
    "On Time": 34,
    Late: 3,
    Absent: 1,
  },
  {
    name: "Friday",
    "On Time": 38,
    Late: 2,
    Absent: 0,
  },
  {
    name: "Saturday",
    "On Time": 25,
    Late: 1,
    Absent: 0,
  },
  {
    name: "Sunday",
    "On Time": 20,
    Late: 0,
    Absent: 0,
  },
]

export function RMChart() {
  return (
    <ResponsiveContainer width="100%" height={350}>
      <BarChart data={data}>
        <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
        <XAxis dataKey="name" className="text-xs fill-muted-foreground" tickLine={false} axisLine={false} />
        <YAxis className="text-xs fill-muted-foreground" tickLine={false} axisLine={false} />
        <Tooltip
          contentStyle={{
            backgroundColor: "hsl(var(--card))",
            borderColor: "hsl(var(--border))",
            borderRadius: "6px",
            color: "hsl(var(--foreground))",
          }}
        />
        <Legend />
        <Bar dataKey="On Time" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
        <Bar dataKey="Late" fill="hsl(var(--warning))" radius={[4, 4, 0, 0]} />
        <Bar dataKey="Absent" fill="hsl(var(--destructive))" radius={[4, 4, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  )
}


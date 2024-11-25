"use client";
import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  AreaChart,
  Area,
} from "recharts";
import TabMenu from "../TabMenu";

// Mock data generation
const generateTimeData = () => {
  return Array.from({ length: 24 }, (_, i) => ({
    hour: `${i}:00`,
    quality: 85 + Math.random() * 10,
    vibration: 1.5 + Math.random(),
    energy: 70 + Math.random() * 20,
    parts: Math.floor(40 + Math.random() * 20),
  }));
};

const generatePredictionData = () => {
  return Array.from({ length: 7 }, (_, i) => ({
    day: `Day ${i + 1}`,
    actual: 90 - i * 2 + Math.random() * 5,
    predicted: 89 - i * 2 + Math.random() * 3,
  }));
};

const generateMaintenanceData = () => {
  return Array.from({ length: 12 }, (_, i) => ({
    month: `Month ${i + 1}`,
    maintenance: Math.floor(15 + Math.random() * 10),
    downtime: Math.floor(5 + Math.random() * 8),
    costs: Math.floor(2000 + Math.random() * 1000),
  }));
};

export default function Page() {
  return (
    <div>
      <TabMenu />
      <div className="min-h-screen bg-gray-50 p-6">
        <div className="max-w-7xl mx-auto space-y-6">
          <h1 className="text-2xl font-bold text-gray-900">
            Shot Blast Machine Analytics
          </h1>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {/* Quality Score Card */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Current Quality Score</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-blue-600">92.5%</div>
                <div className="text-sm text-green-600">
                  ↑ 2.3% from last week
                </div>
              </CardContent>
            </Card>

            {/* Maintenance Prediction Card */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Next Maintenance</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-amber-600">3 Days</div>
                <div className="text-sm text-gray-600">
                  Based on vibration patterns
                </div>
              </CardContent>
            </Card>

            {/* Efficiency Card */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Current Efficiency</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-green-600">87.3%</div>
                <div className="text-sm text-red-600">
                  ↓ 1.2% from yesterday
                </div>
              </CardContent>
            </Card>
          </div>

          <Tabs defaultValue="quality" className="space-y-6">
            <TabsList className="bg-white p-1 rounded-lg shadow-sm">
              <TabsTrigger value="quality">Quality Prediction</TabsTrigger>
              <TabsTrigger value="maintenance">
                Maintenance Analysis
              </TabsTrigger>
              <TabsTrigger value="performance">Performance Metrics</TabsTrigger>
            </TabsList>

            <TabsContent value="quality">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Quality Score Prediction</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="h-80">
                      <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={generatePredictionData()}>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="day" />
                          <YAxis domain={[60, 100]} />
                          <Tooltip />
                          <Legend />
                          <Line
                            type="monotone"
                            dataKey="actual"
                            stroke="#2563eb"
                            name="Actual Quality"
                          />
                          <Line
                            type="monotone"
                            dataKey="predicted"
                            stroke="#7c3aed"
                            strokeDasharray="5 5"
                            name="Predicted Quality"
                          />
                        </LineChart>
                      </ResponsiveContainer>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Quality Factors Impact</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="h-80">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart
                          data={[
                            { factor: "Abrasive Wear", impact: 85 },
                            { factor: "Vibration", impact: 75 },
                            { factor: "Air Pressure", impact: 65 },
                            { factor: "Cycle Time", impact: 55 },
                            { factor: "Temperature", impact: 45 },
                          ]}
                        >
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="factor" />
                          <YAxis />
                          <Tooltip />
                          <Bar dataKey="impact" fill="#3b82f6" />
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="maintenance">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Maintenance History & Costs</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="h-80">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={generateMaintenanceData()}>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="month" />
                          <YAxis yAxisId="left" />
                          <YAxis yAxisId="right" orientation="right" />
                          <Tooltip />
                          <Legend />
                          <Bar
                            yAxisId="left"
                            dataKey="maintenance"
                            fill="#3b82f6"
                            name="Maintenance Hours"
                          />
                          <Bar
                            yAxisId="left"
                            dataKey="downtime"
                            fill="#ef4444"
                            name="Downtime Hours"
                          />
                          <Line
                            yAxisId="right"
                            type="monotone"
                            dataKey="costs"
                            stroke="#10b981"
                            name="Costs ($)"
                          />
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Component Wear Prediction</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="h-80">
                      <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={generateTimeData()}>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="hour" />
                          <YAxis />
                          <Tooltip />
                          <Legend />
                          <Area
                            type="monotone"
                            dataKey="vibration"
                            fill="#3b82f6"
                            stroke="#2563eb"
                            name="Vibration Level"
                          />
                        </AreaChart>
                      </ResponsiveContainer>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="performance">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Energy Consumption vs Production</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="h-80">
                      <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={generateTimeData()}>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="hour" />
                          <YAxis yAxisId="left" />
                          <YAxis yAxisId="right" orientation="right" />
                          <Tooltip />
                          <Legend />
                          <Line
                            yAxisId="left"
                            type="monotone"
                            dataKey="energy"
                            stroke="#3b82f6"
                            name="Energy (kW)"
                          />
                          <Line
                            yAxisId="right"
                            type="monotone"
                            dataKey="parts"
                            stroke="#10b981"
                            name="Parts Processed"
                          />
                        </LineChart>
                      </ResponsiveContainer>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Overall Equipment Effectiveness</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="h-80">
                      <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={generateTimeData()}>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="hour" />
                          <YAxis />
                          <Tooltip />
                          <Legend />
                          <Area
                            type="monotone"
                            dataKey="quality"
                            fill="#10b981"
                            stroke="#059669"
                            name="OEE Score"
                          />
                        </AreaChart>
                      </ResponsiveContainer>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}

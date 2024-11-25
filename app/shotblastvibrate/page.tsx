"use client";
import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  ReferenceLine,
} from "recharts";
import { AlertCircle } from "lucide-react";
import TabMenu from "../TabMenu";

// Generate realistic vibration data with increasing trend and patterns
const generateVibrationData = () => {
  const data = [];
  const baseVibration = 1.2; // Starting vibration level
  const hoursPerDay = 24;
  const daysToShow = 7;

  for (let day = 0; day < daysToShow; day++) {
    for (let hour = 0; hour < hoursPerDay; hour++) {
      // Add natural progression and patterns
      const timeOfDay = hour >= 6 && hour <= 22 ? 1 : 0.7; // Higher during working hours
      const dailyWear = day * 0.1; // Increasing trend over days
      const hourlyVariation = Math.sin(hour / 3) * 0.1; // Natural variation
      const randomNoise = Math.random() * 0.2 - 0.1; // Random noise

      const vibration =
        (baseVibration + dailyWear) * timeOfDay + hourlyVariation + randomNoise;

      data.push({
        timestamp: `Day ${day + 1} ${hour}:00`,
        vibration: Number(vibration.toFixed(2)),
        warning: 2.5,
        critical: 3.0,
        day: day + 1,
        hour,
      });
    }
  }
  return data;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const calculateMaintenanceMetrics = (data: string | any[]) => {
  const currentVibration = data[data.length - 1].vibration;
  const vibrationRate =
    (data[data.length - 1].vibration - data[0].vibration) / data.length;
  const hoursToWarning = (2.5 - currentVibration) / vibrationRate;
  const hoursUntilMaintenance = Math.max(0, Math.floor(hoursToWarning * 0.8)); // 80% of warning threshold

  return {
    currentVibration,
    vibrationRate: vibrationRate * 24, // Rate per day
    hoursUntilMaintenance,
    daysUntilMaintenance: Math.ceil(hoursUntilMaintenance / 24),
    riskLevel:
      currentVibration > 2.5
        ? "High"
        : currentVibration > 2.0
        ? "Medium"
        : "Low",
  };
};

export default function Page() {
  const vibrationData = generateVibrationData();
  const metrics = calculateMaintenanceMetrics(vibrationData);

  return (
    <div>
      <TabMenu />
      <div className="min-h-screen bg-gray-50 p-6">
        <div className="max-w-7xl mx-auto space-y-6">
          <h1 className="text-2xl font-bold text-gray-900">
            Shot Blast Vibration Analysis
          </h1>

          {/* Alert for high vibration */}
          {metrics.riskLevel !== "Low" && (
            <Alert variant="default" className="bg-yellow-50 border-yellow-200">
              <AlertCircle className="h-4 w-4 text-yellow-600" />
              <AlertDescription className="text-yellow-700">
                {metrics.riskLevel === "High"
                  ? "Critical vibration levels detected. Immediate maintenance recommended."
                  : `Elevated vibration levels. Maintenance recommended within ${metrics.daysUntilMaintenance} days.`}
              </AlertDescription>
            </Alert>
          )}

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Current Vibration */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Current Vibration</CardTitle>
              </CardHeader>
              <CardContent>
                <div
                  className={`text-3xl font-bold ${
                    metrics.currentVibration > 2.5
                      ? "text-red-600"
                      : metrics.currentVibration > 2.0
                      ? "text-yellow-600"
                      : "text-green-600"
                  }`}
                >
                  {metrics.currentVibration.toFixed(2)} mm/s
                </div>
                <div className="text-sm text-gray-600">Threshold: 2.5 mm/s</div>
              </CardContent>
            </Card>

            {/* Vibration Trend */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Daily Increase Rate</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-blue-600">
                  {metrics.vibrationRate.toFixed(3)} mm/s/day
                </div>
                <div className="text-sm text-gray-600">
                  Based on 7-day average
                </div>
              </CardContent>
            </Card>

            {/* Maintenance Prediction */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Next Maintenance Due</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-amber-600">
                  {metrics.daysUntilMaintenance} Days
                </div>
                <div className="text-sm text-gray-600">
                  {`(${metrics.hoursUntilMaintenance} operating hours)`}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Vibration Trend Chart */}
          <Card>
            <CardHeader>
              <CardTitle>Vibration Trend Analysis</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-96">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={vibrationData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis
                      dataKey="timestamp"
                      interval={23}
                      tick={{ fontSize: 12 }}
                    />
                    <YAxis
                      domain={[0, 4]}
                      ticks={[0, 1, 1.5, 2.0, 2.5, 3.0, 3.5, 4.0]}
                    />
                    <Tooltip />
                    <Legend />
                    <ReferenceLine
                      y={2.5}
                      label="Warning Threshold"
                      stroke="#f59e0b"
                      strokeDasharray="3 3"
                    />
                    <ReferenceLine
                      y={3.0}
                      label="Critical Threshold"
                      stroke="#dc2626"
                      strokeDasharray="3 3"
                    />
                    <Line
                      type="monotone"
                      dataKey="vibration"
                      stroke="#2563eb"
                      name="Vibration Level (mm/s)"
                      dot={false}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          {/* Maintenance Zones */}
          <Card>
            <CardHeader>
              <CardTitle>Vibration Severity Zones</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-4 gap-4">
                <div className="p-4 bg-green-50 rounded-lg">
                  <div className="text-green-700 font-semibold">Normal</div>
                  <div className="text-sm text-green-600">&lt; 2.0 mm/s</div>
                </div>
                <div className="p-4 bg-yellow-50 rounded-lg">
                  <div className="text-yellow-700 font-semibold">Caution</div>
                  <div className="text-sm text-yellow-600">2.0 - 2.5 mm/s</div>
                </div>
                <div className="p-4 bg-orange-50 rounded-lg">
                  <div className="text-orange-700 font-semibold">Warning</div>
                  <div className="text-sm text-orange-600">2.5 - 3.0 mm/s</div>
                </div>
                <div className="p-4 bg-red-50 rounded-lg">
                  <div className="text-red-700 font-semibold">Critical</div>
                  <div className="text-sm text-red-600">&gt; 3.0 mm/s</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
//

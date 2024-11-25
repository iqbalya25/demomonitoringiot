"use client";

import React from "react";
import type { ReactElement } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent} from "@/components/ui/tabs";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import {
  Activity,
  Thermometer,
  Power,
  Clock,
  Droplet,
  Wind,
  AlertCircle,
  Gauge,
  LucideIcon,
} from "lucide-react";

// Types
type MachineStatusType = "running" | "maintenance" | "stopped" | "warning";

interface ChartDataPoint {
  time: string;
  value: number;
}

interface MachineStatusProps {
  status: MachineStatusType;
}

interface ParameterCardProps {
  icon: LucideIcon;
  label: string;
  value: string | number;
  unit: string;
}

// Sample data generator
const generateData = (base: number): ChartDataPoint[] => {
  return Array.from({ length: 24 }, (_, i) => ({
    time: `${i}:00`,
    value: base + Math.random() * 20 - 10,
  }));
};

const MachineStatus = ({ status }: MachineStatusProps): ReactElement => {
  const colors: Record<MachineStatusType, string> = {
    running: "bg-green-100 text-green-800",
    maintenance: "bg-yellow-100 text-yellow-800",
    stopped: "bg-red-100 text-red-800",
    warning: "bg-orange-100 text-orange-800",
  };

  return (
    <div
      className={`px-3 py-1 rounded-full text-sm font-medium ${colors[status]}`}
    >
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </div>
  );
};

const ParameterCard = ({
  icon: Icon,
  label,
  value,
  unit,
}: ParameterCardProps): ReactElement => (
  <div className="bg-white rounded-lg p-4 shadow-sm border">
    <div className="flex items-center justify-between">
      <div className="flex items-center space-x-3">
        <div className="p-2 bg-blue-50 rounded-lg">
          <Icon className="w-5 h-5 text-blue-600" />
        </div>
        <div>
          <p className="text-sm text-gray-500">{label}</p>
          <p className="text-lg font-semibold">
            {value} {unit}
          </p>
        </div>
      </div>
    </div>
  </div>
);

export default function FoundryDashboard(): ReactElement {
  const [currentTime, setCurrentTime] = React.useState<string>(
    new Date().toLocaleTimeString()
  );

  React.useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date().toLocaleTimeString());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-900">
            Foundry Workshop Monitoring
          </h1>
          <div className="flex items-center space-x-2 text-sm text-gray-500">
            <Clock className="w-4 h-4" />
            <span>Last updated: {currentTime}</span>
          </div>
        </div>

        <Tabs defaultValue="overview" className="space-y-6">
          

          <TabsContent value="overview" className="space-y-6">
            {/* Alert Section */}
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 flex items-center space-x-3">
              <AlertCircle className="w-5 h-5 text-yellow-600" />
              <p className="text-yellow-700">
                Induction Furnace temperature approaching upper limit (1450°C)
              </p>
            </div>

            {/* Machines Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {/* Induction Furnace Card */}
              <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                  <CardTitle>Induction Furnace</CardTitle>
                  <MachineStatus status="running" />
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <ParameterCard
                      icon={Thermometer}
                      label="Temperature"
                      value="1450"
                      unit="°C"
                    />
                    <ParameterCard
                      icon={Power}
                      label="Power"
                      value="750"
                      unit="kW"
                    />
                    <ParameterCard
                      icon={Clock}
                      label="Melt Time"
                      value="45"
                      unit="min"
                    />
                    <ParameterCard
                      icon={Droplet}
                      label="Cooling Water"
                      value="28"
                      unit="°C"
                    />
                  </div>
                  <div className="h-48 mt-4">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={generateData(1450)}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="time" />
                        <YAxis />
                        <Tooltip />
                        <Line
                          type="monotone"
                          dataKey="value"
                          stroke="#2563eb"
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>

              {/* Shot Blast Card */}
              <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                  <CardTitle>Shot Blast</CardTitle>
                  <MachineStatus status="running" />
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <ParameterCard
                      icon={Activity}
                      label="Vibration"
                      value="2.5"
                      unit="mm/s"
                    />
                    <ParameterCard
                      icon={Wind}
                      label="Air Pressure"
                      value="6.2"
                      unit="bar"
                    />
                    <ParameterCard
                      icon={Clock}
                      label="Cycle Time"
                      value="15"
                      unit="min"
                    />
                    <ParameterCard
                      icon={Gauge}
                      label="Abrasive Level"
                      value="85"
                      unit="%"
                    />
                  </div>
                  <div className="h-48 mt-4">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={generateData(6)}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="time" />
                        <YAxis />
                        <Tooltip />
                        <Line
                          type="monotone"
                          dataKey="value"
                          stroke="#2563eb"
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>

              {/* Sand Mixer Card */}
              <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                  <CardTitle>Versatic Mixer</CardTitle>
                  <MachineStatus status="maintenance" />
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <ParameterCard
                      icon={Activity}
                      label="Mix Speed"
                      value="120"
                      unit="RPM"
                    />
                    <ParameterCard
                      icon={Clock}
                      label="Mix Time"
                      value="8"
                      unit="min"
                    />
                    <ParameterCard
                      icon={Thermometer}
                      label="Temperature"
                      value="32"
                      unit="°C"
                    />
                    <ParameterCard
                      icon={Power}
                      label="Motor Load"
                      value="75"
                      unit="%"
                    />
                  </div>
                  <div className="h-48 mt-4">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={generateData(120)}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="time" />
                        <YAxis />
                        <Tooltip />
                        <Line
                          type="monotone"
                          dataKey="value"
                          stroke="#2563eb"
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}

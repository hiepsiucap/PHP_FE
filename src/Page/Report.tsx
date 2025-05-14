/** @format */

import React, { useEffect, useState } from "react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { RotateLoader } from "react-spinners";
type StatisticData = Record<string, number>;

type SubjectKey = "math" | "physics" | "chemistry";

const subjectMap: Record<SubjectKey, { label: string; keys: string[] }> = {
  math: {
    label: "Toán học",
    keys: ["toan_8_up", "toan_6_8", "toan_4_6", "toan_under_4"],
  },
  physics: {
    label: "Vật lý",
    keys: ["ly_8_up", "ly_6_8", "ly_4_6", "ly_under_4"],
  },
  chemistry: {
    label: "Hóa học",
    keys: ["hoa_8_up", "hoa_6_8", "hoa_4_6", "hoa_under_4"],
  },
};

const colorMap = ["#4CAF50", "#2196F3", "#FF9800", "#F44336"];
const labelMap = ["≥ 8 điểm", "6-8 điểm", "4-6 điểm", "< 4 điểm"];

const Report: React.FC = () => {
  const [statistics, setStatistics] = useState<StatisticData | null>(null);
  const [selectedSubject, setSelectedSubject] = useState<SubjectKey>("math");
  const [error, setError] = useState<string | null>(null);
  const apiUrl = import.meta.env.VITE_API_URL;
  console.log(statistics);
  useEffect(() => {
    const fetchStatistics = async () => {
      try {
        const res = await fetch(`${apiUrl}/scores/statistics`);
        if (!res.ok) throw new Error("Không thể lấy dữ liệu thống kê.");
        const data = await res.json();
        setStatistics(data);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "Lỗi không xác định khi gọi API."
        );
      }
    };

    fetchStatistics();
  }, [apiUrl]);

  const getChartData = () => {
    if (!statistics) return [];
    return subjectMap[selectedSubject].keys.map((key, index) => ({
      level: labelMap[index],
      value: Number(statistics[key]) || 0, // ép kiểu dữ liệu
      color: colorMap[index],
    }));
  };

  return (
    <div className="p-6 h-full bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-blue-900 mb-6">
        Báo cáo thống kê
      </h2>

      <div className="mb-6">
        <label
          htmlFor="subjectSelect"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Chọn môn học:
        </label>
        <select
          id="subjectSelect"
          className="bg-gray-50 border w-64 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block  p-2.5"
          value={selectedSubject}
          onChange={(e) => setSelectedSubject(e.target.value as SubjectKey)}
        >
          {Object.entries(subjectMap).map(([key, value]) => (
            <option
              key={key}
              value={key}
            >
              {value.label}
            </option>
          ))}
        </select>
      </div>

      {error && <p className="text-red-600 text-sm mb-4">{error}</p>}

      {statistics ? (
        <ResponsiveContainer
          width="100%"
          height={400}
        >
          <PieChart>
            <Pie
              data={getChartData()}
              cx="50%"
              cy="50%"
              label={({ name, percent }) =>
                `${name} (${(percent * 100).toFixed(0)}%)`
              }
              outerRadius={150}
              dataKey="value"
              nameKey="level"
            >
              {getChartData().map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={entry.color}
                />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      ) : (
        <div className=" flex w-full  justify-center">
          <RotateLoader></RotateLoader>
        </div>
      )}
    </div>
  );
};

export default Report;

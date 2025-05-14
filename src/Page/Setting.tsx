/** @format */

import React, { useState } from "react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
const mockStatistics: Record<
  string,
  { level: string; value: number; color: string }[]
> = {
  math: [
    { level: "≥ 8 điểm", value: 1250, color: "#4CAF50" },
    { level: "6-8 điểm", value: 2340, color: "#2196F3" },
    { level: "4-6 điểm", value: 3120, color: "#FF9800" },
    { level: "< 4 điểm", value: 1430, color: "#F44336" },
  ],
  physics: [
    { level: "≥ 8 điểm", value: 950, color: "#4CAF50" },
    { level: "6-8 điểm", value: 2540, color: "#2196F3" },
    { level: "4-6 điểm", value: 3320, color: "#FF9800" },
    { level: "< 4 điểm", value: 1330, color: "#F44336" },
  ],
  chemistry: [
    { level: "≥ 8 điểm", value: 1050, color: "#4CAF50" },
    { level: "6-8 điểm", value: 2240, color: "#2196F3" },
    { level: "4-6 điểm", value: 3020, color: "#FF9800" },
    { level: "< 4 điểm", value: 1830, color: "#F44336" },
  ],
  literature: [
    { level: "≥ 8 điểm", value: 1150, color: "#4CAF50" },
    { level: "6-8 điểm", value: 2640, color: "#2196F3" },
    { level: "4-6 điểm", value: 2920, color: "#FF9800" },
    { level: "< 4 điểm", value: 1430, color: "#F44336" },
  ],
  english: [
    { level: "≥ 8 điểm", value: 1350, color: "#4CAF50" },
    { level: "6-8 điểm", value: 2740, color: "#2196F3" },
    { level: "4-6 điểm", value: 2620, color: "#FF9800" },
    { level: "< 4 điểm", value: 1430, color: "#F44336" },
  ],
};

const Setting: React.FC = () => {
  const [selectedSubject, setSelectedSubject] = useState<string>("math");

  //   const totalStudents = mockStatistics[selectedSubject].reduce(
  //     (sum, i) => sum + i.value,
  //     0
  //   );

  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
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
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
          value={selectedSubject}
          onChange={(e) => setSelectedSubject(e.target.value)}
        >
          <option value="math">Toán học</option>
          <option value="physics">Vật lý</option>
          <option value="chemistry">Hóa học</option>
          <option value="literature">Ngữ văn</option>
          <option value="english">Tiếng Anh</option>
        </select>
      </div>

      <ResponsiveContainer
        width="100%"
        height={400}
      >
        <PieChart>
          <Pie
            data={mockStatistics[selectedSubject]}
            cx="50%"
            cy="50%"
            label={({ name, percent }) =>
              `${name} (${(percent * 100).toFixed(0)}%)`
            }
            outerRadius={150}
            dataKey="value"
          >
            {mockStatistics[selectedSubject].map((entry, index) => (
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
    </div>
  );
};

export default Setting;

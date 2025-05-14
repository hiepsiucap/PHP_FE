/** @format */
import { useState, useEffect } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { RotateLoader } from "react-spinners";
export default function DashBoard() {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [statisticsData, setStatisticsData] = useState<any>(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [topStudentsData, setTopStudentsData] = useState<any[]>([]);
  const apiUrl = import.meta.env.VITE_API_URL;
  useEffect(() => {
    const fetchStatistics = async () => {
      const response = await fetch(`${apiUrl}/scores/statistics`);
      const data = await response.json();
      setStatisticsData(data);
    };
    const fetchTopStudents = async () => {
      const response = await fetch(`${apiUrl}/scores/top-group-a`);
      const data = await response.json();
      setTopStudentsData(data);
    };

    fetchStatistics();
    fetchTopStudents();
  }, [apiUrl]);

  if (!statisticsData || topStudentsData.length === 0) {
    return (
      <div className="text-center text-blue-500 font-semibold">
        <div className=" flex w-full h-full bg-white items-center py-24  justify-center">
          <RotateLoader></RotateLoader>
        </div>
      </div>
    );
  }
  const barData = [
    {
      subject: "Toán",
      "≥ 8 điểm": parseInt(statisticsData.toan_8_up),
      "6-8 điểm": parseInt(statisticsData.toan_6_8),
      "4-6 điểm": parseInt(statisticsData.toan_4_6),
      "< 4 điểm": parseInt(statisticsData.toan_under_4),
    },
    {
      subject: "Lý",
      "≥ 8 điểm": parseInt(statisticsData.ly_8_up),
      "6-8 điểm": parseInt(statisticsData.ly_6_8),
      "4-6 điểm": parseInt(statisticsData.ly_4_6),
      "< 4 điểm": parseInt(statisticsData.ly_under_4),
    },
    {
      subject: "Hóa",
      "≥ 8 điểm": parseInt(statisticsData.hoa_8_up),
      "6-8 điểm": parseInt(statisticsData.hoa_6_8),
      "4-6 điểm": parseInt(statisticsData.hoa_4_6),
      "< 4 điểm": parseInt(statisticsData.hoa_under_4),
    },
  ];

  return (
    <div className="p-8 w-full bg-white">
      <h2 className="text-3xl font-semibold text-blue-900 mb-8 text-center">
        Thống kê tổng quan
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
        {[
          {
            value: statisticsData.toan_8_up,
            label: "Thí sinh Toán ≥ 8",
            bgColor: "from-yellow-400 to-yellow-600",
          },
          {
            value: statisticsData.ly_8_up,
            label: "Thí sinh Lý ≥ 8",
            bgColor: "from-green-400 to-green-600",
          },
          {
            value: statisticsData.hoa_8_up,
            label: "Thí sinh Hóa ≥ 8",
            bgColor: "from-purple-400 to-purple-600",
          },
        ].map((stat, index) => (
          <div
            key={index}
            className={`bg-gradient-to-r ${stat.bgColor} p-6 rounded-lg shadow-lg text-white`}
          >
            <div className="text-3xl font-bold">{stat.value}</div>
            <div className="text-sm opacity-80">{stat.label}</div>
          </div>
        ))}
      </div>

      <div className="mb-12">
        <h3 className="text-2xl font-semibold text-gray-800 mb-6">
          Top 10 học sinh khối A (Toán, Lý, Hóa)
        </h3>
        <div className="overflow-x-auto rounded-lg shadow-lg">
          <table className="min-w-full bg-white border-collapse border border-gray-200">
            <thead className="bg-gradient-to-r from-indigo-600 to-blue-500 text-white">
              <tr>
                <th className="py-3 px-6 text-left">STT</th>
                <th className="py-3 px-6 text-left">Số báo danh</th>
                <th className="py-3 px-6 text-left">Họ và tên</th>
                <th className="py-3 px-6 text-right">Toán</th>
                <th className="py-3 px-6 text-right">Lý</th>
                <th className="py-3 px-6 text-right">Hóa</th>
                <th className="py-3 px-6 text-right">Tổng điểm</th>
              </tr>
            </thead>
            <tbody>
              {topStudentsData.map((student, index) => (
                <tr
                  key={student.sbd}
                  className="hover:bg-gray-50"
                >
                  <td className="py-3 px-6 border-b">{index + 1}</td>
                  <td className="py-3 px-6 border-b">{student.sbd}</td>
                  <td className="py-3 px-6 border-b">{student.name}</td>
                  <td className="py-3 px-6 border-b text-right">
                    {student.toan}
                  </td>
                  <td className="py-3 px-6 border-b text-right">
                    {student.vat_li}
                  </td>
                  <td className="py-3 px-6 border-b text-right">
                    {student.hoa_hoc}
                  </td>
                  <td className="py-3 px-6 border-b text-right font-bold">
                    {student.tong_diem}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div>
        <h3 className="text-2xl font-semibold text-gray-800 mb-6">
          Biểu đồ phân bố điểm các môn
        </h3>
        <div className="h-80">
          <ResponsiveContainer
            width="100%"
            height="100%"
          >
            <BarChart
              data={barData}
              margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="subject" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar
                dataKey="≥ 8 điểm"
                stackId="a"
                fill="#4CAF50"
              />
              <Bar
                dataKey="6-8 điểm"
                stackId="a"
                fill="#2196F3"
              />
              <Bar
                dataKey="4-6 điểm"
                stackId="a"
                fill="#FF9800"
              />
              <Bar
                dataKey="< 4 điểm"
                stackId="a"
                fill="#F44336"
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}

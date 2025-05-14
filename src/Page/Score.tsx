/** @format */

import React, { useEffect, useState } from "react";

interface Score {
  sbd: string;
  toan: number;
  vat_li: number;
  hoa_hoc: number;
  tong_diem: number;
}
import { RotateLoader } from "react-spinners";
const TopGroupAScores: React.FC = () => {
  const [scores, setScores] = useState<Score[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");
  const apiUrl = import.meta.env.VITE_API_URL;
  useEffect(() => {
    fetch(`${apiUrl}/scores/top-group-a`)
      .then((res) => {
        if (!res.ok) throw new Error("Lỗi khi gọi API");
        return res.json();
      })
      .then((data: Score[]) => setScores(data))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [apiUrl]);

  return (
    <div className="h-full  bg-gray-100 flex flex-col items-center justify-center p-4">
      <div className="bg-white h-full shadow-2xl rounded-2xl p-8 w-full max-w-4xl">
        <h1 className="text-2xl font-bold text-gray-800 mb-6 text-center">
          Top Thí Sinh Khối A
        </h1>

        {loading ? (
          <div className="text-center text-blue-500 font-semibold animate-pulse">
            <RotateLoader></RotateLoader>
          </div>
        ) : error ? (
          <div className="text-center text-red-500 font-semibold">{error}</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm text-gray-700 border rounded-lg overflow-hidden">
              <thead className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white">
                <tr>
                  <th className="p-3 text-left">STT</th>
                  <th className="p-3 text-left">SBD</th>
                  <th className="p-3 text-center">Toán</th>
                  <th className="p-3 text-center">Vật Lí</th>
                  <th className="p-3 text-center">Hóa Học</th>
                  <th className="p-3 text-center">Tổng Điểm</th>
                </tr>
              </thead>
              <tbody className="bg-white">
                {scores.map((item, index) => (
                  <tr
                    key={item.sbd}
                    className="border-b hover:bg-gray-50 transition"
                  >
                    <td className="p-3">{index + 1}</td>
                    <td className="p-3 font-semibold">{item.sbd}</td>
                    <td className="p-3 text-center">{item.toan}</td>
                    <td className="p-3 text-center">{item.vat_li}</td>
                    <td className="p-3 text-center">{item.hoa_hoc}</td>
                    <td className="p-3 text-center font-bold text-green-600">
                      {item.tong_diem}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default TopGroupAScores;

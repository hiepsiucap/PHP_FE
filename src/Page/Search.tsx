/** @format */

import { useState, type ChangeEvent } from "react";
import { RotateLoader } from "react-spinners";
type Scores = {
  math: number;
  physics: number;
  chemistry: number;
  literature: number;
  english: number;
  biology: number;
  history: number;
  geography: number;
  civicEducation: number;
};

type SearchResult = {
  name: string;
  scores: Scores;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const mapBackendDataToScores = (data: any): Scores => ({
  math: data.toan ?? 0,
  physics: data.vat_li ?? 0,
  chemistry: data.hoa_hoc ?? 0,
  literature: data.ngu_van ?? 0,
  english: data.ngoai_ngu ?? 0,
  biology: data.sinh_hoc ?? 0,
  history: data.lich_su ?? 0,
  geography: data.dia_li ?? 0,
  civicEducation: data.gdcd ?? 0,
});

const SearchPage = () => {
  const [registrationNumber, setRegistrationNumber] = useState<string>("");
  const [searchResult, setSearchResult] = useState<SearchResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isloading, changeLoading] = useState<boolean>(false);
  const apiUrl = import.meta.env.VITE_API_URL;
  const handleSearch = async () => {
    if (!registrationNumber.trim()) {
      setError("Vui lòng nhập số báo danh.");
      setSearchResult(null);
      return;
    }

    changeLoading(true);
    try {
      const res = await fetch(
        `${apiUrl}/scores/check?sbd=${encodeURIComponent(
          registrationNumber.trim()
        )}`
      );

      if (!res.ok) {
        throw new Error("Số báo danh không tồn tại.");
      }

      const data = await res.json();

      setSearchResult({
        name: `${data.sbd}`,
        scores: mapBackendDataToScores(data),
      });
      changeLoading(false);
      setError(null);
    } catch (err) {
      changeLoading(false);
      setError(
        err instanceof Error ? err.message : "Đã xảy ra lỗi khi gọi API."
      );
      setSearchResult(null);
    }
  };

  return (
    <div className="p-6 bg-white h-full rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-blue-900 mb-6">
        Tra cứu điểm thi
      </h2>

      <div className="max-w-xl mx-auto">
        <div className="mb-8">
          <label
            htmlFor="registrationNumber"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Số báo danh:
          </label>
          <div className="flex">
            <input
              type="text"
              id="registrationNumber"
              className="flex-grow px-4 py-2 border border-gray-300 rounded-l-md focus:ring-blue-500 focus:border-blue-500"
              placeholder="Nhập số báo danh (thử với 01001231)"
              value={registrationNumber}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setRegistrationNumber(e.target.value)
              }
            />
            <button
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-r-md transition duration-200"
              onClick={handleSearch}
            >
              Tra cứu
            </button>
          </div>
          {error && <p className="mt-2 text-red-600 text-sm">{error}</p>}
        </div>
        {isloading && (
          <div className=" flex flex-row justify-center items-center">
            <RotateLoader color="#14e1cf" />
          </div>
        )}
        {searchResult && !isloading && (
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 animate-fade-in">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">
              Kết quả tra cứu
            </h3>
            <div className="mb-4">
              <p className="text-gray-600">Số báo danh:</p>
              <p className="font-medium text-lg">{searchResult.name}</p>
            </div>

            <div className="bg-white rounded-lg shadow-sm p-4 mb-4">
              <h4 className="font-medium text-gray-800 mb-3">
                Điểm các môn thi
              </h4>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {Object.entries(searchResult.scores).map(([subject, score]) => (
                  <div key={subject}>
                    <p className="text-gray-600 text-sm">
                      {subject.charAt(0).toUpperCase() + subject.slice(1)}:
                    </p>
                    <p className="font-semibold text-lg">
                      {score > 0 ? score : "Không có điểm"}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-blue-50 border border-blue-100 rounded-lg p-3 text-center">
                <p className="text-gray-600 text-sm">Điểm trung bình:</p>
                <p className="font-bold text-xl text-blue-600">
                  {(
                    Object.values(searchResult.scores).reduce(
                      (a, b) => a + b,
                      0
                    ) / 6
                  ).toFixed(2)}
                </p>
              </div>
              <div className="bg-green-50 border border-green-100 rounded-lg p-3 text-center">
                <p className="text-gray-600 text-sm">Tổng điểm khối A:</p>
                <p className="font-bold text-xl text-green-600">
                  {(
                    searchResult.scores.math +
                    searchResult.scores.physics +
                    searchResult.scores.chemistry
                  ).toFixed(2)}
                </p>
              </div>
              <div className="bg-purple-50 border border-purple-100 rounded-lg p-3 text-center">
                <p className="text-gray-600 text-sm">Tổng điểm khối D:</p>
                <p className="font-bold text-xl text-purple-600">
                  {(
                    searchResult.scores.math +
                    searchResult.scores.literature +
                    searchResult.scores.english
                  ).toFixed(2)}
                </p>
              </div>
              <div className="bg-purple-50 border border-purple-100 rounded-lg p-3 text-center">
                <p className="text-gray-600 text-sm">Tổng điểm khối C:</p>
                <p className="font-bold text-xl text-purple-600">
                  {(
                    searchResult.scores.history +
                    searchResult.scores.literature +
                    searchResult.scores.geography
                  ).toFixed(2)}
                </p>
              </div>
              <div className="bg-purple-50 border border-purple-100 rounded-lg p-3 text-center">
                <p className="text-gray-600 text-sm">Tổng điểm khối B:</p>
                <p className="font-bold text-xl text-orange-600">
                  {(
                    searchResult.scores.chemistry +
                    searchResult.scores.biology +
                    searchResult.scores.math
                  ).toFixed(2)}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchPage;

import React, { useState } from "react";
import axios from "axios";
import FailureReport from "./FailureReport";

const Inputform: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [status, setStatus] = useState<string | null>(null);
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFile(e.target.files[0]);
      setStatus(null);
      setError(null);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file); // Backend expects 'file'

    try {
      const response = await axios.post(
        "http://localhost:8000/analyze",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log("API result:", response.data);
      setResult(response.data);
      setStatus("success");
    } catch (err: any) {
      console.error(err);
      setError(
        "Error analyzing system. Please upload a valid JSON or YAML file."
      );
      setStatus("error");
    }
  };

  return (
    <div className="max-w-3xl mx-auto px-6 py-12 bg-gray-100 rounded-xl shadow">
      <h2 className="text-2xl font-bold mb-6">
        📁 Upload System Configuration
      </h2>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          type="file"
          accept=".json,.yaml,.yml"
          onChange={handleFileChange}
          className="bg-white border p-2 rounded shadow-sm"
        />

        <button
          type="submit"
          className="w-fit px-6 py-2 bg-blue-600 text-white font-semibold rounded hover:bg-blue-700 transition"
        >
          Submit
        </button>
      </form>

      {status === "success" && (
        <p className="mt-4 text-green-600 font-medium">
          ✅ Analysis Complete. See results below.
        </p>
      )}
      {status === "error" && (
        <p className="mt-4 text-red-600 font-medium">{error}</p>
      )}

      {result && <FailureReport result={result} />}
    </div>
  );
};

export default Inputform;

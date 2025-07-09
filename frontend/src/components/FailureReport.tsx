import React from "react";

interface FailureReportProps {
  result: {
    root_failures?: string[];
    cascade_path?: Record<string, string[]>;
    isolated_components?: string[];
    [key: string]: any;
  };
}

const FailureReport: React.FC<FailureReportProps> = ({ result }) => {
  if (!result) return null;

  return (
    <div className="mt-10 p-6 bg-white shadow-lg rounded-xl">
      <h2 className="text-2xl font-semibold mb-6 border-b pb-2 text-gray-800">
        Failure Analysis Report
      </h2>

      {/* Root Failures */}
      {result.root_failures && result.root_failures.length > 0 && (
        <section className="mb-6">
          <h3 className="text-lg font-medium text-red-600">🔴 Root Failures</h3>
          <ul className="list-disc list-inside text-gray-700 mt-2">
            {result.root_failures.map((failure, idx) => (
              <li key={idx}>{failure}</li>
            ))}
          </ul>
        </section>
      )}

      {/* Cascade Path */}
      {result.cascade_path && Object.keys(result.cascade_path).length > 0 && (
        <section className="mb-6">
          <h3 className="text-lg font-medium text-yellow-600">
            🟡 Cascade Paths
          </h3>
          {Object.entries(result.cascade_path).map(
            ([source, affected], idx) => (
              <div key={idx} className="ml-4 mt-2 text-gray-700">
                <span className="font-medium">{source} → </span>
                {affected.join(" → ")}
              </div>
            )
          )}
        </section>
      )}

      {/* Isolated Components */}
      {result.isolated_components && result.isolated_components.length > 0 && (
        <section>
          <h3 className="text-lg font-medium text-green-600">
            🟢 Isolated Components
          </h3>
          <ul className="list-disc list-inside text-gray-700 mt-2">
            {result.isolated_components.map((component, idx) => (
              <li key={idx}>{component}</li>
            ))}
          </ul>
        </section>
      )}
    </div>
  );
};

export default FailureReport;

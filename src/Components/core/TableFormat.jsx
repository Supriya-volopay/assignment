import { useNavigate } from "react-router-dom";

const FormateTable = ({ tableName, headerContent, headers, state, click }) => {
  const navigate = useNavigate();

  const handleRowClick = (row) => {
    if (click) {
      navigate(`/company/${row?.ticker}`);
    }
  };

  return (
    <>
      <h2 className="text-3xl text-center my-4">{tableName}</h2>
      <div className="flex items-center justify-center my-8">
        <table className="w-5/6 border-collapse border border-gray-400">
          <thead>
            <tr>
              {headerContent?.map((header, index) => (
                <th
                  key={index}
                  className="border border-gray-400 px-4 py-2 bg-white text-left font-medium text-gray-800"
                >
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {state?.map((row, rowIndex) => (
              <tr
                key={rowIndex}
                className={rowIndex % 2 === 0 ? "bg-gray-200" : "bg-white"}
                style={{ display: "table-row", cursor: "pointer" }}
                onClick={() => handleRowClick(row)}
              >
                {headers?.map((header, colIndex) => (
                  <td
                    key={colIndex}
                    className="border border-gray-400 px-4 py-2 text-left text-gray-800"
                  >
                    {row[header]}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default FormateTable;

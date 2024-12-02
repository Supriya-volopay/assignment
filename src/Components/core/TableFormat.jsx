import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Modal from "./Modal";

const FormateTable = ({
  tableName,
  headers,
  state,
  isClickable,
  isAction,
  action,
  onSave,
}) => {
  const navigate = useNavigate();

  const handleRowClick = (row) => {
    if (isClickable) {
      navigate(`/company/${row?.ticker}`);
    }
  };

  const [isModalOpen, setModalOpen] = useState(false);
  const [selectedRow, setSelectedRow] = useState();

  const handleSave = (data) => {
    onSave(data);
  };

  return (
    <>
      <h2 className="text-3xl text-center my-4">{tableName}</h2>
      <div className="flex items-center justify-center my-8">
        <table className="w-5/6 border-collapse border border-gray-400">
          <thead>
            <tr>
              {headers?.map((header, index) => (
                <th
                  key={index}
                  className="border border-gray-400 px-4 py-2 bg-white text-left font-medium text-gray-800"
                >
                  {header?.name}
                </th>
              ))}
              {isAction && (
                <th className="border border-gray-400 px-4 py-2 bg-white text-left font-medium text-gray-800">
                  Action
                </th>
              )}
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
                    {row[header?.slug]}
                  </td>
                ))}
                {isAction && (
                  <td className="border border-gray-400 px-4 py-2 text-left text-gray-800">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedRow(row);
                        setModalOpen(true);
                      }}
                      className="px-3 py-1 text-base text-white bg-blue-500 rounded-lg hover:bg-blue-600"
                    >
                      {action}
                    </button>
                    {isModalOpen && selectedRow?.id === row?.id && (
                      <Modal
                        isOpen={isModalOpen}
                        onClose={() => setModalOpen(false)}
                        onSave={handleSave}
                        topic="Update Product"
                        field={headers}
                        fieldData={selectedRow}
                      />
                    )}
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default FormateTable;

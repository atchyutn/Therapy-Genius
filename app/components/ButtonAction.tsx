import React, { useRef, useState } from "react";

interface ButtonActionProps {
  loading: boolean;
  activities: string | null;
}

const ButtonAction: React.FC<ButtonActionProps> = ({ loading, activities }) => {
  const [isEditable, setIsEditable] = useState(false);
  const printRef = useRef<HTMLDivElement>(null);
  const editableRef = useRef<HTMLDivElement>(null);

  const handlePrintClick = () => {
    if (editableRef.current && activities) {
      const printContent = editableRef.current.innerHTML;
      const printWindow = window.open("", "", "width=800,height=600");

      if (printWindow) {
        printWindow.document.write(`
          <html>
            <head>
              <style>
                @media print {
                  @page { margin: 20mm; }
                  body { 
                    -webkit-print-color-adjust: exact; 
                    margin: 0; 
                  }
                  body::before {
                    content: '';
                    display: block;
                    height: 20mm; /* space for header */
                  }
                  body::after {
                    content: '';
                    display: block;
                    height: 20mm; /* space for footer */
                  }
                  header {
                    position: fixed;
                    top: 0;
                    width: 100%;
                    height: 20mm;
                    background: white;
                    text-align: center;
                    padding: 10px;
                    border-bottom: 1px solid #ccc;
                  }
                  footer {
                    position: fixed;
                    bottom: 0;
                    width: 100%;
                    height: 20mm;
                    background: white;
                    text-align: center;
                    padding: 10px;
                    border-top: 1px solid #ccc;
                  }
                }
                .print-header, .print-footer {
                  width: 100%;
                  text-align: center;
                  padding: 10px 0;
                }
                .print-header {
                  border-bottom: 1px solid #ccc;
                }
                .print-footer {
                  border-top: 1px solid #ccc;
                }
                .company-info {
                  display: flex;
                  justify-content: space-between;
                }
                .company-info div {
                  flex: 1;
                }
              </style>
            </head>
            <body>
              <header class="print-header">
                <div class="company-info">
                  <div>Therapy Genius</div>
                  <div>123 Therapy St, Wellness City</div>
                  <div>+123-456-7890</div>
                </div>
              </header>
              <br />
              ${printContent}
              <br />  
              <footer class="print-footer">
                <div class="company-info">
                  <div>Therapy Genius</div>
                  <div>Contact us: info@reportgenius.com</div>
                  <div>+123-456-7890</div>
                </div>
              </footer>
            </body>
          </html>
        `);
        printWindow.document.close();
        printWindow.print();
      }
    }
  };

 const handleEditClick = () => {
   setIsEditable(true);
   if (editableRef.current) {
     editableRef.current.focus();
   }
 };

  // Optional: Implement saving functionality
  // const handleSaveClick = () => {
  //   // Logic for saving the edited content
  // };

  return !loading && activities ? (
    <div ref={printRef} className="p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-bold mb-4">Generated Therapy Activities:</h2>
      <div
        ref={editableRef}
        className={`mt-4 ${isEditable ? "border border-indigo-600 p-2" : ""}`}
        contentEditable={isEditable}
        suppressContentEditableWarning={true}
        dangerouslySetInnerHTML={{ __html: activities }}
      />
      <div className="flex justify-end space-x-2 mt-4">
        <button
          onClick={handlePrintClick}
          className="bg-gradient-to-r from-purple-500 via-purple-600 to-purple-700 text-white font-semibold py-2 px-4 rounded-lg shadow-md hover:bg-indigo-200 transition duration-300"
        >
          Print Activities
        </button>
        <button
          className={`text-white font-semibold py-2 px-4 rounded-lg shadow-md transition duration-300 ${
            isEditable
              ? "bg-red-700 hover:bg-red-600"
              : "bg-blue-700 hover:bg-blue-600"
          }`}
          onClick={handleEditClick}
        >
          {isEditable ? "Cancel Edit" : "Edit Report"}
        </button>
        {/* {isEditable && (
            <button
              className="bg-green-700 text-white font-semibold py-2 px-4 rounded-lg shadow-md hover:bg-green-600 transition duration-300"
              onClick={handleSaveClick}
            >
              Save Report
            </button>
          )} */}
      </div>
    </div>
  ) : null;
};

export default ButtonAction;

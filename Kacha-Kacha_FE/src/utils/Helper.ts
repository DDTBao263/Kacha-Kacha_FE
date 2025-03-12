
// Function to export data to Excel format
export const exportToExcel = async (fileName: string) => {
  // In a real application, you would use a library like exceljs or xlsx
  // to generate the Excel file with the actual data

  // Simulating the export process
  return new Promise<void>((resolve) => {
    setTimeout(() => {
      console.log(`Exporting to Excel: ${fileName}.xlsx`)
      resolve()
    }, 1500)
  })
}

// Function to export data to CSV format
export const exportToCSV = async (fileName: string) => {
  // In a real application, you would generate a CSV string
  // and create a download link for it

  // Simulating the export process
  return new Promise<void>((resolve) => {
    setTimeout(() => {
      console.log(`Exporting to CSV: ${fileName}.csv`)
      resolve()
    }, 1000)
  })
}

// Function to export data to PDF format
export const exportToPDF = async (fileName: string) => {
  // In a real application, you would use a library like jspdf
  // to generate the PDF file with the actual data

  // Simulating the export process
  return new Promise<void>((resolve) => {
    setTimeout(() => {
      console.log(`Exporting to PDF: ${fileName}.pdf`)
      resolve()
    }, 2000)
  })
}

//
export function getStatusVariant(status: string) {
  switch (status) {
    case "Present":
      return "success";
    case "Absent":
      return "destructive";
    case "Late":
      return "warning";
    default:
      return "default";
  }
}
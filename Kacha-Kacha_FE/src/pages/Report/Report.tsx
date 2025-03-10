import { useState } from "react"
import { CalendarIcon, Download, FileSpreadsheet, Loader2 ,ChevronRight , ChevronLeft} from "lucide-react"
import { format } from "date-fns"
import { Button } from "../../components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../components/ui/select"
import { Popover, PopoverContent, PopoverTrigger } from "../../components/ui/popover"
import { Input } from "../../components/ui/input"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "../../components/ui/dropdown"
import { cn } from "../../lib/utils"
import { AttendanceTable } from "../../components/PageUI/Report/AttendanceTable"
// import { exportToExcel, exportToCSV, exportToPDF } from "../../utils/Helper"

// Mock data for restaurants
const restaurants = [
  { id: "1", name: "Downtown Bistro" },
  { id: "2", name: "Seaside Grill" },
  { id: "3", name: "Mountain View Restaurant" },
  { id: "4", name: "City Center Café" },
]

export default function TimekeepingExport() {
  const [selectedRestaurant, setSelectedRestaurant] = useState("")
  const [date, setDate] = useState<Date>()
  const [searchQuery, setSearchQuery] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [isExporting, setIsExporting] = useState(false)
//   const { toast } = useToast()

  // Function to handle export
  const handleExport = async (exportFormat: "excel" | "csv" | "pdf") => {
    // // if (!selectedRestaurant || !date) {
    // //   toast({
    // //     title: "Missing information",
    // //     description: "Please select a restaurant and month before exporting.",
    // //     variant: "destructive",
    // //   })
    // //   return
    // // }

    // setIsExporting(true)
    // try {
    //   // In a real application, you would fetch the data here
    //   // For this example, we'll use the mock data from the AttendanceTable component

    //   const fileName = `${restaurants.find((r) => r.id === selectedRestaurant)?.name}-${format(date, "MMMM-yyyy")}`

    //   if (exportFormat === "excel") {
    //     await exportToExcel(fileName)
    //   } else if (exportFormat === "csv") {
    //     await exportToCSV(fileName)
    //   } else if (exportFormat === "pdf") {
    //     await exportToPDF(fileName)
    //   }

    // //   toast({
    // //     title: "Export successful",
    // //     description: `The data has been exported to ${format.toUpperCase()} format.`,
    // //   })
    // } catch (error) {
    // //   toast({
    // //     title: "Export failed",
    // //     description: "There was an error exporting the data. Please try again.",
    // //     variant: "destructive",
    // //   })
    // } finally {
    //   setIsExporting(false)
    // }
  }

  // Function to load data when restaurant and date are selected
  const loadData = () => {
    if (!selectedRestaurant || !date) return

    setIsLoading(true)
    // In a real application, you would fetch the data here
    setTimeout(() => {
      setIsLoading(false)
    }, 1000)
  }

  return (
    <div className="container mx-auto py-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold tracking-tight">Timekeeping Export</h1>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Export Settings</CardTitle>
          <CardDescription>Select a restaurant and month to export employee attendance data</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label htmlFor="restaurant" className="text-sm font-medium">
                Select Restaurant
              </label>
              <Select
                value={selectedRestaurant}
                onValueChange={(value) => {
                  setSelectedRestaurant(value)
                  loadData()
                }}
              >
                <SelectTrigger id="restaurant">
                  <SelectValue placeholder="Select a restaurant" />
                </SelectTrigger>
                <SelectContent>
                  {restaurants.map((restaurant) => (
                    <SelectItem key={restaurant.id} value={restaurant.id}>
                      {restaurant.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label htmlFor="month" className="text-sm font-medium">
                Select Month
              </label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    id="month"
                    variant="outline"
                    className={cn("w-full justify-start text-left font-normal", !date && "text-muted-foreground")}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {date ? format(date, "MMMM yyyy") : "Select month"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <div className="p-3">
                    <div className="grid grid-cols-3 gap-2">
                      {Array.from({ length: 12 }, (_, i) => {
                        const monthDate = new Date()
                        monthDate.setMonth(i)
                        return (
                          <Button
                            key={i}
                            variant="outline"
                            className={cn(
                              "h-9 w-full",
                              date && date.getMonth() === i && "bg-primary text-primary-foreground",
                            )}
                            onClick={() => {
                              const newDate = new Date()
                              newDate.setMonth(i)
                              if (date) {
                                newDate.setFullYear(date.getFullYear())
                              }
                              setDate(newDate)
                              loadData()
                            }}
                          >
                            {format(new Date(0, i), "MMM")}
                          </Button>
                        )
                      })}
                    </div>
                    <div className="mt-3 flex justify-center">
                      <div className="flex items-center gap-2">
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() => {
                            const newDate = new Date(date || new Date())
                            newDate.setFullYear(newDate.getFullYear() - 1)
                            setDate(newDate)
                          }}
                        >
                          <ChevronLeft className="h-4 w-4" />
                        </Button>
                        <div className="text-sm font-medium">
                          {date ? format(date, "yyyy") : format(new Date(), "yyyy")}
                        </div>
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() => {
                            const newDate = new Date(date || new Date())
                            newDate.setFullYear(newDate.getFullYear() + 1)
                            setDate(newDate)
                          }}
                        >
                          <ChevronRight className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </PopoverContent>
              </Popover>
            </div>
          </div>

          <div className="flex justify-end space-x-2">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button disabled={!selectedRestaurant || !date || isExporting}>
                  {isExporting ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Exporting...
                    </>
                  ) : (
                    <>
                      <Download className="mr-2 h-4 w-4" />
                      Export
                    </>
                  )}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem onClick={() => handleExport("excel")}>
                  <FileSpreadsheet className="mr-2 h-4 w-4" />
                  Export to Excel
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleExport("csv")}>
                  <FileSpreadsheet className="mr-2 h-4 w-4" />
                  Export to CSV
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleExport("pdf")}>
                  <FileSpreadsheet className="mr-2 h-4 w-4" />
                  Export to PDF
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Attendance Data Preview</CardTitle>
          <CardDescription>Preview employee attendance data before exporting</CardDescription>
          <div className="mt-4">
            <Input
              placeholder="Search employees..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="max-w-sm"
            />
          </div>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="flex justify-center items-center py-8">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
          ) : selectedRestaurant && date ? (
            <AttendanceTable searchQuery={searchQuery} />
          ) : (
            <div className="text-center py-8 text-muted-foreground">
              Select a restaurant and month to view attendance data
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}


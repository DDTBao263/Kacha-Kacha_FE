import { useState, useEffect } from "react"
import { CalendarIcon, Download, FileSpreadsheet, Loader2, ChevronRight, ChevronLeft } from "lucide-react"
import { format } from "date-fns"
import { Button } from "../../components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../components/ui/select"
import { Popover, PopoverContent, PopoverTrigger } from "../../components/ui/popover"
import { Input } from "../../components/ui/input"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "../../components/ui/dropdown"
import { cn } from "../../lib/utils"
import { storeService } from "../../services/store"
import { Store } from "../../types/store"
import { reportService } from "../../services/report"
import { alert } from "../../utils/Alert"

// import { exportToExcel, exportToCSV, exportToPDF } from "../../utils/Helper"

export default function TimekeepingExport() {
  const [selectedRestaurant, setSelectedRestaurant] = useState("")
  const [date, setDate] = useState<Date>()
  const [searchQuery, setSearchQuery] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [isExporting, setIsExporting] = useState(false)
  const [restaurants, setRestaurants] = useState<Store[]>([])
  //   const { toast } = useToast()

  useEffect(() => {
    fetchRestaurants()
  }, [])

  const fetchRestaurants = async () => {
    try {
      const response = await storeService.getStoresBySearch("")
      const content = response.data.content || response.data.data?.content
      const restaurantsData = content.map((store: any) => ({
        id: store.id,
        name: `Kacha-Kacha ${store.location}`,
        location: store.location,
        phoneNumber: store.phoneNumber,
        status: store.status,
        storeManager: store.storeManager
      }))
      setRestaurants(restaurantsData)
    } catch (error) {
      console.error('Failed to fetch restaurants:', error)
    }
  }

  // Function to handle export
  const handleExport = async (exportFormat: "excel" | "csv" | "pdf") => {
    if (!selectedRestaurant || !date) {
      alert.error("Vui lòng chọn nhà hàng và tháng trước khi xuất báo cáo")
      return
    }

    setIsExporting(true)
    try {
      const month = date.getMonth() + 1 // JavaScript months are 0-based
      const response = await reportService.exportReport(parseInt(selectedRestaurant), month)

      // Lấy URL từ response
      const downloadUrl = response.data

      // Fetch file từ URL
      const fileResponse = await fetch(downloadUrl)
      const blob = await fileResponse.blob()

      // Tạo URL từ blob
      const url = window.URL.createObjectURL(blob)

      // Tạo link tải và click tự động
      const link = document.createElement('a')
      link.href = url
      const restaurantName = restaurants.find(r => r.id.toString() === selectedRestaurant)?.name || 'report'
      link.download = `${restaurantName}-${format(date, "MMMM-yyyy")}.xlsx`
      document.body.appendChild(link)
      link.click()

      // Cleanup
      document.body.removeChild(link)
      window.URL.revokeObjectURL(url)

      // Thông báo thành công
      alert.success("Xuất báo cáo thành công!")
    } catch (error) {
      console.error('Failed to export report:', error)
      alert.error("Không thể xuất báo cáo. Vui lòng thử lại sau!")
    } finally {
      setIsExporting(false)
    }
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
                <SelectContent className="max-h-[300px] overflow-y-auto">
                  {restaurants.map((restaurant) => (
                    <SelectItem key={restaurant.id} value={restaurant.id.toString()}>
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
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}


import {
  ArrowUp,
  Building,
  LineChart,
  PieChart,
  User,
  Users,
} from "lucide-react"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../components/ui/card"

import { Tabs, TabsContent } from "../../components/ui/tabs"

import {
  CartesianGrid,
  Cell,
  Line,
  LineChart as RechartsLineChart,
  Pie,
  PieChart as RechartsPieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "../../components/ui/chart"
import { useEffect, useState } from "react"
import { dashboardService } from "../../services/dashboard"

interface MonthlyData {
  name: string
  restaurants: number
  accounts: number
}

interface StatusData {
  name: string
  value: number
}

// Interface cho response của API growth
interface GrowthData {
  countRestaurant: number
  month: number
  year: number
  countUser: number
}

// Interface cho response của API restaurant status
interface RestaurantStatusData {
  countInactive: number
  total: number
  closedPercent: number
  openPercent: number
  countActive: number
}

export default function AdminDashboard() {
  const currentYear = new Date().getFullYear()
  const currentMonth = new Date().getMonth() + 1

  // State for API data
  const [monthlyData, setMonthlyData] = useState<MonthlyData[]>([])
  const [restaurantStatusData, setRestaurantStatusData] = useState<StatusData[]>([])
  const [currentRestaurantCount, setCurrentRestaurantCount] = useState<number>(0)
  const [lastMonthRestaurantCount, setLastMonthRestaurantCount] = useState<number>(0)
  const [currentAccountCount, setCurrentAccountCount] = useState<number>(0)
  const [lastMonthAccountCount, setLastMonthAccountCount] = useState<number>(0)
  const [loading, setLoading] = useState<boolean>(true)

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true)

        // Fetch growth data for the line chart
        const growthResponse = await dashboardService.getGrowthData(currentYear)
        if (growthResponse.data && growthResponse.data.data) {
          const formattedData = growthResponse.data.data.map((item: GrowthData) => ({
            name: getMonthName(item.month),
            restaurants: item.countRestaurant,
            accounts: item.countUser
          }))
          setMonthlyData(formattedData)

          // Lấy dữ liệu tháng hiện tại và tháng trước từ dữ liệu growth
          const currentMonthData = growthResponse.data.data.find((item: GrowthData) =>
            item.month === currentMonth && item.year === currentYear
          )

          const lastMonth = currentMonth === 1 ? 12 : currentMonth - 1
          const lastMonthYear = currentMonth === 1 ? currentYear - 1 : currentYear

          const lastMonthData = growthResponse.data.data.find((item: GrowthData) =>
            item.month === lastMonth && item.year === lastMonthYear
          )

          if (currentMonthData) {
            setCurrentRestaurantCount(currentMonthData.countRestaurant)
            setCurrentAccountCount(currentMonthData.countUser)
          }

          if (lastMonthData) {
            setLastMonthRestaurantCount(lastMonthData.countRestaurant)
            setLastMonthAccountCount(lastMonthData.countUser)
          }
        }

        // Fetch restaurant status data for pie chart
        const statusResponse = await dashboardService.getRestaurantsStatusCount()
        if (statusResponse.data && statusResponse.data.data) {
          const responseData = statusResponse.data.data as RestaurantStatusData;

          // Tạo dữ liệu cho biểu đồ tròn chỉ với Active và Inactive
          const pieChartData = [
            { name: 'Active', value: responseData.countActive },
            { name: 'Inactive', value: responseData.countInactive }
          ];

          setRestaurantStatusData(pieChartData);
        }

      } catch (error) {
        console.error("Error fetching dashboard data:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchDashboardData()
  }, [])

  // Helper function to get month name
  const getMonthName = (monthNumber: number): string => {
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
    return months[monthNumber - 1]
  }

  // Calculate percentage change
  const calculatePercentChange = (current: number, previous: number): number => {
    if (previous === 0) return 100
    return Number(((current - previous) / previous * 100).toFixed(0))
  }

  const restaurantPercentChange = calculatePercentChange(currentRestaurantCount, lastMonthRestaurantCount)
  const accountPercentChange = calculatePercentChange(currentAccountCount, lastMonthAccountCount)

  return (
    <div className="flex min-h-screen w-full flex-col">
      <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
        <div className="flex items-center gap-4">
          <h1 className="text-2xl font-bold">Admin Dashboard</h1>
        </div>

        {/* Key Metrics Cards */}
        <div className="grid gap-4 md:grid-cols-2 md:gap-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Restaurants</CardTitle>
              <Building className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{currentRestaurantCount}</div>
              <div className={`flex items-center text-xs ${restaurantPercentChange >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                <ArrowUp className={`mr-1 h-3 w-3 ${restaurantPercentChange < 0 ? 'rotate-180' : ''}`} />
                <span>{Math.abs(restaurantPercentChange)}% from last month</span>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Accounts</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{currentAccountCount}</div>
              <div className={`flex items-center text-xs ${accountPercentChange >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                <ArrowUp className={`mr-1 h-3 w-3 ${accountPercentChange < 0 ? 'rotate-180' : ''}`} />
                <span>{Math.abs(accountPercentChange)}% from last month</span>
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="growth">
          {/* Growth Tab - Charts showing growth trends */}
          <TabsContent value="growth" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <LineChart className="h-5 w-5" />
                    Growth Trends
                  </CardTitle>
                  <CardDescription>Monthly growth of restaurants and accounts</CardDescription>
                </CardHeader>
                <CardContent className="pt-4">
                  <div className="h-[300px]">
                    {loading ? (
                      <div className="flex h-full items-center justify-center">Loading chart data...</div>
                    ) : (
                      <ResponsiveContainer width="100%" height="100%">
                        <RechartsLineChart
                          data={monthlyData}
                          margin={{
                            top: 5,
                            right: 10,
                            left: 0,
                            bottom: 0,
                          }}
                        >
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="name" />
                          <YAxis />
                          <Tooltip />
                          <Line
                            type="monotone"
                            dataKey="restaurants"
                            stroke="#8b5cf6"
                            activeDot={{ r: 8 }}
                            name="Restaurants"
                          />
                          <Line type="monotone" dataKey="accounts" stroke="#3b82f6" name="Accounts" />
                        </RechartsLineChart>
                      </ResponsiveContainer>
                    )}
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <PieChart className="h-5 w-5" />
                    Restaurant Status Distribution
                  </CardTitle>
                  <CardDescription>Active vs Inactive restaurants</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px]">
                    {loading ? (
                      <div className="flex h-full items-center justify-center">Loading chart data...</div>
                    ) : (
                      <ResponsiveContainer width="100%" height="100%">
                        <RechartsPieChart>
                          <Pie
                            data={restaurantStatusData}
                            cx="50%"
                            cy="50%"
                            labelLine={false}
                            label={({ name, value, percent }) => `${name}: ${value} (${(percent * 100).toFixed(0)}%)`}
                            outerRadius={80}
                            fill="#8884d8"
                            dataKey="value"
                          >
                            {restaurantStatusData.map((entry, index) => (
                              <Cell
                                key={`cell-${index}`}
                                fill={entry.name === 'Active' ? '#4ade80' : '#ef4444'}
                              />
                            ))}
                          </Pie>
                          <Tooltip />
                        </RechartsPieChart>
                      </ResponsiveContainer>
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}


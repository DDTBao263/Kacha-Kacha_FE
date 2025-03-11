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

export default function AdminDashboard() {

  // Monthly data
  const monthlyData = [
    { name: "Jan", restaurants: 12, accounts: 82 },
    { name: "Feb", restaurants: 14, accounts: 91 },
    { name: "Mar", restaurants: 16, accounts: 105 },
    { name: "Apr", restaurants: 18, accounts: 118 },
    { name: "May", restaurants: 20, accounts: 124},
    { name: "Jun", restaurants: 22, accounts: 136 },
    { name: "Aug", restaurants: 24, accounts: 142 },
    { name: "Sep", restaurants: 24, accounts: 142 },
    { name: "Oct", restaurants: 24, accounts: 142 },
    { name: "Noc", restaurants: 24, accounts: 142 },
    { name: "Dec", restaurants: 24, accounts: 142 },

  ]

  // Restaurant location data
  const restaurantLocationData = [
    { name: "Open", value: 8 },
    { name: "Closed", value: 6 },
  ]

  return (
    <div className="flex min-h-screen w-full flex-col">
      <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
        <div className="flex items-center gap-4">
          <h1 className="text-2xl font-bold">Admin Dashboard</h1>
        </div>

        {/* Key Metrics Cards */}
        <div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-3">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Restaurants</CardTitle>
              <Building className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">24</div>
              <div className="flex items-center text-xs text-green-500">
                <ArrowUp className="mr-1 h-3 w-3" />
                <span>12% from last month</span>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Accounts</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">142</div>
              <div className="flex items-center text-xs text-green-500">
                <ArrowUp className="mr-1 h-3 w-3" />
                <span>8% from last month</span>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Users</CardTitle>
              <User className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">128</div>
              <div className="flex items-center text-xs text-green-500">
                <ArrowUp className="mr-1 h-3 w-3" />
                <span>4% from last month</span>
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
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <PieChart className="h-5 w-5" />
                    Total number of restaurants in the chain
                  </CardTitle>
              
                </CardHeader>
                <CardContent>
                  <div className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <RechartsPieChart>
                        <Pie
                          data={restaurantLocationData}
                          cx="50%"
                          cy="50%"
                          labelLine={false}
                          label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                          outerRadius={80}
                          fill="#8884d8"
                          dataKey="value"
                        >
                          {restaurantLocationData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={`hsl(${index * 45}, 70%, 60%)`} />
                          ))}
                        </Pie>
                        <Tooltip />
                      </RechartsPieChart>
                    </ResponsiveContainer>
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


import { UserX } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "../../../components/ui/card"

interface AbsentCardProps {
  absentCount: number;
  totalEmployees: number;
}

export function AbsentCard({ absentCount, totalEmployees }: AbsentCardProps) {
    return (
        <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Absent</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center">
                <UserX className="mr-2 h-4 w-4 text-red-500" />
                <div className="text-2xl font-bold">{absentCount}</div>
                <div className="ml-2 text-sm text-muted-foreground">/ {totalEmployees}</div>
              </div>
            </CardContent>
          </Card>
    )
}
import { UserCheck } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "../../../components/ui/card"

interface PresentCardProps {
  presentCount: number;
  totalEmployees: number;
}

export function PresentCard({ presentCount, totalEmployees }: PresentCardProps) {
    return (
        <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Present</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center">
                <UserCheck className="mr-2 h-4 w-4 text-green-500" />
                <div className="text-2xl font-bold">{presentCount}</div>
                <div className="ml-2 text-sm text-muted-foreground">/ {totalEmployees}</div>
              </div>
            </CardContent>
          </Card>
    )
}
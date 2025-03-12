import { Clock } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "../../../components/ui/card"

interface LateCardProps {
  lateCount: number;
}

export function LateCard({ lateCount }: LateCardProps) {
    return (
        <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium">Late Arrivals</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center">
            <Clock className="mr-2 h-4 w-4 text-amber-500" />
            <div className="text-2xl font-bold">{lateCount}</div>
            <div className="ml-2 text-sm text-muted-foreground">employees</div>
          </div>
        </CardContent>
      </Card>
    )
}
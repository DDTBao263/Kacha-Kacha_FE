import { Clock, Users, ClipboardCheck } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../../components/ui/card"
import { useNavigate } from "react-router-dom"

export function QuickAction() {
    const navigate = useNavigate();
    return (
        <Card>
            <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
                <CardDescription>Common tasks for store management</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="grid gap-2">
                    <div
                        onClick={() => navigate("/storemanager/attendance")}
                        className="flex items-center gap-2 rounded-lg border p-3 hover:bg-muted transition-colors cursor-pointer"
                    >
                        <Clock className="h-5 w-5 text-primary" />
                        <div className="flex-1">
                            <p className="font-medium">Manage Attendance</p>
                            <p className="text-sm text-muted-foreground">View and edit employee clock-ins</p>
                        </div>
                    </div>
                    <div
                        onClick={() => navigate("/storemanager/leaverequest")}
                        className="flex items-center gap-2 rounded-lg border p-3 hover:bg-muted transition-colors cursor-pointer"
                    >
                        <ClipboardCheck className="h-5 w-5 text-primary" />
                        <div className="flex-1">
                            <p className="font-medium">Approve Leave Requests</p>
                            <p className="text-sm text-muted-foreground">Review pending leave requests</p>
                        </div>
                    </div>
                    <div
                        onClick={() => navigate("/storemanager/schedule")}
                        className="flex items-center gap-2 rounded-lg border p-3 hover:bg-muted transition-colors cursor-pointer"
                    >
                        <Users className="h-5 w-5 text-primary" />
                        <div className="flex-1">
                            <p className="font-medium">Create Schedule</p>
                            <p className="text-sm text-muted-foreground">Manage weekly employee schedules</p>
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}
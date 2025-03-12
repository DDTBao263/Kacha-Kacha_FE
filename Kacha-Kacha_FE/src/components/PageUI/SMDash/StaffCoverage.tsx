import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../../components/ui/card"
import { Users } from "lucide-react"
import { Badge } from "../../../components/ui/badge"


export function StaffCoverage() {
    const staffCoverage = [
        { day: "Monday", coverage: 75, staff: 15 },
        { day: "Tuesday", coverage: 80, staff: 16 },
        { day: "Wednesday", coverage: 65, staff: 13 },
        { day: "Thursday", coverage: 90, staff: 18 },
        { day: "Friday", coverage: 95, staff: 19 },
        { day: "Saturday", coverage: 50, staff: 10 },
        { day: "Sunday", coverage: 45, staff: 9 },
    ]

    function getCoverageVariant(coverage: number) {
        if (coverage >= 80) return "success"
        if (coverage >= 60) return "default"
        if (coverage >= 40) return "warning"
        return "destructive"
    }

    return (
        <Card className="col-span-2">
            <CardHeader>
                <CardTitle>Staff Coverage</CardTitle>
                <CardDescription>Daily staff coverage for the current week</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="space-y-4">
                {staffCoverage.map((day, index) => (
                    <div key={index} className="flex items-center gap-4">
                    <div className="w-24 text-sm font-medium">{day.day}</div>
                    <div className="flex-1">
                        <div className="flex h-2 w-full overflow-hidden rounded-full bg-secondary">
                        <div className="bg-primary" style={{ width: `${day.coverage}%` }} />
                        </div>
                    </div>
                    <div className="flex items-center gap-1">
                        <Users className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm font-medium">{day.staff}</span>
                    </div>
                    <Badge variant={getCoverageVariant(day.coverage)}>{day.coverage}%</Badge>
                    </div>
                ))}
                </div>
            </CardContent>
        </Card>
    )
}


// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../../components/ui/card"
// import { Users } from "lucide-react"
// import { Badge } from "../../../components/ui/badge"
// import React from "react"

// interface StaffCoverageProps {
//     data: {
//         day: string
//         coverage: number
//         staff: number
//     }[]
// }

// export function StaffCoverage({ data }: StaffCoverageProps) {
//     function getCoverageVariant(coverage: number) {
//         if (coverage >= 80) return "success"
//         if (coverage >= 60) return "default"
//         if (coverage >= 40) return "warning"
//         return "destructive"
//     }

//     return (
//         <Card className="col-span-2">
//             <CardHeader>
//                 <CardTitle>Staff Coverage</CardTitle>
//                 <CardDescription>Daily staff coverage for the current week</CardDescription>
//             </CardHeader>
//             <CardContent>
//                 <div className="space-y-4">
//                 {data.map((day, index) => (
//                     <div key={index} className="flex items-center gap-4">
//                     <div className="w-24 text-sm font-medium">{day.day}</div>
//                     <div className="flex-1">
//                         <div className="flex h-2 w-full overflow-hidden rounded-full bg-secondary">
//                         <div className="bg-primary" style={{ width: `${day.coverage}%` }} />
//                         </div>
//                     </div>
//                     <div className="flex items-center gap-1">
//                         <Users className="h-4 w-4 text-muted-foreground" />
//                         <span className="text-sm font-medium">{day.staff}</span>
//                     </div>
//                     <Badge variant={getCoverageVariant(day.coverage)}>{day.coverage}%</Badge>
//                     </div>
//                 ))}
//                 </div>
//             </CardContent>
//         </Card>
//     )
// }
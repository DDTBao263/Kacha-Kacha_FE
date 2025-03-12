import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../../components/ui/card";
import { Users } from "lucide-react";
import { Badge } from "../../../components/ui/badge";
import React from "react";

interface StaffCoverageProps {
    data: {
        date: string;
        totalEmployeeOfRestaurant: number;
        numberOfEmployeeOnShift: number;
        percent: number;
    }[];
}

export function StaffCoverage({ data }: StaffCoverageProps) {
    function getCoverageVariant(coverage: number) {
        if (coverage >= 80) return "success";
        if (coverage >= 60) return "default";
        if (coverage >= 40) return "warning";
        return "destructive";
    }

    return (
        <Card className="col-span-2">
            <CardHeader>
                <CardTitle>Staff Coverage</CardTitle>
                <CardDescription>Daily staff coverage for the current week</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="space-y-4">
                    {data.map((day, index) => (
                        <div key={index} className="flex items-center gap-4">
                            <div className="w-24 text-sm font-medium">{day.date}</div>
                            <div className="flex-1">
                                <div className="flex h-2 w-full overflow-hidden rounded-full bg-secondary">
                                    <div className="bg-primary" style={{ width: `${day.percent}%` }} />
                                </div>
                            </div>
                            <div className="flex items-center gap-1">
                                <Users className="h-4 w-4 text-muted-foreground" />
                                <span className="text-sm font-medium">{day.numberOfEmployeeOnShift}/{day.totalEmployeeOfRestaurant}</span>
                            </div>
                            <Badge variant={getCoverageVariant(day.percent)}>{day.percent}%</Badge>
                        </div>
                    ))}
                </div>
            </CardContent>
        </Card>
    );
}

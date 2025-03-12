import { useState } from "react"
import { Calendar, Check, Clock, Download, Filter, Search, X } from "lucide-react"

import { Button } from "../../../components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../../components/ui/card"
import { Input } from "../../../components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../../../components/ui/table"
import { Badge } from "../../../components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../../components/ui/select"

interface ApproveCardProps {
    ApproveCount: number;
}

export function ApproveCard({ ApproveCount }: ApproveCardProps) {
    return (
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Approve</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
                <Check className="mr-2 h-4 w-4 text-green-500" />
              <div className="text-2xl font-bold">{ApproveCount}</div>
              <div className="ml-2 text-sm text-muted-foreground">this month</div>
            </div>
          </CardContent>
        </Card>
    )
}
import { useState } from "react"
import { Calendar, Check, Clock, Download, Filter, Search, X } from "lucide-react"

import { Button } from "../../../components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../../components/ui/card"
import { Input } from "../../../components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../../../components/ui/table"
import { Badge } from "../../../components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../../components/ui/select"


interface PendingCardProps {
    pendingCount: number;
}

export function PendingCard({ pendingCount }: PendingCardProps) {
    return (
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Pending</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <Clock className="mr-2 h-4 w-4 text-amber-500" />
              <div className="text-2xl font-bold">{pendingCount}</div>
              <div className="ml-2 text-sm text-muted-foreground">requests</div>
            </div>
          </CardContent>
        </Card>
    )
}
import { Avatar, AvatarFallback, AvatarImage } from "../../ui/avatar"
import { CheckCircle2, Clock, XCircle, Calendar, FileEdit } from "lucide-react"

export function RecentActivity() {
  const activities = [
    {
      id: 1,
      user: {
        name: "Sarah Johnson",
        avatar: "/placeholder.svg?height=32&width=32",
        initials: "SJ",
      },
      action: "checked in",
      time: "Just now",
      icon: CheckCircle2,
      iconColor: "text-green-500",
    },
    {
      id: 2,
      user: {
        name: "Michael Chen",
        avatar: "/placeholder.svg?height=32&width=32",
        initials: "MC",
      },
      action: "is late",
      time: "10 minutes ago",
      icon: Clock,
      iconColor: "text-amber-500",
    },
    {
      id: 3,
      user: {
        name: "Emily Rodriguez",
        avatar: "/placeholder.svg?height=32&width=32",
        initials: "ER",
      },
      action: "requested leave",
      time: "1 hour ago",
      icon: Calendar,
      iconColor: "text-blue-500",
    },
    {
      id: 4,
      user: {
        name: "David Kim",
        avatar: "/placeholder.svg?height=32&width=32",
        initials: "DK",
      },
      action: "missed shift",
      time: "Yesterday",
      icon: XCircle,
      iconColor: "text-red-500",
    },
    {
      id: 5,
      user: {
        name: "Lisa Wang",
        avatar: "/placeholder.svg?height=32&width=32",
        initials: "LW",
      },
      action: "updated schedule",
      time: "Yesterday",
      icon: FileEdit,
      iconColor: "text-purple-500",
    },
  ]

  return (
    <div className="space-y-4">
      {activities.map((activity) => (
        <div key={activity.id} className="flex items-center gap-4">
          <Avatar className="h-8 w-8">
            <AvatarImage src={activity.user.avatar} alt={activity.user.name} />
            <AvatarFallback>{activity.user.initials}</AvatarFallback>
          </Avatar>
          <div className="flex-1 space-y-1">
            <p className="text-sm font-medium leading-none">{activity.user.name}</p>
            <p className="text-sm text-muted-foreground">{activity.action}</p>
          </div>
          <div className="flex items-center gap-2">
            <activity.icon className={`h-4 w-4 ${activity.iconColor}`} />
            <span className="text-xs text-muted-foreground">{activity.time}</span>
          </div>
        </div>
      ))}
    </div>
  )
}


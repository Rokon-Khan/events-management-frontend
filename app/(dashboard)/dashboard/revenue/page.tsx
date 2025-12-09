"use client";

import { GlowCard } from "@/components/glow-card";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useAuth } from "@/lib/auth-context";
import { mockEvents } from "@/lib/mock-data";
import {
  ArrowDownRight,
  ArrowUpRight,
  Calendar,
  CreditCard,
  DollarSign,
  TrendingUp,
} from "lucide-react";

export default function RevenuePage() {
  const { user } = useAuth();

  const isAdmin = user?.role === "ADMIN";
  const events = isAdmin
    ? mockEvents
    : mockEvents.filter((e) => e.hostId === user?.id);

  const totalRevenue = events.reduce(
    (acc, e) => acc + e.fee * e.currentParticipants,
    0
  );
  const thisMonthRevenue = totalRevenue * 0.4;
  const lastMonthRevenue = totalRevenue * 0.35;
  const revenueGrowth =
    ((thisMonthRevenue - lastMonthRevenue) / lastMonthRevenue) * 100;

  const transactions = events
    .filter((e) => e.fee > 0)
    .flatMap((event) =>
      Array.from({ length: Math.min(event.currentParticipants, 3) }).map(
        (_, idx) => ({
          id: `${event.id}-${idx}`,
          eventName: event.name,
          amount: event.fee,
          date: new Date(Date.now() - idx * 86400000 * (idx + 1)).toISOString(),
          status: "completed",
        })
      )
    )
    .slice(0, 10);

  const stats = [
    {
      label: "Total Revenue",
      value: `$${totalRevenue.toLocaleString()}`,
      change: "+18.2%",
      trend: "up",
      icon: DollarSign,
    },
    {
      label: "This Month",
      value: `$${thisMonthRevenue.toLocaleString()}`,
      change: `+${revenueGrowth.toFixed(1)}%`,
      trend: "up",
      icon: TrendingUp,
    },
    {
      label: "Pending Payouts",
      value: `$${(totalRevenue * 0.1).toLocaleString()}`,
      change: "3 events",
      trend: "neutral",
      icon: CreditCard,
    },
    {
      label: "Avg per Event",
      value: `$${
        events.length > 0 ? Math.round(totalRevenue / events.length) : 0
      }`,
      change: "+5.3%",
      trend: "up",
      icon: Calendar,
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">
          {isAdmin ? "Platform Revenue" : "My Revenue"}
        </h1>
        <p className="text-muted-foreground">
          Track earnings and payment history
        </p>
      </div>

      {/* Stats */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <GlowCard key={stat.label} className="p-5">
            <div className="flex items-center justify-between">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                <stat.icon className="h-5 w-5 text-primary" />
              </div>
              <Badge
                variant={stat.trend === "up" ? "default" : "secondary"}
                className="text-xs gap-1"
              >
                {stat.trend === "up" && <ArrowUpRight className="h-3 w-3" />}
                {stat.trend === "down" && (
                  <ArrowDownRight className="h-3 w-3" />
                )}
                {stat.change}
              </Badge>
            </div>
            <div className="mt-3">
              <p className="text-2xl font-bold">{stat.value}</p>
              <p className="text-sm text-muted-foreground">{stat.label}</p>
            </div>
          </GlowCard>
        ))}
      </div>

      {/* Revenue Chart Placeholder */}
      <GlowCard>
        <h2 className="font-semibold text-lg mb-4">Revenue Overview</h2>
        <div className="h-64 flex items-center justify-center bg-muted/30 rounded-lg">
          <div className="text-center">
            <TrendingUp className="h-12 w-12 text-muted-foreground/50 mx-auto mb-2" />
            <p className="text-muted-foreground">Revenue chart would go here</p>
            <p className="text-sm text-muted-foreground">
              Integrate with a charting library like Recharts
            </p>
          </div>
        </div>
      </GlowCard>

      {/* Recent Transactions */}
      <GlowCard>
        <h2 className="font-semibold text-lg mb-4">Recent Transactions</h2>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Event</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {transactions.length > 0 ? (
                transactions.map((transaction) => (
                  <TableRow key={transaction.id}>
                    <TableCell className="font-medium">
                      {transaction.eventName}
                    </TableCell>
                    <TableCell>
                      <span className="text-green-500 font-medium">
                        +${transaction.amount}
                      </span>
                    </TableCell>
                    <TableCell className="text-muted-foreground">
                      {new Date(transaction.date).toLocaleDateString()}
                    </TableCell>
                    <TableCell>
                      <Badge variant="secondary" className="capitalize">
                        {transaction.status}
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={4}
                    className="text-center py-8 text-muted-foreground"
                  >
                    No transactions yet
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </GlowCard>
    </div>
  );
}

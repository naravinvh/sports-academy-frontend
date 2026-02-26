import { Card, CardHeader, CardContent } from "@/components/ui/card"

export function RevenueChart() {
  return (
    <Card>
      <CardHeader>
        <h2 className="text-lg font-semibold">
          Revenue vs Expense
        </h2>
      </CardHeader>
      <CardContent className="h-[300px] flex items-center justify-center text-muted-foreground">
        📊 Chart Placeholder
      </CardContent>
    </Card>
  )
}
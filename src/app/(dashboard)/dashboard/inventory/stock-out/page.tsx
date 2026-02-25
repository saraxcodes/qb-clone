import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Plus } from "lucide-react"

export default function StockOutPage() {
  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Stock Out</h2>
        <div className="flex items-center space-x-2">
          <Button>
            <Plus className="mr-2 h-4 w-4" /> Add Stock Out
          </Button>
        </div>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Stock Out Records</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">Manage outgoing stock from your inventory.</p>
          <div className="mt-4 rounded-md border p-8 text-center text-muted-foreground">
            No stock out records found.
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

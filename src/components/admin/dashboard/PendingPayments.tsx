import { Button } from "@/components/ui/button"

export function PendingPaymentItem({
  name,
  course,
  amount,
  onReview,
}: {
  name: string
  course: string
  amount: number
  onReview: () => void
}) {
  return (
    <div className="flex justify-between items-center rounded-lg border bg-white p-4">
      {/* Left */}
      <div className="flex items-start gap-3">
        <span className="mt-2 h-2 w-2 rounded-full bg-red-500" />
        <div>
          <p className="font-medium text-gray-900">{name}</p>
          <p className="text-sm text-gray-500">{course}</p>
        </div>
      </div>

      {/* Right */}
      <div className="flex items-center gap-4">
        <span className="font-semibold text-gray-900">
          <p className="text-sm text-blue-700">
            ฿{Number(amount || 0).toLocaleString()}
          </p>
        </span>

        {/* ✅ ปุ่ม Approved */}
        <Button
          onClick={onReview}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md"
        >
          View
        </Button>
      </div>
    </div>
  )
}
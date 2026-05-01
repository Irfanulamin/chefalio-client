import Link from "next/link";

export default function PaymentSuccessPage() {
  return (
    <div className="min-h-[calc(100vh-200px)] flex items-center justify-center p-8">
      <div className="text-center max-w-md w-full">
        {/* Icon */}
        <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-green-50 border border-green-200 mb-6 animate-[pop_0.5s_cubic-bezier(0.34,1.56,0.64,1)_both]">
          <svg width="36" height="36" viewBox="0 0 24 24" fill="none">
            <polyline
              points="20 6 9 17 4 12"
              stroke="currentColor"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-green-600"
            />
          </svg>
        </div>

        {/* Heading */}
        <p className="text-xs font-medium tracking-widest text-green-600 uppercase mb-2">
          Payment confirmed
        </p>
        <h1 className="text-2xl font-semibold text-foreground mb-3 leading-tight">
          Your cookbook is ready
        </h1>
        <p className="text-sm text-muted-foreground leading-relaxed mb-8">
          Thanks for your purchase. A receipt has been sent to your email —
          enjoy your new cookbook!
        </p>

        {/* Summary card */}
        <div className="bg-muted/5 dark:bg-muted/40 border rounded-xl p-4 mb-7 text-left space-y-2">
          {[
            { label: "Status", value: "Paid", isStatus: true },
            { label: "Receipt", value: "Sent to your email" },
            { label: "Access", value: "Available now" },
          ].map(({ label, value, isStatus }, i, arr) => (
            <div
              key={label}
              className={`flex justify-between items-center py-1.5 ${i < arr.length - 1 ? "border-b" : ""}`}
            >
              <span className="text-xs text-muted-foreground">{label}</span>
              <span
                className={`text-xs font-medium flex items-center gap-1.5 ${isStatus ? "text-green-600" : "text-foreground"}`}
              >
                {isStatus && (
                  <span className="w-1.5 h-1.5 rounded-full bg-green-500 inline-block" />
                )}
                {value}
              </span>
            </div>
          ))}
        </div>

        {/* Actions */}
        <div className="flex flex-col gap-2.5">
          <Link
            href="/cookbooks"
            className="block bg-foreground text-background text-sm font-medium py-3 px-6 rounded-lg text-center hover:opacity-90 transition"
          >
            Browse cookbooks
          </Link>
          <Link
            href="/activity?tab=orders"
            className="block text-sm text-muted-foreground py-2.5 px-6 rounded-lg text-center border hover:bg-muted/30 transition"
          >
            Go to my activity
          </Link>
        </div>
      </div>
    </div>
  );
}

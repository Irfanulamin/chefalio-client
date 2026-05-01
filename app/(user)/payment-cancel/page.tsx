import Link from "next/link";

export default function PaymentCancelPage() {
  return (
    <div className="min-h-[calc(100vh-200px)] flex items-center justify-center p-8">
      <div className="text-center max-w-md w-full">

        {/* Icon */}
        <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-yellow-50 border border-yellow-200 mb-6 animate-[pop_0.5s_cubic-bezier(0.34,1.56,0.64,1)_both]">
          <svg width="36" height="36" viewBox="0 0 24 24" fill="none">
            <line x1="18" y1="6" x2="6" y2="18" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" className="text-yellow-600" />
            <line x1="6" y1="6" x2="18" y2="18" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" className="text-yellow-600" />
          </svg>
        </div>

        {/* Heading */}
        <p className="text-xs font-medium tracking-widest text-yellow-600 uppercase mb-2">
          Payment cancelled
        </p>
        <h1 className="text-2xl font-semibold text-foreground mb-3 leading-tight">
          No charge was made
        </h1>
        <p className="text-sm text-muted-foreground leading-relaxed mb-8">
          You cancelled the checkout — nothing was charged. Your cart is still saved if you&apos;d like to try again.
        </p>

        {/* Summary card */}
        <div className="bg-muted/10 dark:bg-muted/40 border rounded-xl p-4 mb-7 text-left space-y-2">
          {[
            { label: "Status", value: "Cancelled", isStatus: true },
            { label: "Charge", value: "None" },
            { label: "Cart", value: "Still saved" },
          ].map(({ label, value, isStatus }, i, arr) => (
            <div
              key={label}
              className={`flex justify-between items-center py-1.5 ${i < arr.length - 1 ? "border-b" : ""}`}
            >
              <span className="text-xs text-muted-foreground">{label}</span>
              <span className={`text-xs font-medium flex items-center gap-1.5 ${isStatus ? "text-yellow-600" : "text-foreground"}`}>
                {isStatus && <span className="w-1.5 h-1.5 rounded-full bg-yellow-500 inline-block" />}
                {value}
              </span>
            </div>
          ))}
        </div>

        {/* Actions */}
        <div className="flex flex-col gap-2.5">
          <Link href="/cookbooks" className="block bg-foreground text-background text-sm font-medium py-3 px-6 rounded-lg text-center hover:opacity-90 transition">
            Browse cookbooks
          </Link>
        </div>

      </div>
    </div>
  );
}
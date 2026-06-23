export function ReviewEmptyState() {
  return (
    <div className="flex flex-col items-center gap-4 py-8 text-center">
      <p className="text-base font-semibold text-text">Your system is empty</p>
      <p className="max-w-xs text-sm leading-6 text-text-muted">
        Add cameras, sensors, a plan, or extra protection and your personalized
        review will appear here.
      </p>
    </div>
  );
}

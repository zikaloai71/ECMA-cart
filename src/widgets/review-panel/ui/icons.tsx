/**
 * Lightweight placeholder marks for the review panel.
 * Swap these for brand artwork (e.g. the shipping bus / guarantee seal) later.
 */

export function ShippingTruckIcon() {
  return (
    <svg
      width="28"
      height="28"
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path
        d="M3 8H18V21H3V8Z"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinejoin="round"
      />
      <path
        d="M18 12H24L29 16V21H18V12Z"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinejoin="round"
      />
      <circle cx="9" cy="24" r="2.5" stroke="currentColor" strokeWidth="1.75" />
      <circle cx="23" cy="24" r="2.5" stroke="currentColor" strokeWidth="1.75" />
    </svg>
  );
}

export function GuaranteeBadge() {
  return (
    <div
      className="flex h-24 w-24 flex-col items-center justify-center rounded-full bg-primary p-2 text-center text-text-inverse shadow-card"
      role="img"
      aria-label="100% satisfaction guarantee"
    >
      <span className="text-2xl font-bold leading-none">100%</span>
      <span className="mt-1 text-[0.625rem] font-semibold uppercase leading-tight tracking-[0.08em]">
        Satisfaction
        <br />
        guarantee
      </span>
    </div>
  );
}

export function ShieldBrandIcon() {
  return (
    <svg
      width="22"
      height="26"
      viewBox="0 0 28 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path
        d="M14 2L25 6V15C25 22.1 20.4 28.25 14 30C7.6 28.25 3 22.1 3 15V6L14 2Z"
        fill="currentColor"
        fillOpacity="0.12"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinejoin="round"
      />
      <path
        d="M9.5 15.5L13 19L19 11"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function TrashIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path
        d="M3.5 5.5H16.5M8 5.5V4C8 3.4 8.4 3 9 3H11C11.6 3 12 3.4 12 4V5.5M5 5.5L5.7 16C5.7 16.6 6.2 17 6.8 17H13.2C13.8 17 14.3 16.6 14.3 16L15 5.5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

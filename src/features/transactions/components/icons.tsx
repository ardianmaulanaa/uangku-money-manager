import type { SVGProps } from "react";

type IconProps = SVGProps<SVGSVGElement>;

const defaults = {
  width: 20,
  height: 20,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.8,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  "aria-hidden": true,
};

export function WalletIcon(props: IconProps) {
  return <svg {...defaults} {...props}><path d="M4 7.5V6a2 2 0 0 1 2-2h12v3.5"/><rect x="3" y="7.5" width="18" height="13" rx="3"/><path d="M16 13h5v4h-5a2 2 0 0 1 0-4Z"/></svg>;
}

export function PlusIcon(props: IconProps) {
  return <svg {...defaults} {...props}><path d="M12 5v14M5 12h14"/></svg>;
}

export function ArrowUpIcon(props: IconProps) {
  return <svg {...defaults} {...props}><path d="m7 11 5-5 5 5M12 6v12"/></svg>;
}

export function ArrowDownIcon(props: IconProps) {
  return <svg {...defaults} {...props}><path d="m7 13 5 5 5-5M12 18V6"/></svg>;
}

export function TrendIcon(props: IconProps) {
  return <svg {...defaults} {...props}><path d="M4 17 9 12l4 4 7-8"/><path d="M15 8h5v5"/></svg>;
}

export function PencilIcon(props: IconProps) {
  return <svg {...defaults} {...props}><path d="m4 20 4.2-1 10.5-10.5a2.1 2.1 0 0 0-3-3L5.2 16 4 20Z"/><path d="m14.5 7 3 3"/></svg>;
}

export function TrashIcon(props: IconProps) {
  return <svg {...defaults} {...props}><path d="M4 7h16M9 3h6l1 4H8l1-4ZM6.5 7l.8 14h9.4l.8-14M10 11v6M14 11v6"/></svg>;
}

export function CloseIcon(props: IconProps) {
  return <svg {...defaults} {...props}><path d="m6 6 12 12M18 6 6 18"/></svg>;
}

export function ReceiptIcon(props: IconProps) {
  return <svg {...defaults} {...props}><path d="M6 3h12v18l-3-2-3 2-3-2-3 2V3Z"/><path d="M9 8h6M9 12h6"/></svg>;
}

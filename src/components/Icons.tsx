import type { SVGProps } from "react";

type IconProps = SVGProps<SVGSVGElement>;

const baseProps: IconProps = {
  width: 22,
  height: 22,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.8,
  strokeLinecap: "round",
  strokeLinejoin: "round",
  "aria-hidden": true,
};

export function PlusIcon(props: IconProps) {
  return <svg {...baseProps} {...props}><path d="M12 5v14M5 12h14" /></svg>;
}

export function MinusIcon(props: IconProps) {
  return <svg {...baseProps} {...props}><path d="M5 12h14" /></svg>;
}

export function ResetIcon(props: IconProps) {
  return <svg {...baseProps} {...props}><path d="M3 12a9 9 0 1 0 3-6.7L3 8" /><path d="M3 3v5h5" /></svg>;
}

export function CloseIcon(props: IconProps) {
  return <svg {...baseProps} {...props}><path d="m6 6 12 12M18 6 6 18" /></svg>;
}

export function RouteIcon(props: IconProps) {
  return <svg {...baseProps} {...props}><circle cx="6" cy="19" r="2" /><circle cx="18" cy="5" r="2" /><path d="M8 19h3a3 3 0 0 0 3-3V8a3 3 0 0 1 3-3" /></svg>;
}

export function PlayIcon(props: IconProps) {
  return <svg {...baseProps} {...props}><path d="m8 5 11 7-11 7V5Z" /></svg>;
}

export function InfoIcon(props: IconProps) {
  return <svg {...baseProps} {...props}><circle cx="12" cy="12" r="9" /><path d="M12 11v5M12 8h.01" /></svg>;
}

export function MapIcon(props: IconProps) {
  return <svg {...baseProps} {...props}><path d="m3 6 5-3 8 3 5-3v15l-5 3-8-3-5 3V6Z" /><path d="M8 3v15M16 6v15" /></svg>;
}

export function ListIcon(props: IconProps) {
  return <svg {...baseProps} {...props}><path d="M8 6h13M8 12h13M8 18h13" /><path d="M3 6h.01M3 12h.01M3 18h.01" /></svg>;
}

export function SearchIcon(props: IconProps) {
  return <svg {...baseProps} {...props}><circle cx="11" cy="11" r="7" /><path d="m20 20-4-4" /></svg>;
}

export function ShareIcon(props: IconProps) {
  return <svg {...baseProps} {...props}><circle cx="18" cy="5" r="2" /><circle cx="6" cy="12" r="2" /><circle cx="18" cy="19" r="2" /><path d="m8 11 8-5M8 13l8 5" /></svg>;
}

export function ImageIcon(props: IconProps) {
  return <svg {...baseProps} {...props}><rect x="3" y="4" width="18" height="16" rx="2" /><circle cx="9" cy="10" r="2" /><path d="m21 15-5-5L5 20" /></svg>;
}

export function CheckIcon(props: IconProps) {
  return <svg {...baseProps} {...props}><path d="m5 12 4 4L19 6" /></svg>;
}

export function ExternalIcon(props: IconProps) {
  return <svg {...baseProps} {...props}><path d="M14 4h6v6M20 4l-9 9" /><path d="M18 13v5a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h5" /></svg>;
}

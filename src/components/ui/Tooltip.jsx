import { useId, useState } from "react";

function Tooltip({
  children,
  content,
  side = "top",
  delay = 120,
}) {
  const [open, setOpen] = useState(false);
  const id = useId();

  const positions = {
    top: "bottom-full left-1/2 mb-2 -translate-x-1/2",
    bottom: "left-1/2 top-full mt-2 -translate-x-1/2",
    left: "right-full top-1/2 mr-2 -translate-y-1/2",
    right: "left-full top-1/2 ml-2 -translate-y-1/2",
  };

  let timer;

  const show = () => {
    clearTimeout(timer);
    timer = setTimeout(() => setOpen(true), delay);
  };

  const hide = () => {
    clearTimeout(timer);
    setOpen(false);
  };

  return (
    <span
      className="relative inline-flex"
      onMouseEnter={show}
      onMouseLeave={hide}
      onFocus={show}
      onBlur={hide}
    >
      <span aria-describedby={open ? id : undefined}>
        {children}
      </span>

      {content && open && (
        <span
          id={id}
          role="tooltip"
          className={[
            "pointer-events-none absolute z-[100]",
            "w-max max-w-56 rounded-lg",
            "bg-slate-950 px-2.5 py-1.5",
            "text-[10px] font-medium text-white",
            "shadow-lg shadow-slate-950/10",
            "animate-fade-up",
            positions[side] ?? positions.top,
          ].join(" ")}
        >
          {content}
        </span>
      )}
    </span>
  );
}

export default Tooltip;
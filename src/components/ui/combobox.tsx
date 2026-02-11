// "use client"

// import * as React from "react"

// export const Combobox = ({ children, ...props }: any) => <div {...props}>{children}</div>

// export const ComboboxChips = React.forwardRef<any, any>((props, ref) => (
//   <div ref={ref} className="flex flex-wrap gap-1 border rounded p-1" {...props} />
// ))

// export const ComboboxChip = ({ children, onRemove }: any) => (
//   <div className="flex items-center gap-1 bg-gray-200 px-2 py-1 rounded-full text-sm">
//     {children}
//     {onRemove && (
//       <button
//         type="button"
//         onClick={onRemove}
//         className="ml-1 text-gray-500 hover:text-gray-700"
//       >
//         ×
//       </button>
//     )}
//   </div>
// )

// export const ComboboxChipsInput = React.forwardRef<HTMLInputElement, any>((props, ref) => (
//   <input
//     ref={ref}
//     {...props}
//     className="flex-1 border-none outline-none focus:ring-0 text-sm"
//   />
// ))

// export const ComboboxContent = ({ children, anchor }: any) => (
//   <div className="absolute bg-white border rounded shadow mt-1 z-50 w-full max-w-xs">{children}</div>
// )

// export const ComboboxList = ({ children }: any) => <ul>{children}</ul>

// export const ComboboxItem = ({ children, value, onSelect }: any) => (
//   <li
//     className="px-2 py-1 hover:bg-gray-100 cursor-pointer text-sm"
//     onClick={() => onSelect(value)}
//   >
//     {children}
//   </li>
// )

// export const ComboboxEmpty = ({ children }: any) => (
//   <div className="px-2 py-1 text-gray-400 text-sm">{children}</div>
// )

// export const ComboboxValue = ({ children, values }: any) => <>{children(values)}</>

// export const useComboboxAnchor = () => React.useRef(null)


"use client"

import * as React from "react"

export const Combobox = ({ children, ...props }: any) => <div {...props}>{children}</div>

export const ComboboxChips = React.forwardRef<any, any>((props, ref) => (
  <div
    ref={ref}
    className="flex flex-wrap gap-1 border rounded p-1 cursor-text"
    {...props}
  />
))

export const ComboboxChip = ({ children, onRemove }: any) => (
  <div className="flex items-center gap-1 bg-gray-200 px-2 py-1 rounded-full text-sm">
    {children}
    {onRemove && (
      <button
        type="button"
        onClick={onRemove}
        className="ml-1 text-gray-500 hover:text-gray-700"
      >
        ×
      </button>
    )}
  </div>
)

export const ComboboxChipsInput = React.forwardRef<HTMLInputElement, any>((props, ref) => (
  <input
    ref={ref}
    {...props}
    className="flex-1 border-none outline-none focus:ring-0 text-sm"
  />
))

export const ComboboxContent = ({ children, anchor }: any) => {
  const rect = anchor.current?.getBoundingClientRect()
  return (
    <div
      className="absolute bg-white border rounded shadow mt-1 z-50 max-h-60 overflow-auto"
      style={{
        width: rect?.width || "auto",
        top: rect ? rect.bottom + window.scrollY : undefined,
        left: rect ? rect.left + window.scrollX : undefined,
      }}
    >
      {children}
    </div>
  )
}

export const ComboboxList = ({ children }: any) => <ul>{children}</ul>

export const ComboboxItem = ({ children, value, onSelect, selected }: any) => (
  <li
    className="px-2 py-1 hover:bg-gray-100 cursor-pointer text-sm flex justify-between items-center"
    onClick={() => onSelect(value)}
  >
    {children}
    {selected && <span className="text-blue-500 font-bold">✓</span>}
  </li>
)

export const ComboboxEmpty = ({ children }: any) => (
  <div className="px-2 py-1 text-gray-400 text-sm">{children}</div>
)

export const ComboboxValue = ({ children, values }: any) => <>{children(values)}</>

export const useComboboxAnchor = () => React.useRef(null)

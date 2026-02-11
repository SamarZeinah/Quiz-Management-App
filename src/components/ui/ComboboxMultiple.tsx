"use client"

import * as React from "react"

export const Combobox = ({ children, ...props }: any) => (
  <div {...props} className="relative inline-block w-full">{children}</div>
)

export const ComboboxChips = React.forwardRef<any, any>((props, ref) => (
  <div
    ref={ref}
    className="flex flex-wrap gap-1 border rounded p-1 min-h-[38px] items-center cursor-text"
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
    className="flex-1 border-none outline-none focus:ring-0 text-sm min-w-[60px]"
  />
))

export const ComboboxContent = ({ children, width }: any) => (
  <div
    className="absolute bg-white border rounded shadow mt-1 z-50 max-h-60 overflow-auto"
    style={{ width }}
  >
    {children}
  </div>
)

export const ComboboxList = ({ children }: any) => <ul>{children}</ul>

export const ComboboxItem = ({ children, value, onSelect, selected }: any) => (
  <li
    className={`px-2 py-1 cursor-pointer flex items-center justify-between text-sm hover:bg-gray-100 ${
      selected ? "bg-gray-100 font-medium" : ""
    }`}
    onClick={() => onSelect(value)}
  >
    <span>{children}</span>
    {selected && <span className="text-blue-500">✓</span>}
  </li>
)

export const ComboboxEmpty = ({ children }: any) => (
  <div className="px-2 py-1 text-gray-400 text-sm">{children}</div>
)

export const ComboboxValue = ({ children, values }: any) => <>{children(values)}</>

export function ComboboxMultiple({
  items,
  defaultValues = [],
  onValueChange,
}: {
  items: { _id: string; first_name: string; last_name: string }[]
  defaultValues?: { _id: string; first_name: string; last_name: string }[]
  onValueChange?: (values: any[]) => void
}) {
  const wrapperRef = React.useRef<HTMLDivElement | null>(null)
  const [selectedItems, setSelectedItems] = React.useState(defaultValues)
  const [inputValue, setInputValue] = React.useState("")
  const [open, setOpen] = React.useState(false)
  const [dropdownWidth, setDropdownWidth] = React.useState<number>(0)

  const handleSelect = (item: any) => {
    const exists = selectedItems.find((s) => s._id === item._id)
    const newSelected = exists
      ? selectedItems.filter((s) => s._id !== item._id)
      : [...selectedItems, item]
    setSelectedItems(newSelected)
    onValueChange?.(newSelected)
    setOpen(false) // اختيار عنصر يغلق الـ dropdown
  }

  const handleRemove = (item: any) => {
    const newSelected = selectedItems.filter((s) => s._id !== item._id)
    setSelectedItems(newSelected)
    onValueChange?.(newSelected)
  }

  // إغلاق عند الضغط خارج الـ combobox
  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
        setOpen(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  // تحديث عرض الـ dropdown عند mount أو تغيير حجم wrapper
  React.useEffect(() => {
    if (wrapperRef.current) {
      setDropdownWidth(wrapperRef.current.offsetWidth)
    }
  }, [wrapperRef.current, open])

  return (
    <div ref={wrapperRef} className="relative w-full">
      <Combobox>
        <ComboboxChips 
        // onClick={() => setOpen(!open)}
        >
          <ComboboxValue values={selectedItems}>
            {(values: any[]) => (
              <>
                {values.map((value) => (
                  <ComboboxChip key={value._id} onRemove={() => handleRemove(value)}>
                    {value.first_name} {value.last_name}
                  </ComboboxChip>
                ))}
                <ComboboxChipsInput
                  value={inputValue}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setInputValue(e.target.value)}
                  onFocus={() => setOpen(true)}
                  placeholder="Select..."
                />
              </>
            )}
          </ComboboxValue>
        </ComboboxChips>

        {open && (
          <ComboboxContent width={dropdownWidth}>
            {items.length === 0 && <ComboboxEmpty>No items found.</ComboboxEmpty>}
            <ComboboxList>
              {items
                .filter((item) =>
                  `${item.first_name} ${item.last_name}`.toLowerCase().includes(inputValue.toLowerCase())
                )
                .map((item) => (
                  <ComboboxItem
                    key={item._id}
                    value={item}
                    onSelect={handleSelect}
                    selected={selectedItems.some((s) => s._id === item._id)}
                  >
                    {item.first_name} {item.last_name}
                  </ComboboxItem>
                ))}
            </ComboboxList>
          </ComboboxContent>
        )}
      </Combobox>
    </div>
  )
}

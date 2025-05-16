'use client'

import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
import { ChevronDown } from 'lucide-react'
import { useState } from 'react'

interface DropDownProps {
  options: string[]                          
  selected?: string         
  init?: string 
  placeholder?: string 
  onSelectionChange?: (value: string) => void
  fullWidth?: boolean                     
  textColor?: string                         
  footer?: React.ReactNode
}

export default function DropDown({
  options,
  selected,
  init = '',
  placeholder,
  onSelectionChange,
  fullWidth = false,
  textColor,
  footer,
}: DropDownProps) {
  const [internalSelection, setInternalSelection] = useState(init)
  const isControlled = selected !== undefined
  const displayValue = isControlled ? selected : internalSelection

  const handleSelection = (option: string) => {
    if (!isControlled) {
      setInternalSelection(option)
    }
    onSelectionChange?.(option)
  }

  const containerClass = fullWidth ? "w-full" : "w-fit"
  const triggerWidth = fullWidth ? "w-full" : ""

  return (
    <Menu as="div" className={`relative inline-block text-left ${containerClass}`}>
      <div>
        <MenuButton
          style={{ color: textColor }}
          className={`inline-flex ${triggerWidth} justify-between items-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-xs font-semibold text-gray-900 shadow-xs ring-1 ring-gray-300 ring-inset hover:bg-gray-50`}
        >
          {displayValue || (
            placeholder ? (
              <span className='text-gray-400 font-medium'>{placeholder}</span>
            ) : (
              "Select"
            )
          )}
          <ChevronDown className="-mr-1 size-5 text-gray-400" aria-hidden="true" />
        </MenuButton>
      </div>

      <MenuItems
        className={`absolute right-0 z-10 mt-2 ${triggerWidth} origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black/5 focus:outline-none`}
      >
        <div className="text-xs">
          {options.map((option) => (
            <MenuItem key={option}>
              {({ active }) => (
                <button
                  onClick={() => handleSelection(option)}
                  className={`px-4 py-2 w-full text-left ${
                    active ? 'bg-gray-100 text-gray-900' : 'text-gray-700'
                  }`}
                >
                  {option}
                </button>
              )}
            </MenuItem>
          ))}

          {footer && <MenuItem>{footer}</MenuItem>}
        </div>
      </MenuItems>
    </Menu>
  )
}

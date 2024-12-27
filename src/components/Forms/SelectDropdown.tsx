import React, { Fragment } from 'react';
import { Listbox, Transition } from '@headlessui/react';
import DownArrow from "../../assets/down-arrow.svg"

interface SelectOption {
  value: string | number; // The value of the option
  label: string; // The display label for the option
}

interface SelectProps {
  options: SelectOption[]; // List of options
  selected: SelectOption; // Currently selected option
  onChange: (value: SelectOption) => void; // Change handler
  width?: string; // Custom width (e.g., "w-full" or "w-1/2")
  height?: string; // Custom height (e.g., "h-12")
  buttonColor?: string; // Custom button background color
  textColor?: string; // Custom text color
  optionColor?: string; // Custom option color
  optionHoverColor?: string; // Custom option hover color
  className?: string; // Additional custom classes
}

const Select: React.FC<SelectProps> = ({
  options,
  selected,
  onChange,
  width = 'w-full', // Default width
  height = 'h-12', // Default height
  buttonColor = 'bg-white', // Default button color
  textColor = 'text-gray-900', // Default text color
  optionColor = 'text-gray-900', // Default option text color
  optionHoverColor = 'bg-blue-500', // Default option hover color
  className = '', // Additional custom class
}) => {
  return (
    <Listbox value={selected} onChange={onChange}>
      <div className="relative">
        {/* Button for displaying the selected value */}
        <Listbox.Button
          className={`relative ${width} ${height} cursor-default rounded-lg border ${buttonColor} py-2 pl-3 pr-10 text-left shadow-sm focus:outline-none focus:ring-0 focus:ring-blue-500 focus:border-blue-500 sm:text-sm ${className}`}
        >
          <span className={`block truncate ${textColor}`}>{selected.label}</span>
          <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
            {/* Icon or dropdown indicator can go here */}
            <img className='w-2.5 group-data-[open]:rotate-180' src={DownArrow} alt="" />
          </span>
        </Listbox.Button>

        {/* Options dropdown */}
        <Transition
          as={Fragment}
          leave="transition ease-in duration-100"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <Listbox.Options
            className="absolute z-10 mt-1 w-full max-h-60 overflow-auto rounded-lg bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm"
          >
            {options.map((option) => (
              <Listbox.Option
                key={option.value}
                className={({ active }) =>
                  `relative cursor-default select-none p-2 pr-4 ${
                    active ? optionHoverColor : optionColor
                  }`
                }
                value={option}
              >
                {({ selected }) => (
                  <>
                    <span
                      className={`block truncate ${
                        selected ? 'font-medium' : 'font-normal'
                      }`}
                    >
                      {option.label}
                    </span>
                    {selected ? (
                      <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-blue-500">
                        {/* Checkmark icon can go here */}
                      </span>
                    ) : null}
                  </>
                )}
              </Listbox.Option>
            ))}
          </Listbox.Options>
        </Transition>
      </div>
    </Listbox>
  );
};

export default Select;
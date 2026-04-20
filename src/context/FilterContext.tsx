import { createContext, useContext, useState } from 'react'

interface FilterContextValue {
  selectedMonth: string | null
  setSelectedMonth: (month: string | null) => void
}
const FilterContext = createContext<FilterContextValue | null>(null)

export function FilterProvider({ children }: { children: React.ReactNode }) {
  const [selectedMonth, setSelectedMonth] = useState<string | null>(null)

  return (
    <FilterContext.Provider value={{ selectedMonth, setSelectedMonth }}>
      {children}
    </FilterContext.Provider>
  )
}

export function useFilter(): FilterContextValue {
  const context = useContext(FilterContext)

  if (context === null) {
    throw new Error('useFilter must be userd inside a FilterProvider')
  }

  return context
}

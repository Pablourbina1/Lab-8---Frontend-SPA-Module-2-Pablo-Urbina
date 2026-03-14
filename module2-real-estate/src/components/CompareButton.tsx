import { Property } from "@/types/property"

const compareKey = "compareProperties"

interface CompareButtonProps {
  property: Property
}

export function CompareButton({ property }: CompareButtonProps) {

  const getCompareList = (): string[] => {
    const stored = localStorage.getItem(compareKey)
    return stored ? JSON.parse(stored) : []
  }

  const saveCompareList = (list: string[]) => {
    localStorage.setItem(compareKey, JSON.stringify(list))
  }

  const handleCompare = () => {

    const list = getCompareList()

    const exists = list.includes(property.id)

    if (exists) {
      const newList = list.filter(id => id !== property.id)
      saveCompareList(newList)
      return
    }

    if (list.length >= 3) {
      alert("Solo puedes comparar hasta 3 propiedades")
      return
    }

    list.push(property.id)
    saveCompareList(list)

  }

  return (
    <button onClick={handleCompare}>
      Compare
    </button>
  )
}

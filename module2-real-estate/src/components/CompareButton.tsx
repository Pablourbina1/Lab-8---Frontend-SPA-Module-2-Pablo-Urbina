import { Property } from "@/types/property"
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react"
import { toast } from "sonner"

const compareKey = "compareProperties"

interface CompareButtonProps {
  property: Property
}

export function CompareButton({ property }: CompareButtonProps) {
  const [isSelected, setIsSelected] = useState(false)
  useEffect(() => {
    const list = getCompareList()
    setIsSelected(list.includes(property.id))
  }, [property.id])


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
      setIsSelected(false)
      return
    }

    if (list.length >= 3) {
      toast.error("Solo puedes comparar hasta 3 propiedades")
      return
    }

    list.push(property.id)
    saveCompareList(list)
    setIsSelected(true)

  }

  return (
    <Button
      variant={isSelected ? "secondary" : "outline"}
      size="sm"
      onClick={handleCompare}
    >
      {isSelected ? "Agregado a la comparacion" : "Comparar"}
    </Button>
  )


}

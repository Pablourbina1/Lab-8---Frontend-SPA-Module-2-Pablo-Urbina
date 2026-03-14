import { useEffect, useState } from 'react'
import type { Property } from '@/types/property'
import { getPropertyById } from '@/lib/storage'

const compareKey = "compareProperties"

export function ComparePage() {
    const [properties, setProperties] = useState<Property[]>([])
    useEffect(() => {
        const stored = localStorage.getItem(compareKey)

        if (!stored) return

        const ids: string [] = JSON.parse(stored)

        const loaded = ids
        .map(id => getPropertyById(id))
        .filter((p): p is Property => p !== undefined)
        setProperties(loaded)
    }, [])

    if (properties.length === 0){
        return (
            <div>
            <h1>Comparar Propiedades</h1>
            <p>No hay propiedades seleccionadas para comparar</p>
            </div>
        )
    }

    const removeProperty = (id: string) => {
        const stored = localStorage.getItem(compareKey)

        if (!stored) return
        const ids: string [] = JSON.parse(stored)

        const loaded = ids.filter (p => p !== id)
        localStorage.setItem(compareKey, JSON.stringify(loaded))
        setProperties(prev => prev.filter(p => p.id !== id))
    }

    const prices = properties.map(p => p.price)
    const areas = properties.map(p => p.area)

    const lowestPrice = Math.min(...prices)
    const largestArea = Math.max(...areas)
    return (
        <div>
            <h1>Comparar Propiedades</h1>

            <table className="w-full border rounded-lg overflow-hidden">

            <thead className="bg-muted">
            <tr>
                <th className="p-3 text-left">Metric</th>

                {properties.map(p => (
                <th key={p.id} className="p-3 text-left">
                    {p.title}   

                    <button
                    className="ml-2 text-red-500"
                    onClick={() => removeProperty(p.id)}
                    >
                    Remove
                    </button>
                </th>
                ))}
            </tr>
            </thead>


           <tbody>

<tr className="border-t">
  <td className="p-3 font-medium">Price</td>

  {properties.map(p => (
    <td
      key={p.id}
      className={`p-3 ${p.price === lowestPrice ? "font-bold text-green-600" : ""}`}
    >
      ${p.price}
    </td>
  ))}
</tr>

<tr className="border-t">
  <td className="p-3 font-medium">Bedrooms</td>

  {properties.map(p => (
    <td key={p.id} className="p-3">
      {p.bedrooms}
    </td>
  ))}
</tr>

<tr className="border-t">
  <td className="p-3 font-medium">Bathrooms</td>

  {properties.map(p => (
    <td key={p.id} className="p-3">
      {p.bathrooms}
    </td>
  ))}
</tr>

<tr className="border-t">
  <td className="p-3 font-medium">Area</td>

  {properties.map(p => (
    <td
      key={p.id}
      className={`p-3 ${p.area === largestArea ? "font-bold text-blue-600" : ""}`}
    >
      {p.area}
    </td>
  ))}
</tr>

<tr className="border-t">
  <td className="p-3 font-medium">Price / sqm</td>

  {properties.map(p => (
    <td key={p.id} className="p-3">
      {(p.price / p.area).toFixed(2)}
    </td>
  ))}
</tr>

</tbody>

            </table>

        </div>
        )

}
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

            <table>
            <thead>
                <tr>
                <th>Metric</th>
                {properties.map(p => (
                    <th key={p.id}>
                    {p.title}
                    <button onClick={() => removeProperty(p.id)}>
                    Remove
                    </button>
                </th>

                ))}
                </tr>
            </thead>

            <tbody>

                {/* Price */}
                <tr>
                <td>Price</td>
                {properties.map(p => (
                    <td
                    key={p.id}
                    style={{
                        fontWeight: p.price === lowestPrice ? "bold" : "normal"
                    }}
                    >
                    {p.price}
                    </td>
                ))}
                </tr>

                {/* Bedrooms */}
                <tr>
                <td>Bedrooms</td>
                {properties.map(p => (
                    <td key={p.id}>{p.bedrooms}</td>
                ))}
                </tr>

                {/* Bathrooms */}
                <tr>
                <td>Bathrooms</td>
                {properties.map(p => (
                    <td key={p.id}>{p.bathrooms}</td>
                ))}
                </tr>

                {/* Area */}
                <tr>
                <td>Area</td>
                {properties.map(p => (
                    <td
                    key={p.id}
                    style={{
                        fontWeight: p.area === largestArea ? "bold" : "normal"
                    }}
                    >
                    {p.area}
                    </td>
                ))}
                </tr>

                {/* Price per sqm */}
                <tr>
                <td>Price / sqm</td>
                {properties.map(p => (
                    <td key={p.id}>
                    {(p.price / p.area).toFixed(2)}
                    </td>
                ))}
                </tr>

            </tbody>
            </table>

        </div>
        )

}
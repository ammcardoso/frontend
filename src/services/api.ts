import type { Vehicle, VehicleFormData } from "../interfaces/Vehicle"

const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001'

async function handle<T>(resp: Response): Promise<T> {
    if (!resp.ok) {
        const msg = await resp.text().catch(() => '')
        throw new Error(`HTTP ${resp.status} - ${msg || resp.statusText}`)
    }
    return resp.json() as Promise<T>
}

// Busca todos os veículos da API
export async function fetchVehicles(): Promise<Vehicle[]> {
    const resp = await fetch(`${BASE_URL}/api/vehicles`)
    return handle<Vehicle[]>(resp)
}

// Busca um veículo por ID
export async function fetchVehicleById(id: number): Promise<Vehicle> {
    const resp = await fetch(`${BASE_URL}/api/vehicles/${id}`)
    return handle<Vehicle>(resp)
}

// Envia um novo veículo para a API
export async function createVehicle(data: VehicleFormData): Promise<Vehicle> {
    const resp = await fetch(`${BASE_URL}/api/vehicles`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    return handle<Vehicle>(resp)
}
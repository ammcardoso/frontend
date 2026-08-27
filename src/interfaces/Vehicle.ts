export interface Vehicle {
  id: number;
  plate: string;
  type: 'car' | 'truck' | 'bus' | 'motorcycle';
  detectionTime: string; 
  confidence: number;
  imageUrl: string;
}

export type VehicleFormData = Omit<Vehicle, 'id'>;
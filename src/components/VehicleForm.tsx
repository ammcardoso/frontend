import React, { useState } from 'react';
import type { VehicleFormData } from '../interfaces/Vehicle';

interface VehicleFormProps {
  onAddVehicle: (vehicle: VehicleFormData) => void;
}

function VehicleForm({ onAddVehicle }: VehicleFormProps) {
  const [plate, setPlate] = useState<string>('');
  const [type, setType] = useState<string>('car'); 
  const [confidence, setConfidence] = useState<string>('');
  const [imageUrl, setImageUrl] = useState<string>(''); 

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!plate || !confidence || !imageUrl) {
      alert("Por favor, preencha todos os campos, incluindo a imagem.");
      return;
    }

    // Remove traços e espaços para garantir 7 caracteres exigidos pela API
    const cleanPlate = plate.replace(/[^a-zA-Z0-9]/g, '').toUpperCase();
    
    if (cleanPlate.length !== 7) {
      alert("A placa deve conter exatamente 7 caracteres (ex: ABC1234).");
      return;
    }

    // O Zod backend espera um formato de Data
    const detectionTime = new Date().toISOString();

    const newVehicleData: VehicleFormData = {
      plate: cleanPlate,
      type: type as 'car' | 'truck' | 'bus' | 'motorcycle',
      detectionTime,
      confidence: parseFloat(confidence) || 0,
      imageUrl, 
    };

    onAddVehicle(newVehicleData);

    // Limpa os campos
    setPlate('');
    setType('car');
    setConfidence('');
    setImageUrl('');
  };

  return (
    <div className="card shadow-sm p-4 border-0 mb-4 bg-white">
      <h5 className="mb-4 d-flex align-items-center gap-2 text-primary fw-bold">
         Inserção Manual
      </h5>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label small fw-bold text-muted">Placa do Veículo</label>
          <input 
            type="text" 
            className="form-control bg-light" 
            value={plate} 
            onChange={(e) => setPlate(e.target.value)} 
            placeholder="Ex: ABC-1234" 
            required 
            maxLength={8}
          />
        </div>
        
        <div className="mb-3">
          <label className="form-label small fw-bold text-muted">Classificação</label>
          <select 
            className="form-select bg-light" 
            value={type} 
            onChange={(e) => setType(e.target.value)} 
            required
          >
            <option value="car">Carro</option>
            <option value="motorcycle">Moto</option>
            <option value="truck">Caminhão</option>
            <option value="bus">Ônibus</option>
          </select>
        </div>
        
        <div className="mb-3">
          <label className="form-label small fw-bold text-muted">Confiança da IA (%)</label>
          <input 
            type="number" 
            step="0.1" 
            className="form-control bg-light" 
            value={confidence} 
            onChange={(e) => setConfidence(e.target.value)} 
            min="0" 
            max="100" 
            placeholder="Ex: 95.5"
            required 
          />
        </div>

        <div className="mb-4">
          <label className="form-label small fw-bold text-muted">URL da Imagem do Veículo</label>
          <input 
            type="text" 
            className="form-control bg-light" 
            value={imageUrl} 
            onChange={(e) => setImageUrl(e.target.value)} 
            placeholder="Ex: /assets/car.png" 
            required 
          />
        </div>
        
        <button type="submit" className="btn btn-primary w-100 fw-bold">
            Registrar Passagem
        </button>
      </form>
    </div>
  );
}

export default VehicleForm;
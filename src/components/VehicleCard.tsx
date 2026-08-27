import type { Vehicle } from "../interfaces/Vehicle";

interface VehicleCardProps {
  vehicle: Vehicle;
}

function VehicleCard({ vehicle }: VehicleCardProps) {
  const getBadgeConfig = (type: string) => {
    switch(type) {
      case 'car': return { color: 'bg-primary', label: 'Carro' };
      case 'truck': return { color: 'bg-danger', label: 'Caminhão' };
      case 'motorcycle': return { color: 'bg-success', label: 'Moto' };
      case 'bus': return { color: 'bg-warning text-dark', label: 'Ônibus' };
      default: return { color: 'bg-secondary', label: type };
    }
  };

  const badgeConfig = getBadgeConfig(vehicle.type);
  
  const formattedTime = new Date(vehicle.detectionTime).toLocaleTimeString('pt-BR', {
    hour: '2-digit', 
    minute: '2-digit'
  });

  return (
    <div className="col-md-6 mb-4">
      <div className="card h-100 border-0 shadow-sm bg-white overflow-hidden">
        <img
          src={vehicle.imageUrl}
          className="card-img-top"
          alt={`Detecção ${vehicle.plate}`}
          style={{ height: '180px', objectFit: 'cover' }}
        />
        
        <div className="card-body d-flex flex-column p-3">
          <div className="d-flex justify-content-between align-items-center mb-3">
            <span className={`badge ${badgeConfig.color}`}>
              {badgeConfig.label}
            </span>
            <small className="text-muted fw-bold">
              <i className="bi bi-clock me-1"></i>{formattedTime}
            </small>
          </div>
          
          <h4 className="fw-bold text-center mb-3 border bg-light py-2 rounded font-monospace text-dark">
            {vehicle.plate}
          </h4>
          
          <div className="d-flex justify-content-between align-items-center mt-auto border-top pt-2">
            <small className="text-muted">Acurácia IA:</small>
            <span className={`fw-bold ${vehicle.confidence >= 90 ? 'text-success' : 'text-warning'}`}>
              {vehicle.confidence}%
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default VehicleCard;
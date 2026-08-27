import { useState, useEffect } from 'react';
import VehicleForm from './components/VehicleForm';
import VehicleCard from './components/VehicleCard';
import type { Vehicle, VehicleFormData } from './interfaces/Vehicle';
import { createVehicle, fetchVehicles } from './services/api';


function App() {
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [searchTerm, setSearchTerm] = useState<string>('');

  // Busca os dados da API ao montar o componente
  useEffect(() => {
    const loadVehicles = async () => {
      try {
        const data = await fetchVehicles();
        setVehicles(data.reverse()); 
      } catch (error) {
        console.error("Erro ao buscar veículos da API:", error);
      } finally {
        setIsLoading(false);
      }
    };
    
    loadVehicles();
  }, []);

  useEffect(() => {
    if (searchTerm) {
      document.title = `Buscando: ${searchTerm}`;
    } else {
      document.title = `Monitoramento de Tráfego`;
    }
  }, [searchTerm]);

  // Função agora é assíncrona e envia para a API
  const handleAddVehicle = async (newVehicleData: VehicleFormData) => {
    try {
      const savedVehicle = await createVehicle(newVehicleData);
      setVehicles(prevVehicles => [savedVehicle, ...prevVehicles]);
    } catch (error) {
      console.error("Erro ao salvar veículo:", error);
      alert("Houve um erro ao registrar o veículo. Verifique os dados.");
    }
  };

  const filteredVehicles = vehicles.filter(vehicle =>
    vehicle.plate.toLowerCase().includes(searchTerm.toLowerCase()) ||
    vehicle.type.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (isLoading) {
    return (
      <div className="d-flex flex-column justify-content-center align-items-center min-vh-100 bg-light">
        <div className="spinner-border text-primary mb-3" role="status"></div>
        <h4 className="text-muted">Iniciando Monitoramento de Tráfego de veículos...</h4>
      </div>
    );
  }

  return (
    <div className="bg-light min-vh-100">
      <nav className="navbar navbar-dark bg-dark shadow-sm mb-4 py-3">
        <div className="container">
          <span className="navbar-brand fw-bold">
            Sistema de Monitoramento de Tráfego de Veículos
          </span>
        </div>
      </nav>

      <div className="container flex-fill mb-5">
        <div className="row">
          <div className="col-lg-4 mb-4">
            <VehicleForm onAddVehicle={handleAddVehicle} />
          </div>

          <div className="col-lg-8">
            <section className="mb-4 p-3 card border-0 shadow-sm bg-white">
              <h5 className="mb-3 text-secondary fw-bold">Buscar Veículos</h5>
              <div className="input-group">
                <input
                  type="text"
                  className="form-control bg-light border-0"
                  placeholder="Digite a placa ou o tipo (ex: Carro, Moto)..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <span className="input-group-text border-0 bg-primary text-white">
                  <i className="bi bi-search"></i>
                </span>
              </div>
            </section>

            <h4 className="fw-bold text-dark mb-4 border-bottom pb-2">
              Passagens de veículos ({filteredVehicles.length})
            </h4>
            
            <div className="row">
              {filteredVehicles.length === 0 ? (
                <div className="alert alert-warning text-center border-0 shadow-sm w-100 mx-3">
                  {searchTerm 
                    ? "Nenhum veículo encontrado com esse termo." 
                    : "Nenhum veículo registrado no momento."}
                </div>
              ) : (
                filteredVehicles.map(vehicle => (
                  <VehicleCard key={vehicle.id} vehicle={vehicle} />
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
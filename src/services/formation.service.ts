import api from './api';
import type { Formation, FormationFormData } from '../types/formation.types';

class FormationService {
  // Récupérer toutes les formations
  async getAllFormations(): Promise<Formation[]> {
    const response = await api.get('/v1/formations');
    return response.data;
  }

  // Récupérer une formation par ID
  async getFormationById(id: number): Promise<Formation> {
    const response = await api.get(`/v1/formations/${id}`);
    return response.data;
  }

  // Créer une formation avec image
  async createFormation(formationData: FormationFormData, imageFile: File | null): Promise<Formation> {
    const formData = new FormData();
    
    // Ajouter les données de la formation
    const formationBlob = new Blob([JSON.stringify(formationData)], { type: 'application/json' });
    formData.append('formation', formationBlob);
    
    // Ajouter l'image si elle existe
    if (imageFile) {
      formData.append('imageFile', imageFile);
    }
    
    const response = await api.post('/v1/formations', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  }

  // Modifier une formation
  async updateFormation(id: number, formationData: FormationFormData, imageFile: File | null): Promise<Formation> {
    const formData = new FormData();
    
    const formationBlob = new Blob([JSON.stringify(formationData)], { type: 'application/json' });
    formData.append('formation', formationBlob);
    
    if (imageFile) {
      formData.append('imageFile', imageFile);
    }
    
    const response = await api.put(`/v1/formations/${id}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  }

  // Supprimer une formation
  async deleteFormation(id: number): Promise<void> {
    await api.delete(`/v1/formations/${id}`);
  }
}

export default new FormationService();
import { useState, useEffect } from 'react';
import { Plus, Pencil, Trash2, X, Upload } from 'lucide-react';
import formationService from '../../services/formation.service';
import type { Formation, FormationFormData } from '../../types/formation.types';

export default function AdminFormations() {
  const [formations, setFormations] = useState<Formation[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingFormation, setEditingFormation] = useState<Formation | null>(null);
  const [formData, setFormData] = useState<FormationFormData>({
    titre: '',
    description: '',
    prix: 0,
    categorie: '',
    duree: '',
    langue: 'Français',
  });
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Charger les formations
  useEffect(() => {
    loadFormations();
  }, []);

  const loadFormations = async () => {
    try {
      setIsLoading(true);
      const data = await formationService.getAllFormations();
      setFormations(data);
    } catch (err) {
      console.error('Erreur lors du chargement des formations:', err);
      setError('Impossible de charger les formations');
    } finally {
      setIsLoading(false);
    }
  };

  // Ouvrir le modal pour ajouter
  const handleAdd = () => {
    setEditingFormation(null);
    setFormData({
      titre: '',
      description: '',
      prix: 0,
      categorie: '',
      duree: '',
      langue: 'Français',
    });
    setImageFile(null);
    setImagePreview(null);
    setIsModalOpen(true);
  };

  // Ouvrir le modal pour modifier
  const handleEdit = (formation: Formation) => {
    setEditingFormation(formation);
    setFormData({
      titre: formation.titre,
      description: formation.description,
      prix: formation.prix,
      categorie: formation.categorie,
      duree: formation.duree,
      langue: formation.langue,
    });
    setImagePreview(formation.image ? `http://localhost:5001${formation.image}` : null);
    setImageFile(null);
    setIsModalOpen(true);
  };

  // Supprimer une formation
  const handleDelete = async (id: number) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer cette formation ?')) {
      try {
        await formationService.deleteFormation(id);
        await loadFormations();
      } catch (err) {
        console.error('Erreur lors de la suppression:', err);
        setError('Impossible de supprimer la formation');
      }
    }
  };

  // Soumettre le formulaire
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    
    try {
      if (editingFormation) {
        await formationService.updateFormation(editingFormation.id, formData, imageFile);
      } else {
        await formationService.createFormation(formData, imageFile);
      }
      setIsModalOpen(false);
      await loadFormations();
    } catch (err) {
      console.error('Erreur lors de l\'enregistrement:', err);
      setError('Impossible d\'enregistrer la formation');
    }
  };

  // Gérer le changement d'image
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const categories = ['Informatique', 'Business', 'Design', 'Marketing', 'Langues', 'Développement personnel'];
  const langues = ['Français', 'Anglais', 'Espagnol', 'Arabe'];

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* En-tête */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Gestion des formations</h1>
          <p className="text-gray-600 mt-1">Créez, modifiez et gérez toutes les formations</p>
        </div>
        <button
          onClick={handleAdd}
          className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition flex items-center space-x-2"
        >
          <Plus className="w-5 h-5" />
          <span>Nouvelle formation</span>
        </button>
      </div>

      {/* Message d'erreur */}
      {error && (
        <div className="bg-red-50 border border-red-400 text-red-700 px-4 py-3 rounded-lg">
          {error}
        </div>
      )}

      {/* Liste des formations */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {formations.map((formation) => (
          <div key={formation.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition">
            {/* Image */}
            <div className="h-48 bg-gray-200 overflow-hidden">
              {formation.image ? (
                <img
                  src={`http://localhost:5001${formation.image}`}
                  alt={formation.titre}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-gray-400">
                  Pas d'image
                </div>
              )}
            </div>
            
            {/* Contenu */}
            <div className="p-4">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-lg font-semibold text-gray-800">{formation.titre}</h3>
                  <p className="text-sm text-gray-500 mt-1">
                    {formation.categorie} • {formation.duree} • {formation.langue}
                  </p>
                </div>
                <div className="text-lg font-bold text-indigo-600">
                  {formation.prix.toLocaleString()} Ar
                </div>
              </div>
              
              <p className="text-gray-600 text-sm mt-2 line-clamp-2">
                {formation.description}
              </p>
              
              {/* Actions */}
              <div className="flex justify-end space-x-2 mt-4 pt-4 border-t">
                <button
                  onClick={() => handleEdit(formation)}
                  className="text-blue-600 hover:text-blue-800 p-1"
                >
                  <Pencil className="w-5 h-5" />
                </button>
                <button
                  onClick={() => handleDelete(formation.id)}
                  className="text-red-600 hover:text-red-800 p-1"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Message si aucune formation */}
      {formations.length === 0 && !isLoading && (
        <div className="bg-white rounded-lg shadow-md p-12 text-center">
          <p className="text-gray-500">Aucune formation pour le moment</p>
          <button
            onClick={handleAdd}
            className="mt-4 text-indigo-600 hover:text-indigo-700"
          >
            Créer la première formation
          </button>
        </div>
      )}

      {/* Modal Ajouter/Modifier */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center p-4 border-b">
              <h2 className="text-xl font-bold">
                {editingFormation ? 'Modifier la formation' : 'Nouvelle formation'}
              </h2>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            
            <form onSubmit={handleSubmit} className="p-4 space-y-4">
              {/* Image */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Image de couverture
                </label>
                <div className="flex items-center space-x-4">
                  {imagePreview && (
                    <img src={imagePreview} alt="Preview" className="w-20 h-20 object-cover rounded" />
                  )}
                  <label className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50">
                    <Upload className="w-5 h-5 text-gray-500" />
                    <span className="text-sm">Choisir une image</span>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageChange}
                      className="hidden"
                    />
                  </label>
                </div>
              </div>
              
              {/* Titre */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Titre *
                </label>
                <input
                  type="text"
                  required
                  value={formData.titre}
                  onChange={(e) => setFormData({ ...formData, titre: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>
              
              {/* Description */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Description *
                </label>
                <textarea
                  required
                  rows={4}
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>
              
              {/* Prix et Catégorie */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Prix (Ar) *
                  </label>
                  <input
                    type="number"
                    required
                    min="0"
                    step="1000"
                    value={formData.prix}
                    onChange={(e) => setFormData({ ...formData, prix: parseFloat(e.target.value) })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Catégorie *
                  </label>
                  <select
                    required
                    value={formData.categorie}
                    onChange={(e) => setFormData({ ...formData, categorie: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                  >
                    <option value="">Sélectionner</option>
                    {categories.map(cat => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                </div>
              </div>
              
              {/* Durée et Langue */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Durée *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="ex: 3 mois, 40 heures"
                    value={formData.duree}
                    onChange={(e) => setFormData({ ...formData, duree: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Langue *
                  </label>
                  <select
                    required
                    value={formData.langue}
                    onChange={(e) => setFormData({ ...formData, langue: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                  >
                    {langues.map(lang => (
                      <option key={lang} value={lang}>{lang}</option>
                    ))}
                  </select>
                </div>
              </div>
              
              {/* Boutons */}
              <div className="flex justify-end space-x-3 pt-4 border-t">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
                >
                  {editingFormation ? 'Modifier' : 'Créer'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
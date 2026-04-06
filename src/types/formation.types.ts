export interface Formation {
  id: number;
  titre: string;
  description: string;
  prix: number;
  categorie: string;
  image: string;
  duree: string;
  langue: string;
}

export interface FormationFormData {
  titre: string;
  description: string;
  prix: number;
  categorie: string;
  duree: string;
  langue: string;
}
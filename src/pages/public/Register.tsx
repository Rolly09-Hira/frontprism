import React, { useState, useMemo, useEffect } from "react";
import Select from "react-select";
import countryList from "react-select-country-list";
import ReactCountryFlag from "react-country-flag";
import axios from "axios";

export default function Register() {

  const [formData, setFormData] = useState({
    nom: "",
    prenom: "",
    email: "",
    motDePasse: "",
    telephone: "",
    photoProfil: null,
    rue: "",
    ville: "",
    codePostal: "",
    pays: "",
    complement: ""
  });

  const [selectedCountry, setSelectedCountry] = useState(null);

  const countries = useMemo(() => {
    const list = countryList().getData();
    const madagascar = list.find(c => c.label === "Madagascar");
    const others = list.filter(c => c.label !== "Madagascar");
    return madagascar ? [madagascar, ...others] : list;
  }, []);

  useEffect(() => {
    axios.get("https://ipapi.co/json/")
      .then(res => {
        const countryCode = res.data.country_code;

        const detected = countries.find(
          c => c.value === countryCode
        );

        if (detected) {
          setSelectedCountry(detected);
          setFormData(prev => ({
            ...prev,
            pays: detected.label
          }));
        }
      })
      .catch(() => {
        console.log("IP detection failed");
      });
  }, [countries]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (name === "photoProfil") {
      setFormData({ ...formData, photoProfil: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleCountryChange = (selected) => {
    setSelectedCountry(selected);
    setFormData({
      ...formData,
      pays: selected.label
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Data:", formData);
  };

  const inputStyle =
    "w-full px-4 py-2 rounded-xl border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition duration-200";

  const formatOptionLabel = ({ label, value }) => (
    <div className="flex items-center gap-3">
      <ReactCountryFlag
        countryCode={value}
        svg
        style={{ width: "1.5em", height: "1.5em" }}
      />
      <span>{label}</span>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center py-10 px-6">

      <div className="bg-white w-full max-w-5xl rounded-3xl shadow-2xl p-10">

        <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">
          Inscription
        </h2>

        <form onSubmit={handleSubmit} className="space-y-10">

          {/* Informations personnelles */}
          <div>
            <h4 className="text-xl font-semibold text-gray-700 mb-6 border-b pb-2">
              Informations personnelles
            </h4>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

              {/* Nom */}
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-2">
                  Nom <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="nom"
                  value={formData.nom}
                  onChange={handleChange}
                  required
                  className={inputStyle}
                />
              </div>

              {/* Prénom */}
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-2">
                  Prénom <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="prenom"
                  value={formData.prenom}
                  onChange={handleChange}
                  required
                  className={inputStyle}
                />
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-2">
                  Email <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className={inputStyle}
                />
              </div>

              {/* Téléphone */}
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-2">
                  Téléphone <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="telephone"
                  value={formData.telephone}
                  onChange={handleChange}
                  required
                  className={inputStyle}
                />
              </div>

              {/* Photo */}
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-2">
                  Photo de profil
                </label>
                <input
                  type="file"
                  name="photoProfil"
                  accept="image/*"
                  onChange={handleChange}
                  className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100"
                />
              </div>

            </div>
          </div>

          {/* Adresse */}
          <div>
            <h4 className="text-xl font-semibold text-gray-700 mb-6 border-b pb-2">
              Adresse
            </h4>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

              {/* Pays */}
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-2">
                  Pays <span className="text-red-500">*</span>
                </label>
                <Select
                  options={countries}
                  value={selectedCountry}
                  onChange={handleCountryChange}
                  formatOptionLabel={formatOptionLabel}
                  isSearchable
                  placeholder="Rechercher un pays..."
                  className="text-sm"
                />
              </div>

              {/* Ville */}
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-2">
                  Ville <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="ville"
                  value={formData.ville}
                  onChange={handleChange}
                  required
                  className={inputStyle}
                />
              </div>

              {/* Code Postal */}
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-2">
                  Code Postal
                </label>
                <input
                  type="text"
                  name="codePostal"
                  value={formData.codePostal}
                  onChange={handleChange}
                  className={inputStyle}
                />
              </div>

              {/* Rue */}
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-2">
                  Rue
                </label>
                <input
                  type="text"
                  name="rue"
                  value={formData.rue}
                  onChange={handleChange}
                  className={inputStyle}
                />
              </div>

              {/* Complément */}
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-600 mb-2">
                  Complément d'adresse
                </label>
                <input
                  type="text"
                  name="complement"
                  value={formData.complement}
                  onChange={handleChange}
                  className={inputStyle}
                />
              </div>

            </div>
          </div>

          {/* Note obligatoire */}
          <div className="text-sm text-gray-500">
            <span className="text-red-500">*</span> Champs obligatoires
          </div>

          {/* Submit */}
          <div className="text-center">
            <button
              type="submit"
              className="px-10 py-3 bg-indigo-600 text-white font-semibold rounded-2xl shadow-lg hover:bg-indigo-700 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
            >
              S'inscrire
            </button>
          </div>

        </form>
      </div>
    </div>
  );
}

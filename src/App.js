import React, { useState, useEffect } from 'react';
import './App.css';
import Header from './Header';
import Recherche from './Recherche';
import LigneBus from './LigneBus';
import DetailLigne from './DetailLigne';
import Footer from './Footer';
import Carte from './Carte';

function App() {
  const [lignes, setLignes] = useState([]);
  const [chargement, setChargement] = useState(true);
  const [erreur, setErreur] = useState(null);
  const [recherche, setRecherche] = useState("");
  const [ligneSelectionnee, setLigneSelectionnee] = useState(null);

  
const chargerDonnees = () => {
  setChargement(true); // On remet le chargement à true avant de lancer le fetch
  setErreur(null);     // On réinitialise l'erreur précédente

  fetch("http://localhost:5000/lignes")
    .then((response) => {
      if (!response.ok) {
        throw new Error("Erreur serveur : " + response.status);
      }
      return response.json();
    })
    .then((data) => {
      setLignes(data);
      setChargement(false);
    })
    .catch((error) => {
      setErreur(error.message);
      setChargement(false);
    });
};

// 2. Votre useEffect devient très simple : il appelle juste la fonction au démarrage
useEffect(() => {
  chargerDonnees();
}, []);
  useEffect(() => {
    fetch("http://localhost:5000/lignes")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Erreur serveur : " + response.status);
        }
        return response.json();
      })
      .then((data) => {
        setLignes(data);
        setChargement(false);
      })
      .catch((error) => {
        setErreur(error.message);
        setChargement(false);
      });
  }, []);

  const lignesFiltrees = lignes.filter((l) =>
    l.depart.toLowerCase().includes(recherche.toLowerCase()) ||
    l.arrivee.toLowerCase().includes(recherche.toLowerCase()) ||
    l.numero.includes(recherche)
  );

  function handleClickLigne(ligne) {
  // Si on clique sur la ligne déjà sélectionnée, on la ferme
  if (ligneSelectionnee && ligneSelectionnee.id === ligne.id) {
    setLigneSelectionnee(null);
    return;
  }

  // Sinon, on va chercher ses détails précis auprès de l'API Flask
  fetch(`http://localhost:5000/lignes/${ligne.id}`)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Impossible de charger les détails de cette ligne.");
      }
      return response.json();
    })
    .then((data) => {
      // data contient maintenant l'objet complet renvoyé par l'endpoint GET /lignes/<id>
      setLigneSelectionnee(data);
    })
    .catch((error) => {
      alert(error.message); // Petit avertissement si le fetch individuel échoue
    });
}

  if (chargement) {
    return (
      <div className="App">
        <Header />
        <main className="contenu">
          <p className="message-chargement">Chargement des lignes ...</p>
        </main>
        {/* Dr. El Hadji Bassirou TOURÉ - ESP/UCAD - L2 GLSI */}
        {/* Réutilisation de Composants Lab 5 : Connecter React et Flask */}
      </div>
    );
  }

  if (erreur) {
  return (
    <div className="App">
      <Header />
      <main className="contenu">
        <div className="message-erreur">
          <p>Impossible de charger les lignes.</p>
          <p className="erreur-detail">{erreur}</p>
          <p>Vérifiez que le serveur Flask est lancé (python api/app.py).</p>
          
          {/* BOUTON RECHARGER */}
          <button onClick={chargerDonnees} className="btn-recharger">
            Recharger 🔄
          </button>
        </div>
      </main>
    </div>
  );
}

  return (
    <div className="App">
      <Header />
      <main className="contenu">
        <Recherche valeur={recherche} onChange={setRecherche} />
        
        <p className="resultat-recherche">
          {lignesFiltrees.length} ligne{lignesFiltrees.length > 1 ? 's' : ''}{' '}
          trouvée{lignesFiltrees.length > 1 ? 's' : ''}
        </p>

        {lignesFiltrees.map((ligne) => (
          <LigneBus
            key={ligne.id}
            numero={ligne.numero}
            depart={ligne.depart}
            arrivee={ligne.arrivee}
            arrets={ligne.arrets}
            estSelectionnee={ligneSelectionnee && ligneSelectionnee.id === ligne.id}
            onClick={() => handleClickLigne(ligne)}
          />
        ))}

        {ligneSelectionnee && <DetailLigne ligne={ligneSelectionnee} />}
        <Carte />
      </main>
      <Footer />
    </div>
  );
}

export default App;
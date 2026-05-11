import {useState} from "react";

 function Test (){
    const [compteur, modifierCompteur] = useState(0);
    const [nom, setNom] = useState("Cheikh");
    function incrementer(){
        modifierCompteur(compteur + 1)
    }

     function decrementer(){
        modifierCompteur(compteur - 1)
    }
    return(
        <div className="Test">
            <button onClick={() => {incrementer()}}>Incrementer</button>
            {compteur}
            <button onClick={() => {decrementer()}}>Decrementer</button>
            <button onClick ={(evenement) => {console.log(evenement)}}>Evenement</button>
            <input value={nom} onChange={(e) => { setNom(e.target.value) ;console.log(e.target.value)}}></input>
        </div>
    );

 }
 export default Test;
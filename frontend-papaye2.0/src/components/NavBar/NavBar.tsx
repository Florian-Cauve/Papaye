import React from "react";
import {Link} from "react-router-dom";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faAppleAlt, faDumbbell, faHome, faSearch, faUser} from "@fortawesome/free-solid-svg-icons";

interface IProps {
    part: string
}

const NavBar = (props: IProps) => {
    let selectedPart: {[index: string]:string} = {
        "home" : "text-green-900",
        "search" : "text-green-900",
        "sport" : "text-green-900",
        "food" : "text-green-900",
        "account" : "text-green-900",
    }

    selectedPart[props.part] = "text-red-400"

    return (

        // Barre de navigation de l'appli
        <div className="w-full flex justify-between absolute bottom-0 border-t-2 border-green-900 bg-white">

            {/* Bouton home/ fil d'actualité */}
            <Link to="/news" className="flex-1 items-center py-4">
                <FontAwesomeIcon icon={ faHome } className={selectedPart.home} size="3x"/>
            </Link>

            {/* Bouton pour les recherches */}
            <Link to="/news" className="flex-1 items-center py-4">
                <FontAwesomeIcon icon={ faSearch } className={selectedPart.search} size="3x"/>
            </Link>

            {/* Bouton pour la partie sport */}
            <Link to="/training_list" className="flex-1 items-center py-4">
                <FontAwesomeIcon icon={ faDumbbell } className={selectedPart.sport} size="3x"/>
            </Link>

            {/* Bouton pour la partie nourriture */}
            <Link to="/news" className="flex-1 items-center py-4">
                <FontAwesomeIcon icon={ faAppleAlt } className={selectedPart.food} size="3x"/>
            </Link>

            {/* Bouton pour voir son compte */}
            <Link to="/news" className="flex-1 items-center py-4">
                <FontAwesomeIcon icon={ faUser } className={selectedPart.account} size="3x"/>
            </Link>

        </div>
    )
}

export default NavBar;
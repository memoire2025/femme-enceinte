import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const titleMap = {
    '/' : 'Login | Femmes-enceinte',
    '/home' : 'Accueil | Femmes-enceinte',
    '/personnel' : 'Personnel | Femmes-enceinte',
    '/patientes' : 'Patientes | Femmes-enceinte',
    '/rendez-vous' : 'Rendez-vous | Femmes-enceinte',
    '/dossier' : 'Dossier | Femmes-enceinte',
    '/dossier_patiente' : 'Dossier | Femme-enceinte',
    '/liste-rdv' : 'Rendez-vous | Femme-enceite',

}

const TitleMgm = () => {
    const location = useLocation();

    useEffect(() => {
        document.title = titleMap[location.pathname] || 'Femmes-enceinte';
    }, [location.pathname]);

    return null;
}

export default TitleMgm;
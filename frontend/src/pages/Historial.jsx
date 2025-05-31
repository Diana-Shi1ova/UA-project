import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";
import Filtrarassets from "../components/Filtrarassets/Filtrarassets";

// import Card from "../components/Card/Card";
// import Perfilbuttons from "../components/Perfilbuttons/Perfilbuttons";
// import Filtrarassets from "../components/Filtrarassets/Filtrarassets";

function Perfil(){ 
    return( 
        <div className="content">
            <Header></Header>
            <main>
                <h2>Historial</h2>
                <Filtrarassets></Filtrarassets>
            </main>
            <Footer></Footer>
        </div>
    );
}

export default Perfil;
import { useCart } from "./CartContext";
import axios from "axios";

const Panier = () => {
    const { cart, removeFromCart, clearCart } = useCart();

    const envoyerPanier = async () => {
        try {
            const panier = cart.map((p) => ({ id: p.id, quantity: p.quantity }));
            const response = await axios.post("http://localhost:5000/api/commande", {
                produits: panier,
            });
            console.log("Réponse serveur :", response.data);
            clearCart();
        } catch (error) {
            console.error("Erreur lors de l'envoi :", error);
        }
    };

    return (
        <div>
            <h2>Panier</h2>
            {cart.length === 0 ? <p>Votre panier est vide.</p> : (
                <ul>
                    {cart.map((p) => (
                        <li key={p.id}>
                            {p.name} - {p.quantity} x {p.price}€
                            <button onClick={() => removeFromCart(p.id)}>Supprimer</button>
                        </li>
                    ))}
                </ul>
            )}
            <button onClick={envoyerPanier} disabled={cart.length === 0}>
                Commander
            </button>
        </div>
    );
};

export default Panier;

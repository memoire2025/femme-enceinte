import { useCart } from "./CartContext";

const Produit = ({ product }) => {
    const { addToCart } = useCart();

    return (
        <div>
            <h3>{product.name}</h3>
            <p>Prix: {product.price}€</p>
            <button onClick={() => addToCart(product)}>Ajouter au panier</button>
        </div>
    );
};

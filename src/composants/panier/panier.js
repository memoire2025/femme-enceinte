import { createContext, useState, useContext } from "react";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const [cart, setCart] = useState([]);

    // Ajouter un produit au panier
    const addToCart = (product) => {
        setCart((prevCart) => {
            const existingProduct = prevCart.find((p) => p.id === product.id);
            if (existingProduct) {
                return prevCart.map((p) =>
                    p.id === product.id ? { ...p, quantity: p.quantity + 1 } : p
                );
            } else {
                return [...prevCart, { ...product, quantity: 1 }];
            }
        });
    };

    // Supprimer un produit du panier
    const removeFromCart = (id) => {
        setCart((prevCart) => prevCart.filter((p) => p.id !== id));
    };

    // Vider le panier
    const clearCart = () => setCart([]);

    return (
        <CartContext.Provider value={{ cart, addToCart, removeFromCart, clearCart }}>
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => useContext(CartContext);




export const FormComponent = ({ fields = [], onSubmit, className = "", initialValues = {} }) => {
    const [formData, setFormData] = useState(() => {
        const init = {};
        fields.forEach(({ name, type, value }) => {
          if (type === "checkbox") init[name] = [];
          else init[name] = initialValues[name] || value || "";
        });
        return init;
      });
    
      const [errors, setErrors] = useState({});
    
      const handleChange = (e) => {
        const { name, type, value, checked, files } = e.target;
    
        setFormData((prev) => {
          if (type === "checkbox") {
            const prevValues = Array.isArray(prev[name]) ? prev[name] : [];
            return {
              ...prev,
              [name]: checked
                ? [...prevValues, value]
                : prevValues.filter((v) => v !== value),
            };
          }
    
          if (type === "radio") {
            return { ...prev, [name]: value };
          }
    
          if (type === "file") {
            return { ...prev, [name]: files[0] };
          }
    
          return { ...prev, [name]: value };
        });
    
        setErrors((prev) => ({ ...prev, [name]: null }));
      };
    
      const validateForm = () => {
        const newErrors = {};
        fields.forEach(({ name, label, validation }) => {
          const value = formData[name];
    
          if (validation?.required && (!value || (Array.isArray(value) && value.length === 0))) {
            newErrors[name] = `${label || name} est requis.`;
          }
    
          if (validation?.pattern && value && !validation.pattern.test(value)) {
            newErrors[name] = `${label || name} est invalide.`;
          }
    
          if (validation?.minLength && value && value.length < validation.minLength) {
            newErrors[name] = `${label || name} doit contenir au moins ${validation.minLength} caractères.`;
          }
        });
    
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
      };
    
      const handleSubmit = (e) => {
        e.preventDefault();
        if (!validateForm()) return;
        onSubmit(formData);
      };
    
      return (
        <Form onSubmit={handleSubmit} className={className}>
          {fields.map((field, idx) => {
            const { name, label, type, options, placeholder, accept, className: fieldClass } = field;
            const value = formData[name];
            const error = errors[name];
    
            const commonProps = {
              name,
              value: type === "file" ? undefined : value,
              onChange: handleChange,
              isInvalid: !!error,
              placeholder,
              className: fieldClass || "",
            };
    
            switch (type) {
              case "textarea":
                return (
                  <Form.Group key={idx} className="mb-3">
                    <Form.Label>{label}</Form.Label>
                    <Form.Control as="textarea" {...commonProps} />
                    <Form.Control.Feedback type="invalid">{error}</Form.Control.Feedback>
                  </Form.Group>
                );
    
              case "select":
                return (
                  <Form.Group key={idx} className="mb-3">
                    <Form.Label>{label}</Form.Label>
                    <Form.Select {...commonProps}>
                      <option value="">-- Choisir --</option>
                      {options.map((opt, i) => (
                        <option key={i} value={opt.value}>{opt.label}</option>
                      ))}
                    </Form.Select>
                    <Form.Control.Feedback type="invalid">{error}</Form.Control.Feedback>
                  </Form.Group>
                );
    
              case "checkbox":
                return (
                  <Form.Group key={idx} className="mb-3">
                    <Form.Label>{label}</Form.Label>
                    {options.map((opt, i) => (
                      <Form.Check
                        key={i}
                        type="checkbox"
                        label={opt.label}
                        name={name}
                        value={opt.value}
                        checked={value.includes(opt.value)}
                        onChange={handleChange}
                        isInvalid={!!error}
                        feedback={error}
                        feedbackType="invalid"
                        className={fieldClass}
                      />
                    ))}
                  </Form.Group>
                );
    
              case "radio":
                return (
                  <Form.Group key={idx} className="mb-3">
                    <Form.Label>{label}</Form.Label>
                    {options.map((opt, i) => (
                      <Form.Check
                        key={i}
                        type="radio"
                        label={opt.label}
                        name={name}
                        value={opt.value}
                        checked={value === opt.value}
                        onChange={handleChange}
                        isInvalid={!!error}
                        feedback={error}
                        feedbackType="invalid"
                        className={fieldClass}
                      />
                    ))}
                  </Form.Group>
                );
    
              default:
                return (
                  <Form.Group key={idx} className="mb-3">
                    {type !== "hidden" && <Form.Label>{label}</Form.Label>}
                    <Form.Control
                      type={type}
                      {...commonProps}
                      {...(type === "file" && { accept })}
                    />
                    <Form.Control.Feedback type="invalid">{error}</Form.Control.Feedback>
                  </Form.Group>
                );
            }
          })}
    
          <Button type="submit" variant="primary">
            Envoyer
          </Button>
        </Form>
      );
}
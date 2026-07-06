import { useState } from "react";
import { useForm } from "react-hook-form";
import { useAuth } from "../context/authContext.jsx";
import API from "../api/axios";
import toast from "react-hot-toast";

function BurgerOrderForm({ formattedIngredients, totalPrice, onSuccess }) {
  const { token } = useAuth();
  const [placedOrderId, setPlacedOrderId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [orderStatus, setOrderStatus] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      cardNumber: "",
      expiryDate: "",
      cvv: "",
    },
  });

  const handleConfirmOrder = async (data) => {
    setLoading(true);

    try {
      const cardPayload = {
        cardNumber: data.cardNumber.replace(/\s+/g, ""),
        expiryDate: data.expiryDate,
        cvv: data.cvv,
      };

      const cardResponse = await API.post("/api/cards/add-card", cardPayload);

      const mappedIngredients = formattedIngredients.map((item) => ({
        name: item.name,
        quantity: item.quantity,
        unitPrice: item.price,
      }));

      const orderPayload = {
        ingredients: mappedIngredients,
        totalPrice: totalPrice,
      };

      const orderResponse = await API.post(
        "/api/orders/place-order",
        orderPayload,
      );

      if (orderResponse.status === 201) {
        toast.success("🎉 Card Saved & Order Placed Successfully!");
        setPlacedOrderId(orderResponse.data._id);
        setOrderStatus(orderResponse.data.status || "pending");
      }
    } catch (error) {
      console.error("Checkout process failed:", error);
      toast.error(
        error.response?.data?.error || "Transaction failed. Please try again.",
      );
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteOrder = async () => {
    if (!window.confirm("Are you sure you want to cancel this order?")) return;
    setLoading(true);

    try {
      const response = await API.delete(
        `/api/orders/delete-order/${placedOrderId}`,
      );

      if (response.status === 200) {
        toast.success("Order Deleted Successfully!");
        setPlacedOrderId(null);
        setOrderStatus("");
      }
    } catch (error) {
      console.error("Order deletion failed:", error);
      toast.error(error.response?.data?.error || "Failed to delete order");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="payment-container"
      style={{ maxWidth: "400px", margin: "0 auto" }}
    >
      {!placedOrderId ? (
        <form onSubmit={handleSubmit(handleConfirmOrder)}>
          <h4 className="fw-bold mb-4 text-dark text-center">
            💳 Enter Card Details
          </h4>

          <div className="mb-3">
            <input
              type="text"
              className={`form-control p-3 rounded-3 ${errors.cardNumber ? "is-invalid" : ""}`}
              placeholder="Card Number"
              maxLength="16"
              {...register("cardNumber", {
                required: "Card number is required",
                pattern: {
                  value: /^\d{16}$/,
                  message: "Card number must be exactly 16 numeric digits",
                },
              })}
            />
            {errors.cardNumber && (
              <div className="invalid-feedback">
                {errors.cardNumber.message}
              </div>
            )}
          </div>

          <div className="row mb-4">
            <div className="col-6">
              <input
                type="text"
                className={`form-control p-3 rounded-3 ${errors.expiryDate ? "is-invalid" : ""}`}
                placeholder="MM/YY"
                maxLength="5"
                {...register("expiryDate", {
                  required: "Required",
                  pattern: {
                    value: /^(0[1-9]|1[0-2])\/?([0-9]{2})$/,
                    message: "Use MM/YY format",
                  },
                })}
              />
              {errors.expiryDate && (
                <div className="invalid-feedback">
                  {errors.expiryDate.message}
                </div>
              )}
            </div>

            <div className="col-6">
              <input
                type="password"
                className={`form-control p-3 rounded-3 ${errors.cvv ? "is-invalid" : ""}`}
                placeholder="CVV"
                minLength="3"
                maxLength="4"
                {...register("cvv", {
                  required: "Required",
                  pattern: {
                    value: /^\d{3,4}$/,
                    message: "Must be 3 or 4 digits",
                  },
                })}
              />
              {errors.cvv && (
                <div className="invalid-feedback">{errors.cvv.message}</div>
              )}
            </div>
          </div>

          <button
            type="submit"
            className="btn btn-success btn-lg w-100 rounded-pill fw-bold"
            disabled={loading}
          >
            {loading ? "Processing..." : `Confirm Order (Rs. ${totalPrice})`}
          </button>
        </form>
      ) : (
        <div className="text-center py-3">
          <div className="alert alert-success rounded-4 mb-4 shadow-sm">
            <h5 className="fw-bold m-0">⚡ Order Active & Live!</h5>
            <small className="d-block mt-1 text-muted">
              ID: {placedOrderId}
            </small>
            <span className="badge bg-warning text-dark mt-2 text-uppercase px-3 py-2 rounded-pill">
              Status: {orderStatus}
            </span>
          </div>

          <p className="text-secondary small">
            You can manage or cancel your live kitchen loop below:
          </p>
          <div className="d-flex flex-column gap-2 mt-3">
            <button
              className="btn btn-outline-danger btn-md rounded-pill fw-bold"
              onClick={handleDeleteOrder}
              disabled={loading}
            >
              🗑️ Cancel & Delete Order
            </button>
            <button
              className="btn btn-light btn-sm rounded-pill mt-3 border text-secondary"
              onClick={onSuccess}
            >
              Create Another Burger →
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default BurgerOrderForm;

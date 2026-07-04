import { useForm } from "react-hook-form";
import { useNavigate, useOutletContext } from "react-router-dom";
import API from "../api/axios.js";
import toast from "react-hot-toast";

export function Login({ onViewChange }) {
  const navigate = useNavigate();
  const { setToken } = useOutletContext();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      const response = await API.post("/api/auth/login", data);
      const { token } = response.data;
      login(token);
      toast.success("🎉 Login successful!");
      navigate("/");
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Login failed. Please try again.",
      );
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center min-vh-100 bg-secondary bg-opacity-10 py-5">
      <div
        className="card shadow border-0 p-4 w-100"
        style={{ maxWidth: "450px", borderRadius: "24px" }}
      >
        <h3 className="h5 text-dark fw-bold border-bottom pb-3 mb-4 text-center">
          Login
        </h3>

        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          <div className="mb-3">
            <label
              htmlFor="email"
              className="form-label fw-semibold text-secondary"
            >
              Email Address
            </label>
            <input
              type="email"
              id="email"
              className={`form-control ${errors.email ? "is-invalid" : ""}`}
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^\S+@\S+$/i,
                  message: "Please enter a valid email address",
                },
              })}
            />
            {errors.email && (
              <div className="invalid-feedback">{errors.email.message}</div>
            )}
          </div>

          <div className="mb-3">
            <label
              htmlFor="password"
              className="form-label fw-semibold text-secondary"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              className={`form-control ${errors.password ? "is-invalid" : ""}`}
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 6,
                  message: "Password must be at least 6 characters long",
                },
              })}
            />
            {errors.password && (
              <div className="invalid-feedback">{errors.password.message}</div>
            )}
          </div>

          <div className="d-grid gap-2">
            <button
              type="submit"
              className="btn btn-success rounded-pill fw-bold"
            >
              Login
            </button>
            <button
              type="button"
              className="btn btn-light rounded-pill btn-sm text-muted"
              onClick={() => navigate("/")}
            >
              Cancel
            </button>
          </div>
        </form>

        <div className="text-center mt-3 small">
          <span className="text-muted">
            Don't have an account?{" "}
            <span
              className="text-primary fw-semibold"
              style={{ cursor: "pointer" }}
              onClick={() => navigate("/signup")}
            >
              Sign Up
            </span>
          </span>
        </div>
      </div>
    </div>
  );
}

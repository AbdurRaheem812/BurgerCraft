import { useForm } from "react-hook-form";
import { useNavigate, useOutletContext } from "react-router-dom";
import API from "../api/axios";
import toast from "react-hot-toast";

export function Signup({ onViewChange }) {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      await API.post("/api/auth/signup", data);
      toast.success("Signed up successfully!");
      navigate("/login");
    } catch (error) {
      toast.error("Signup error:", error);
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center min-vh-100 bg-secondary bg-opacity-10 py-5">
      <div
        className="card shadow border-0 p-4 w-100"
        style={{ maxWidth: "450px", borderRadius: "24px" }}
      >
        <h3 className="h5 text-dark fw-bold border-bottom pb-3 mb-4 text-center">
          Sign Up
        </h3>

        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          <div className="mb-3">
            <label
              htmlFor="name"
              className="form-label fw-semibold text-secondary"
            >
              Full Name
            </label>
            <input
              type="text"
              id="name"
              className={`form-control ${errors.username ? "is-invalid" : ""}`}
              {...register("username", { required: "Name is required" })}
            />
            {errors.username && (
              <div className="invalid-feedback">{errors.username.message}</div>
            )}
          </div>

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
              htmlFor="phoneNumber"
              className="form-label fw-semibold text-secondary"
            >
              Phone Number
            </label>
            <input
              type="tel"
              id="phoneNumber"
              className={`form-control ${errors.phoneNumber ? "is-invalid" : ""}`}
              {...register("phoneNumber", {
                required: "Phone number is required",
                pattern: {
                  value: /^[0-9]{10}$/,
                  message: "Please enter a valid 10-digit phone number",
                },
              })}
            />
            {errors.phoneNumber && (
              <div className="invalid-feedback">
                {errors.phoneNumber.message}
              </div>
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
              Sign Up
            </button>
            <button
              type="button"
              className="btn btn-light rounded-pill btn-sm text-muted"
              onClick={() => onViewChange("home")}
            >
              Cancel
            </button>
          </div>
        </form>

        <div className="text-center mt-3 small">
          <span className="text-muted">
            Already have an account?{" "}
            <span
              className="text-primary fw-semibold"
              style={{ cursor: "pointer" }}
              onClick={() => onViewChange("login")}
            >
              Login
            </span>
          </span>
        </div>
      </div>
    </div>
  );
}

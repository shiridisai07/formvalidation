import React, { useState } from "react";
import "./App.css";

const initialForm = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  country: "",
  dob: "",
  password: "",
  confirmPassword: "",
  terms: false,
};

function App() {
  const [formData, setFormData] = useState(initialForm);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

  // Validate single field
  const validateField = (name, value, allValues = formData) => {
    switch (name) {
      case "firstName":
        if (!value.trim()) return "First name is required";
        return "";
      case "lastName":
        if (!value.trim()) return "Last name is required";
        return "";
      case "email":
        if (!value) return "Email is required";
        if (!/^\S+@\S+\.\S+$/.test(value)) return "Email is invalid";
        return "";
      case "phone":
        if (!value) return "Phone number is required";
        if (!/^\d{10}$/.test(value)) return "Phone must be 10 digits";
        return "";
      case "country":
        if (!value) return "Please select country";
        return "";
      case "dob":
        if (!value) return "Date of birth required";
        return "";
      case "password":
        if (!value) return "Password is required";
        if (value.length < 8) return "Password must be at least 8 characters";
        return "";
      case "confirmPassword":
        if (!value) return "Confirm Password is required";
        if (value !== allValues.password) return "Passwords do not match";
        return "";
      case "terms":
        if (!value) return "Accept terms to proceed";
        return "";
      default:
        return "";
    }
  };

  // Validate entire form
  const validateForm = () => {
    const nextErrors = {};
    Object.keys(formData).forEach((key) => {
      const msg = validateField(key, formData[key], formData);
      if (msg) nextErrors[key] = msg;
    });
    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  // Handle input change
  const handleChange = (e) => {
    const { name, type, value, checked } = e.target;
    const val = type === "checkbox" ? checked : value;
    const updated = { ...formData, [name]: val };
    setFormData(updated);

    if (touched[name]) {
      const msg = validateField(name, val, updated);
      setErrors((prev) => ({ ...prev, [name]: msg || undefined }));
    }
  };

  // Handle blur
  const handleBlur = (e) => {
    const { name, value, type, checked } = e.target;
    const val = type === "checkbox" ? checked : value;
    setTouched((prev) => ({ ...prev, [name]: true }));
    const msg = validateField(name, val);
    setErrors((prev) => ({ ...prev, [name]: msg || undefined }));
  };

  // Handle form submit
  const handleSubmit = (e) => {
    e.preventDefault();
    const allTouched = {};
    Object.keys(formData).forEach((key) => (allTouched[key] = true));
    setTouched(allTouched);

    if (validateForm()) {
      alert("✅ Form Submitted Successfully!");
      setFormData(initialForm);
      setErrors({});
      setTouched({});
    }
  };

  return (
    <div className="page">
      <div className="card">
        <h2>Create Account</h2>
        <form onSubmit={handleSubmit} noValidate>
          {/* First & Last Name */}
          <div className="form-group">
            <label>First Name *</label>
            <input
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {errors.firstName && <span className="error">{errors.firstName}</span>}
          </div>
          <div className="form-group">
            <label>Last Name *</label>
            <input
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {errors.lastName && <span className="error">{errors.lastName}</span>}
          </div>

          {/* Email */}
          <div className="form-group">
            <label>Email *</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {errors.email && <span className="error">{errors.email}</span>}
          </div>

          {/* Phone */}
          <div className="form-group">
            <label>Phone *</label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {errors.phone && <span className="error">{errors.phone}</span>}
          </div>

          {/* Country */}
          <div className="form-group">
            <label>Country *</label>
            <select
              name="country"
              value={formData.country}
              onChange={handleChange}
              onBlur={handleBlur}
            >
              <option value="">Select…</option>
              <option value="India">India</option>
              <option value="USA">USA</option>
              <option value="UK">UK</option>
            </select>
            {errors.country && <span className="error">{errors.country}</span>}
          </div>

          {/* DOB */}
          <div className="form-group">
            <label>Date of Birth *</label>
            <input
              type="date"
              name="dob"
              value={formData.dob}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {errors.dob && <span className="error">{errors.dob}</span>}
          </div>

          {/* Password */}
          <div className="form-group">
            <label>Password *</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {errors.password && <span className="error">{errors.password}</span>}
          </div>

          {/* Confirm Password */}
          <div className="form-group">
            <label>Confirm Password *</label>
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {errors.confirmPassword && <span className="error">{errors.confirmPassword}</span>}
          </div>

          {/* Terms */}
          <div className="form-group">
            <label>
              <input
                type="checkbox"
                name="terms"
                checked={formData.terms}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              I agree to Terms & Conditions
            </label>
            {errors.terms && <span className="error">{errors.terms}</span>}
          </div>

          <button type="submit">Register</button>
        </form>
      </div>
    </div>
  );
}

export default App;
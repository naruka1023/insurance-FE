import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProducts, calculatePremium } from "../api";
import "../App.css"; // Import the CSS file

const InsuranceForm = () => {
  const dispatch = useDispatch();
  const plans = useSelector((state: any) => state.plans);
  const premiumResult = useSelector((state: any) => state.premiumResult);

  const [form, setForm] = useState({
    genderCd: "MALE",
    dob: "",
    planCode: "T11A20",
    premiumPerYear: 30000,
    paymentFrequency: "YEARLY"
  });

  useEffect(() => {
    getProducts().then(res => dispatch({ type: "SET_PLANS", payload: res.data }));
  }, [dispatch]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await calculatePremium(form);
    dispatch({ type: "SET_PREMIUM", payload: res.data });
  };

  return (
    <div className="container">
      <h1>Insurance Premium Calculator</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Date of Birth</label>
          <input 
            type="date" 
            onChange={(e) => setForm({ ...form, dob: e.target.value })} 
          />
        </div>

        <div className="form-group">
          <label>Plan</label>
          <select onChange={(e) => setForm({ ...form, planCode: e.target.value })}>
            {plans.map((plan: any) => (
              <option key={plan.planCode} value={plan.planCode}>
                {plan.planCode} - Benefit: {plan.benefit.toLocaleString()}
              </option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label>Premium Per Year</label>
          <input 
            type="number" 
            value={form.premiumPerYear} 
            onChange={(e) => setForm({ ...form, premiumPerYear: Number(e.target.value) })} 
          />
        </div>

        <button type="submit">Calculate</button>
      </form>

      {premiumResult && (
        <div className="result">
          <h2>Result:</h2>
          <p><strong>Plan:</strong> {premiumResult.planCode}</p>
          <p><strong>Sum Assured:</strong> ${premiumResult.baseSumAssured.toLocaleString()}</p>
          <p><strong>Premium:</strong> ${premiumResult.premiumPerYear.toLocaleString()}</p>
        </div>
      )}
    </div>
  );
};

export default InsuranceForm;

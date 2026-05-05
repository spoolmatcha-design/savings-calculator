import React, { useState } from 'react';

export default function App() {
  const [income, setIncome] = useState(5000);
  const [expenses, setExpenses] = useState(3000);
  const savings = income - expenses;
  const percentage = income > 0 ? ((savings / income) * 100).toFixed(1) : 0;

  return (
    <div style={{ 
      fontFamily: 'system-ui', 
      direction: 'rtl', 
      padding: '20px', 
      maxWidth: '500px', 
      margin: '0 auto',
      backgroundColor: '#f5f5f5',
      minHeight: '100vh'
    }}>
      <h1 style={{ textAlign: 'center', color: '#1a1a1a' }}>حاسبة المدخرات 💰</h1>
      
      <div style={{ backgroundColor: 'white', padding: '20px', borderRadius: '12px', marginBottom: '16px' }}>
        <label style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold' }}>
          الدخل الشهري: {income} ريال
        </label>
        <input 
          type="range" 
          min="0" 
          max="20000" 
          value={income}
          onChange={(e) => setIncome(Number(e.target.value))}
          style={{ width: '100%' }}
        />
      </div>

      <div style={{ backgroundColor: 'white', padding: '20px', borderRadius: '12px', marginBottom: '16px' }}>
        <label style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold' }}>
          المصاريف: {expenses} ريال
        </label>
        <input 
          type="range" 
          min="0" 
          max="20000" 
          value={expenses}
          onChange={(e) => setExpenses(Number(e.target.value))}
          style={{ width: '100%' }}
        />
      </div>

      <div style={{ 
        backgroundColor: savings >= 0 ? '#d1fae5' : '#fee2e2', 
        padding: '20px', 
        borderRadius: '12px',
        textAlign: 'center'
      }}>
        <h2 style={{ margin: '0 0 8px 0' }}>
          المدخرات: {savings} ريال
        </h2>
        <p style={{ margin: 0, fontSize: '18px', fontWeight: 'bold' }}>
          نسبة الادخار: {percentage}%
        </p>
      </div>
    </div>
  );
}
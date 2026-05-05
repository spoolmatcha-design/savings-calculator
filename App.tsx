import React, { useState, useEffect, useRef } from "react";
import { animate } from "framer-motion";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from "recharts";
import { Wallet, PiggyBank, Target, TrendingUp, Star, ArrowUp } from "lucide-react";

// مكوّن الأرقام المتحركة
function AnimatedNumber({ value }: { value: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const prevValue = useRef(value);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const controls = animate(prevValue.current, value, {
      duration: 0.8,
      ease: "easeOut",
      onUpdate(val) {
        node.textContent = Math.round(val).toLocaleString("en-US");
      }
    });
    prevValue.current = value;
    return () => controls.stop();
  }, [value]);

  return <span ref={ref}>{value.toLocaleString("en-US")}</span>;
}

export default function Home() {
  const [salaryStr, setSalaryStr] = useState("10000");
  const [expensesStr, setExpensesStr] = useState("6000");
  const [goalStr, setGoalStr] = useState("50000");

  const salary   = parseFloat(salaryStr) || 0;
  const expenses = parseFloat(expensesStr) || 0;
  const goal     = parseFloat(goalStr) || 0;

  // ===== الحسابات الأساسية =====
  const monthlySavings    = Math.max(0, salary - expenses);
  const annualSavings     = monthlySavings * 12;
  const savingsPercentage = salary > 0 ? (monthlySavings / salary) * 100 : 0;
  const monthsToGoal      = monthlySavings > 0 ? Math.ceil(goal / monthlySavings) : null;

  // ===== الرسالة التحفيزية =====
  const isGreat = monthlySavings > 3000;
  const message = isGreat
    ? "ممتاز يا عزالدين! تقدر تستثمر بقوة"
    : "كويس، بس لو زودت التوفير بتصير ثري أسرع";

  // ===== بيانات الرسم البياني =====
  const chartData = [
    { name: "المصاريف", value: Math.min(expenses, salary), color: "#C9A84C" },
    { name: "المدخرات", value: monthlySavings,              color: "#1B6B4A" },
  ];

  return (
    <div dir="rtl" className="min-h-screen bg-background text-foreground p-8">
      <h1>حاسبة المدخرات</h1>

      {/* ===== الإدخالات ===== */}
      <div>
        <label>الراتب الشهري (ريال)</label>
        <input type="number" value={salaryStr}
          onChange={e => setSalaryStr(e.target.value)} />

        <label>المصاريف الشهرية (ريال)</label>
        <input type="number" value={expensesStr}
          onChange={e => setExpensesStr(e.target.value)} />
      </div>

      {/* ===== النتائج ===== */}
      <div>
        <p>المدخرات الشهرية: <AnimatedNumber value={monthlySavings} /> ريال</p>
        <p>المدخرات السنوية: <AnimatedNumber value={annualSavings} /> ريال</p>
        <p>نسبة الادخار:     <AnimatedNumber value={savingsPercentage} /> %</p>
      </div>

      {/* ===== الرسالة التحفيزية ===== */}
      {salary > 0 && <p>{message}</p>}

      {/* ===== هدف الادخار ===== */}
      <div>
        <label>هدفي المالي (ريال)</label>
        <input type="number" value={goalStr}
          onChange={e => setGoalStr(e.target.value)} />
        {monthsToGoal
          ? <p>ستصل للهدف خلال {monthsToGoal} شهر</p>
          : <p>قلّل المصاريف للوصول للهدف</p>}
      </div>

      {/* ===== التوقعات المستقبلية ===== */}
      <div>
        {[1, 3, 5, 10].map(years => (
          <p key={years}>
            بعد {years} سنة: <AnimatedNumber value={annualSavings * years} /> ريال
          </p>
        ))}
      </div>
    </div>
  );
}

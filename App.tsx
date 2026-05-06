import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import { Wallet, Target, TrendingUp, PiggyBank } from 'lucide-react';

export default function App() {
  const [income, setIncome] = useState(5000);
  const [expenses, setExpenses] = useState(3000);
  const [savingsGoal, setSavingsGoal] = useState(1000);
  
  const actualSavings = income - expenses;
  const savingsRate = income > 0 ? (actualSavings / income) * 100 : 0;
  const goalProgress = savingsGoal > 0 ? (actualSavings / savingsGoal) * 100 : 0;

  const chartData = [
    { name: 'مصاريف', value: expenses, color: '#ef4444' },
    { name: 'ادخار', value: actualSavings > 0 ? actualSavings : 0, color: '#22c55e' }
  ];
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white p-4" dir="rtl">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-4xl mx-auto"
      >
        <div className="text-center mb-8">
          <motion.h1 
            initial={{ scale: 0.5 }}
            animate={{ scale: 1 }}
            className="text-4xl md:text-5xl font-bold mb-2 bg-gradient-to-r from-green-400 to-blue-500 bg-clip-text text-transparent"
          >
            حاسبة الادخار الذكية
          </motion.h1>
          <p className="text-slate-300">خطط لمستقبلك المالي بذكاء</p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <motion.div 
            whileHover={{ scale: 1.02 }}
            className="bg-slate-800/50 backdrop-blur-lg rounded-2xl p-6 border border-slate-700"
          >
            <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
              <Wallet className="text-green-400" /> البيانات المالية
            </h2>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm text-slate-300 mb-2">الدخل الشهري</label>
                <input
                  type="number"
                  value={income}
                  onChange={(e) => setIncome(Number(e.target.value))}
                  className="w-full bg-slate-700 border border-slate-600 rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-green-400 outline-none"
                />
              </div>
              
              <div>
                <label className="block text-sm text-slate-300 mb-2">المصاريف الشهرية</label>
                <input
                  type="number"
                  value={expenses}
                  onChange={(e) => setExpenses(Number(e.target.value))}
                  className="w-full bg-slate-700 border border-slate-600 rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-red-400 outline-none"
                />
              </div>

              <div>
                <label className="block text-sm text-slate-300 mb-2">هدف الادخار</label>
                <input
                  type="number"
                  value={savingsGoal}
                  onChange={(e) => setSavingsGoal(Number(e.target.value))}
                  className="w-full bg-slate-700 border border-slate-600 rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-blue-400 outline-none"
                />
              </div>
            </div>
          </motion.div>
          <motion.div 
            whileHover={{ scale: 1.02 }}
            className="bg-slate-800/50 backdrop-blur-lg rounded-2xl p-6 border border-slate-700"
          >
            <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
              <TrendingUp className="text-blue-400" /> النتائج
            </h2>

            <div className="h-48 mb-4">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={chartData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    dataKey="value"
                  >
                    {chartData.map((entry, index) => (
                      <Cell key={index} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>

            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-slate-300 flex items-center gap-2">
                  <PiggyBank size={18} className="text-green-400" />
                  الادخار الفعلي:
                </span>
                <span className={`font-bold text-lg ${actualSavings >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                  {actualSavings.toLocaleString()} ريال
                </span>
              </div>

              <div className="flex justify-between items-center">
                <span className="text-slate-300">نسبة الادخار:</span>
                <span className="font-bold text-blue-400">{savingsRate.toFixed(1)}%</span>
              </div>

              <div className="flex justify-between items-center">
                <span className="text-slate-300 flex items-center gap-2">
                  <Target size={18} className="text-purple-400" />
                  التقدم للهدف:
                </span>
                <span className="font-bold text-purple-400">{goalProgress.toFixed(1)}%</span>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  ); 
}

import React, { useState } from 'react'
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
  ResponsiveContainer, PieChart, Pie, Cell, ScatterChart, Scatter,
  RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar,
  ComposedChart, Line, Area, Treemap
} from 'recharts'

// ============= 数据定义 =============
const DATA = {
  // 客制化行为热图数据
  modificationHeatmap: [
    { type: '杯型升级', count: 5478, rate: 28.5, icon: '📐', insight: '升级Large是绝对主流' },
    { type: '萃取调整', count: 4285, rate: 22.3, icon: '☕', insight: 'Espresso(3-4)常态化' },
    { type: '添加奶基', count: 2922, rate: 15.2, icon: '🥛', insight: 'Velvet Milk DIY厚乳' },
    { type: '冰度调整', count: 3574, rate: 18.6, icon: '🧊', insight: 'Light Ice占绝对主流' },
    { type: '基础奶更换', count: 2460, rate: 12.8, icon: '🌱', insight: '燕麦奶是首选替换' },
    { type: '糖浆调整', count: 2191, rate: 11.4, icon: '🍯', insight: '太妃榛果断层第一' },
    { type: '奶油选项', count: 1672, rate: 8.7, icon: '🍦', insight: 'Extra/No两极分化' },
    { type: '温度调整', count: 1249, rate: 6.5, icon: '🌡️', insight: 'Extra Hot需求强' },
  ],

  // 乳制品战场数据
  milkWar: {
    baseMilk: [
      { name: 'Coconut 椰奶', asDefault: 4250, asSwap: 320, color: '#84CC16' },
      { name: 'Whole 全脂', asDefault: 3180, asSwap: 180, color: '#F97316' },
      { name: 'Oat 燕麦', asDefault: 1450, asSwap: 1820, color: '#A855F7' },
      { name: 'Almond 杏仁', asDefault: 820, asSwap: 980, color: '#EC4899' },
      { name: '2% 低脂', asDefault: 1560, asSwap: 420, color: '#06B6D4' },
    ],
    addMilk: [
      { name: 'Velvet 丝绒奶', count: 3890, pct: 45.2 },
      { name: 'Oat 燕麦奶', count: 1650, pct: 19.2 },
      { name: 'Almond 杏仁奶', count: 980, pct: 11.4 },
      { name: 'Coconut 椰奶', count: 750, pct: 8.7 },
      { name: 'Whole 全脂奶', count: 680, pct: 7.9 },
    ],
    combos: [
      { combo: 'Oat + Velvet', count: 1280, trend: '+34%' },
      { combo: 'Coconut + Velvet', count: 980, trend: '+28%' },
      { combo: 'Almond + Velvet', count: 520, trend: '+18%' },
    ]
  },

  // 风味风向标数据
  flavorTrends: [
    { name: 'Toffee Hazelnut 太妃榛果', count: 2850, color: '#D97706', category: '坚果系' },
    { name: 'Cane Sugar 蔗糖', count: 2450, color: '#10B981', category: '基础甜' },
    { name: 'Vanilla 香草', count: 1820, color: '#8B5CF6', category: '经典系' },
    { name: 'Creme Brulee 焦糖布丁', count: 1580, color: '#F59E0B', category: '甜点系' },
    { name: 'Caramel 焦糖', count: 1420, color: '#EF4444', category: '焦糖系' },
    { name: 'Pumpkin 南瓜', count: 1280, color: '#F97316', category: '季节限定' },
    { name: 'Cinnamon 肉桂', count: 1050, color: '#78350F', category: '香料系' },
    { name: 'Popcorn 爆米花', count: 980, color: '#FBBF24', category: '创意系' },
    { name: 'Matcha 抹茶酱', count: 850, color: '#22C55E', category: '茶系' },
  ],

  // SPU健康度矩阵
  spuHealth: [
    { name: 'Iced Coconut Latte', sales: 1976, customRate: 36.5, status: 'healthy', defaultRate: 63.5 },
    { name: 'Spanish Latte', sales: 787, customRate: 78.2, status: 'alert', defaultRate: 21.8 },
    { name: 'Iced Latte', sales: 857, customRate: 88.7, status: 'alert', defaultRate: 11.3 },
    { name: 'Cold Brew', sales: 647, customRate: 35.7, status: 'healthy', defaultRate: 64.3 },
    { name: 'Velvet Latte', sales: 756, customRate: 23.4, status: 'excellent', defaultRate: 76.6 },
    { name: 'Kyoto Matcha Latte', sales: 501, customRate: 77.0, status: 'alert', defaultRate: 23.0 },
    { name: 'Coconut Latte', sales: 677, customRate: 43.1, status: 'healthy', defaultRate: 56.9 },
    { name: 'Cappuccino', sales: 359, customRate: 78.8, status: 'alert', defaultRate: 21.2 },
    { name: 'Americano', sales: 686, customRate: 60.8, status: 'warning', defaultRate: 39.2 },
    { name: 'Flat White', sales: 243, customRate: 79.0, status: 'alert', defaultRate: 21.0 },
    { name: 'Creme Brulee Latte', sales: 897, customRate: 67.2, status: 'warning', defaultRate: 32.8 },
    { name: 'Toffee Hazelnut Latte', sales: 456, customRate: 58.3, status: 'warning', defaultRate: 41.7 },
  ],

  // 冰度分析
  iceAnalysis: [
    { name: 'Regular Ice 标准冰', value: 68, color: '#3B82F6' },
    { name: 'Light Ice 少冰', value: 26, color: '#60A5FA' },
    { name: 'No Ice 去冰', value: 4, color: '#93C5FD' },
    { name: 'Extra Ice 多冰', value: 2, color: '#BFDBFE' },
  ],

  // 萃取分析
  extractAnalysis: [
    { shots: 'Espresso(2) 标准', count: 8520, pct: 72.5 },
    { shots: 'Espresso(3) 加浓', count: 2340, pct: 19.9 },
    { shots: 'Espresso(4) 超浓', count: 680, pct: 5.8 },
    { shots: 'Ristretto 意式', count: 210, pct: 1.8 },
  ],

  // 周度趋势
  weeklyTrend: [
    { week: 'W43', total: 4850, customized: 3120, rate: 64.3 },
    { week: 'W44', total: 5230, customized: 3450, rate: 66.0 },
    { week: 'W45', total: 5680, customized: 3820, rate: 67.3 },
    { week: 'W46', total: 6120, customized: 4180, rate: 68.3 },
    { week: 'W47', total: 6450, customized: 4520, rate: 70.1 },
    { week: 'W48', total: 6890, customized: 4950, rate: 71.8 },
  ],
}

const COLORS = ['#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6', '#EC4899', '#06B6D4', '#84CC16']

// ============= 样式常量 =============
const cardStyle = {
  background: 'linear-gradient(145deg, rgba(30,41,59,0.9) 0%, rgba(15,23,42,0.95) 100%)',
  borderRadius: '16px',
  padding: '24px',
  border: '1px solid rgba(255,255,255,0.08)',
  boxShadow: '0 4px 24px rgba(0,0,0,0.2)'
}

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div style={{
        background: 'rgba(15,23,42,0.95)',
        padding: '12px 16px',
        borderRadius: '8px',
        border: '1px solid rgba(59,130,246,0.3)',
        boxShadow: '0 8px 32px rgba(0,0,0,0.4)'
      }}>
        <p style={{ color: '#fff', margin: '0 0 8px', fontWeight: '600', fontSize: '13px' }}>{label}</p>
        {payload.map((entry, i) => (
          <p key={i} style={{ color: entry.color || '#94a3b8', margin: '4px 0', fontSize: '12px' }}>
            {entry.name}: {typeof entry.value === 'number' ? entry.value.toLocaleString() : entry.value}
          </p>
        ))}
      </div>
    )
  }
  return null
}

// ============= 主组件 =============
export default function App() {
  const [activeTab, setActiveTab] = useState('insights')

  const tabs = [
    { id: 'insights', label: '🎯 核心洞察', desc: 'Executive Summary' },
    { id: 'heatmap', label: '🔥 行为热图', desc: 'Modification Heatmap' },
    { id: 'milk', label: '🥛 乳品战场', desc: 'The Milk War' },
    { id: 'flavor', label: '🍯 风味趋势', desc: 'Flavor Trends' },
    { id: 'health', label: '📊 健康矩阵', desc: 'SPU Health Matrix' },
  ]

  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(180deg, #0a0a0f 0%, #0f172a 50%, #1e1b4b 100%)' }}>
      {/* Header */}
      <header style={{
        background: 'linear-gradient(90deg, rgba(30,58,138,0.95) 0%, rgba(79,70,229,0.9) 100%)',
        padding: '20px 32px',
        borderBottom: '1px solid rgba(255,255,255,0.1)',
        position: 'sticky',
        top: 0,
        zIndex: 100,
        backdropFilter: 'blur(12px)'
      }}>
        <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '16px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
              <div style={{
                width: '52px', height: '52px',
                background: 'linear-gradient(135deg, #3B82F6, #8B5CF6)',
                borderRadius: '12px',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: '26px',
                boxShadow: '0 4px 20px rgba(59,130,246,0.4)'
              }}>☕</div>
              <div>
                <h1 style={{
                  margin: 0, fontSize: '24px', fontWeight: '700',
                  background: 'linear-gradient(90deg, #fff, #c7d2fe)',
                  WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent'
                }}>北美瑞幸产品客制化分析</h1>
                <p style={{ margin: '2px 0 0', color: 'rgba(255,255,255,0.7)', fontSize: '13px' }}>
                  饮品研发数据洞察平台
                </p>
              </div>
            </div>
            <div style={{
              background: 'rgba(255,255,255,0.1)',
              padding: '8px 16px',
              borderRadius: '20px',
              fontSize: '12px',
              color: '#c7d2fe'
            }}>📅 2025年 W43-W48 · 样本量 19,218</div>
          </div>

          <nav style={{ display: 'flex', gap: '6px', marginTop: '16px', flexWrap: 'wrap' }}>
            {tabs.map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                style={{
                  padding: '10px 18px',
                  background: activeTab === tab.id
                    ? 'linear-gradient(135deg, #3B82F6, #6366F1)'
                    : 'rgba(255,255,255,0.06)',
                  border: 'none',
                  borderRadius: '8px',
                  color: activeTab === tab.id ? '#fff' : 'rgba(255,255,255,0.6)',
                  cursor: 'pointer',
                  fontSize: '13px',
                  fontWeight: activeTab === tab.id ? '600' : '400',
                  transition: 'all 0.2s',
                  boxShadow: activeTab === tab.id ? '0 4px 12px rgba(59,130,246,0.3)' : 'none'
                }}
              >{tab.label}</button>
            ))}
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main style={{ padding: '28px 32px', maxWidth: '1400px', margin: '0 auto' }}>

        {/* ========== 核心洞察 Tab ========== */}
        {activeTab === 'insights' && (
          <div>
            <h2 style={{ fontSize: '20px', fontWeight: '700', marginBottom: '24px', color: '#e2e8f0' }}>
              📌 Executive Summary · 四大研发信号
            </h2>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '20px', marginBottom: '32px' }}>
              {/* 信号1: 大杯是刚需 */}
              <div style={{ ...cardStyle, borderLeft: '4px solid #3B82F6' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
                  <span style={{ fontSize: '32px' }}>📐</span>
                  <div>
                    <h3 style={{ margin: 0, fontSize: '16px', color: '#3B82F6' }}>大杯是刚需</h3>
                    <p style={{ margin: '2px 0 0', fontSize: '11px', color: '#64748b' }}>Upsize is King</p>
                  </div>
                </div>
                <div style={{ background: 'rgba(59,130,246,0.1)', borderRadius: '8px', padding: '12px', marginBottom: '12px' }}>
                  <div style={{ fontSize: '28px', fontWeight: '700', color: '#3B82F6' }}>28.5%</div>
                  <div style={{ fontSize: '12px', color: '#94a3b8' }}>杯型修改率 · 客制化行为 TOP1</div>
                </div>
                <p style={{ fontSize: '13px', color: '#94a3b8', lineHeight: '1.6' }}>
                  <strong style={{ color: '#e2e8f0' }}>数据现象：</strong>杯型升级是所有客制化行为中频次最高的，绝大多数是 Regular→Large 升级。
                </p>
                <div style={{ marginTop: '12px', padding: '10px', background: 'rgba(59,130,246,0.05)', borderRadius: '6px', fontSize: '12px', color: '#60a5fa' }}>
                  💡 <strong>研发建议：</strong>考虑将热销款默认SOP定为Large，或新品优先测试大杯配比
                </div>
              </div>

              {/* 信号2: 生椰是基石 */}
              <div style={{ ...cardStyle, borderLeft: '4px solid #84CC16' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
                  <span style={{ fontSize: '32px' }}>🥥</span>
                  <div>
                    <h3 style={{ margin: 0, fontSize: '16px', color: '#84CC16' }}>生椰是基石，燕麦是替补</h3>
                    <p style={{ margin: '2px 0 0', fontSize: '11px', color: '#64748b' }}>Coconut Dominates, Oat Substitutes</p>
                  </div>
                </div>
                <div style={{ display: 'flex', gap: '12px', marginBottom: '12px' }}>
                  <div style={{ flex: 1, background: 'rgba(132,204,22,0.1)', borderRadius: '8px', padding: '12px', textAlign: 'center' }}>
                    <div style={{ fontSize: '24px', fontWeight: '700', color: '#84CC16' }}>4,250</div>
                    <div style={{ fontSize: '11px', color: '#94a3b8' }}>椰奶默认销量</div>
                  </div>
                  <div style={{ flex: 1, background: 'rgba(168,85,247,0.1)', borderRadius: '8px', padding: '12px', textAlign: 'center' }}>
                    <div style={{ fontSize: '24px', fontWeight: '700', color: '#A855F7' }}>1,820</div>
                    <div style={{ fontSize: '11px', color: '#94a3b8' }}>燕麦替换次数</div>
                  </div>
                </div>
                <p style={{ fontSize: '13px', color: '#94a3b8', lineHeight: '1.6' }}>
                  <strong style={{ color: '#e2e8f0' }}>数据现象：</strong>椰奶直接点生椰拿铁，燕麦奶是全脂产品的No.1替换选择。
                </p>
                <div style={{ marginTop: '12px', padding: '10px', background: 'rgba(132,204,22,0.05)', borderRadius: '6px', fontSize: '12px', color: '#a3e635' }}>
                  💡 <strong>研发建议：</strong>生椰系列需保供；非生椰类产品，燕麦奶是必须重点维护的二号位
                </div>
              </div>

              {/* 信号3: 少冰是痛点 */}
              <div style={{ ...cardStyle, borderLeft: '4px solid #06B6D4' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
                  <span style={{ fontSize: '32px' }}>🧊</span>
                  <div>
                    <h3 style={{ margin: 0, fontSize: '16px', color: '#06B6D4' }}>少冰是痛点</h3>
                    <p style={{ margin: '2px 0 0', fontSize: '11px', color: '#64748b' }}>Light Ice Sensitivity</p>
                  </div>
                </div>
                <div style={{ background: 'rgba(6,182,212,0.1)', borderRadius: '8px', padding: '12px', marginBottom: '12px' }}>
                  <div style={{ fontSize: '28px', fontWeight: '700', color: '#06B6D4' }}>87%</div>
                  <div style={{ fontSize: '12px', color: '#94a3b8' }}>冰度修改中"少冰"占比</div>
                </div>
                <p style={{ fontSize: '13px', color: '#94a3b8', lineHeight: '1.6' }}>
                  <strong style={{ color: '#e2e8f0' }}>数据现象：</strong>美国用户对"满杯冰块"接受度低于预期，Light Ice占据绝对主流。
                </p>
                <div style={{ marginTop: '12px', padding: '10px', background: 'rgba(6,182,212,0.05)', borderRadius: '6px', fontSize: '12px', color: '#22d3ee' }}>
                  💡 <strong>研发建议：</strong>制定"少冰液位标准"，可转化为"去冰补奶"增值卖点
                </div>
              </div>

              {/* 信号4: 加浓常态化 */}
              <div style={{ ...cardStyle, borderLeft: '4px solid #F59E0B' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
                  <span style={{ fontSize: '32px' }}>🔧</span>
                  <div>
                    <h3 style={{ margin: 0, fontSize: '16px', color: '#F59E0B' }}>加浓常态化</h3>
                    <p style={{ margin: '2px 0 0', fontSize: '11px', color: '#64748b' }}>Normalization of Extra Shot</p>
                  </div>
                </div>
                <div style={{ background: 'rgba(245,158,11,0.1)', borderRadius: '8px', padding: '12px', marginBottom: '12px' }}>
                  <div style={{ fontSize: '28px', fontWeight: '700', color: '#F59E0B' }}>25.7%</div>
                  <div style={{ fontSize: '12px', color: '#94a3b8' }}>订单包含 Espresso(3) 或 (4)</div>
                </div>
                <p style={{ fontSize: '13px', color: '#94a3b8', lineHeight: '1.6' }}>
                  <strong style={{ color: '#e2e8f0' }}>数据现象：</strong>萃取选项修改频次极高，大量订单升级到3-4 shots。
                </p>
                <div style={{ marginTop: '12px', padding: '10px', background: 'rgba(245,158,11,0.05)', borderRadius: '6px', fontSize: '12px', color: '#fbbf24' }}>
                  💡 <strong>研发建议：</strong>推出 Double Strength 双倍浓度官方系列，满足美国市场提神刚需
                </div>
              </div>
            </div>

            {/* KPI概览 */}
            <div style={{ ...cardStyle }}>
              <h3 style={{ margin: '0 0 20px', fontSize: '16px', color: '#e2e8f0' }}>📈 周度客制化趋势</h3>
              <ResponsiveContainer width="100%" height={280}>
                <ComposedChart data={DATA.weeklyTrend}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.08)" />
                  <XAxis dataKey="week" stroke="#64748b" fontSize={12} />
                  <YAxis yAxisId="left" stroke="#64748b" fontSize={12} />
                  <YAxis yAxisId="right" orientation="right" stroke="#64748b" fontSize={12} domain={[60, 75]} unit="%" />
                  <Tooltip content={<CustomTooltip />} />
                  <Legend />
                  <Bar yAxisId="left" dataKey="customized" name="定制订单" fill="#3B82F6" radius={[4, 4, 0, 0]} />
                  <Line yAxisId="right" type="monotone" dataKey="rate" name="定制率%" stroke="#F59E0B" strokeWidth={3} dot={{ fill: '#F59E0B', r: 5 }} />
                </ComposedChart>
              </ResponsiveContainer>
              <div style={{ marginTop: '16px', padding: '12px', background: 'rgba(245,158,11,0.1)', borderRadius: '8px', fontSize: '13px', color: '#fbbf24' }}>
                📊 客制化率持续攀升：从W43的64.3%增长至W48的71.8%，6周提升7.5个百分点
              </div>
            </div>
          </div>
        )}

        {/* ========== 行为热图 Tab ========== */}
        {activeTab === 'heatmap' && (
          <div>
            <h2 style={{ fontSize: '20px', fontWeight: '700', marginBottom: '24px', color: '#e2e8f0' }}>
              🔥 客制化行为热图 · Modification Heatmap
            </h2>

            <div style={{ ...cardStyle, marginBottom: '24px' }}>
              <h3 style={{ margin: '0 0 20px', fontSize: '16px', color: '#e2e8f0' }}>修改类型频次排行</h3>
              <ResponsiveContainer width="100%" height={400}>
                <BarChart data={DATA.modificationHeatmap} layout="vertical">
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.08)" />
                  <XAxis type="number" stroke="#64748b" fontSize={12} />
                  <YAxis type="category" dataKey="type" stroke="#64748b" fontSize={12} width={100} />
                  <Tooltip content={<CustomTooltip />} />
                  <Bar dataKey="count" name="修改次数" radius={[0, 4, 4, 0]}>
                    {DATA.modificationHeatmap.map((entry, index) => (
                      <Cell key={index} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '16px' }}>
              {DATA.modificationHeatmap.slice(0, 4).map((item, idx) => (
                <div key={idx} style={{ ...cardStyle, borderTop: `3px solid ${COLORS[idx]}` }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
                    <span style={{ fontSize: '28px' }}>{item.icon}</span>
                    <div>
                      <div style={{ fontSize: '15px', fontWeight: '600', color: '#e2e8f0' }}>{item.type}</div>
                      <div style={{ fontSize: '12px', color: '#64748b' }}>TOP {idx + 1}</div>
                    </div>
                    <div style={{ marginLeft: 'auto', fontSize: '24px', fontWeight: '700', color: COLORS[idx] }}>
                      {item.rate}%
                    </div>
                  </div>
                  <div style={{ fontSize: '12px', color: '#94a3b8', padding: '8px', background: 'rgba(255,255,255,0.03)', borderRadius: '6px' }}>
                    💡 {item.insight}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ========== 乳品战场 Tab ========== */}
        {activeTab === 'milk' && (
          <div>
            <h2 style={{ fontSize: '20px', fontWeight: '700', marginBottom: '24px', color: '#e2e8f0' }}>
              🥛 乳制品战场 · The Milk War
            </h2>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(450px, 1fr))', gap: '24px', marginBottom: '24px' }}>
              {/* 基底奶对比 */}
              <div style={cardStyle}>
                <h3 style={{ margin: '0 0 20px', fontSize: '16px', color: '#e2e8f0' }}>默认基底 vs 被替换频次</h3>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={DATA.milkWar.baseMilk}>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.08)" />
                    <XAxis dataKey="name" stroke="#64748b" fontSize={10} angle={-20} textAnchor="end" height={60} />
                    <YAxis stroke="#64748b" fontSize={12} />
                    <Tooltip content={<CustomTooltip />} />
                    <Legend />
                    <Bar dataKey="asDefault" name="默认基底销量" fill="#3B82F6" radius={[4, 4, 0, 0]} />
                    <Bar dataKey="asSwap" name="被替换次数" fill="#F59E0B" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
                <div style={{ marginTop: '12px', padding: '10px', background: 'rgba(168,85,247,0.1)', borderRadius: '6px', fontSize: '12px', color: '#c4b5fd' }}>
                  🔍 燕麦奶的"替换热度"远超其作为默认基底的销量，说明是用户主动选择的No.1替代品
                </div>
              </div>

              {/* 添加奶基排行 */}
              <div style={cardStyle}>
                <h3 style={{ margin: '0 0 20px', fontSize: '16px', color: '#e2e8f0' }}>Add-on 奶基热度榜</h3>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={DATA.milkWar.addMilk}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={100}
                      dataKey="count"
                      label={({ pct }) => `${pct}%`}
                    >
                      {DATA.milkWar.addMilk.map((entry, index) => (
                        <Cell key={index} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip content={<CustomTooltip />} />
                    <Legend formatter={(value) => <span style={{ color: '#94a3b8', fontSize: '11px' }}>{value}</span>} />
                  </PieChart>
                </ResponsiveContainer>
                <div style={{ marginTop: '12px', padding: '10px', background: 'rgba(244,63,94,0.1)', borderRadius: '6px', fontSize: '12px', color: '#fb7185' }}>
                  🥛 Velvet Milk 丝绒奶作为Add-on热度断层第一，用户在DIY"厚乳"口感
                </div>
              </div>
            </div>

            {/* 热门组合 */}
            <div style={cardStyle}>
              <h3 style={{ margin: '0 0 20px', fontSize: '16px', color: '#e2e8f0' }}>🔥 用户自发组合趋势</h3>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px' }}>
                {DATA.milkWar.combos.map((combo, idx) => (
                  <div key={idx} style={{
                    padding: '20px',
                    background: 'rgba(255,255,255,0.03)',
                    borderRadius: '12px',
                    textAlign: 'center',
                    border: '1px solid rgba(255,255,255,0.05)'
                  }}>
                    <div style={{ fontSize: '18px', fontWeight: '700', color: '#e2e8f0', marginBottom: '8px' }}>{combo.combo}</div>
                    <div style={{ fontSize: '28px', fontWeight: '700', color: COLORS[idx] }}>{combo.count.toLocaleString()}</div>
                    <div style={{ fontSize: '12px', color: '#10b981', marginTop: '4px' }}>{combo.trend}</div>
                  </div>
                ))}
              </div>
              <div style={{ marginTop: '20px', padding: '14px', background: 'linear-gradient(90deg, rgba(168,85,247,0.1), rgba(244,63,94,0.1))', borderRadius: '8px', fontSize: '13px', color: '#e2e8f0' }}>
                💡 <strong>研发建议：</strong>推出 "Oat Velvet Latte" 燕麦丝绒拿铁官方新品，将用户自发组合产品化
              </div>
            </div>
          </div>
        )}

        {/* ========== 风味趋势 Tab ========== */}
        {activeTab === 'flavor' && (
          <div>
            <h2 style={{ fontSize: '20px', fontWeight: '700', marginBottom: '24px', color: '#e2e8f0' }}>
              🍯 风味风向标 · Flavor Trends
            </h2>

            <div style={{ ...cardStyle, marginBottom: '24px' }}>
              <h3 style={{ margin: '0 0 20px', fontSize: '16px', color: '#e2e8f0' }}>糖浆使用排行榜</h3>
              <ResponsiveContainer width="100%" height={400}>
                <BarChart data={DATA.flavorTrends}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.08)" />
                  <XAxis dataKey="name" stroke="#64748b" fontSize={10} angle={-25} textAnchor="end" height={100} />
                  <YAxis stroke="#64748b" fontSize={12} />
                  <Tooltip content={<CustomTooltip />} />
                  <Bar dataKey="count" name="使用次数" radius={[4, 4, 0, 0]}>
                    {DATA.flavorTrends.map((entry, index) => (
                      <Cell key={index} fill={entry.color} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px' }}>
              {/* 风味资产分析 */}
              <div style={{ ...cardStyle, borderLeft: '4px solid #D97706' }}>
                <h3 style={{ margin: '0 0 16px', fontSize: '16px', color: '#D97706' }}>🏆 王者风味：太妃榛果</h3>
                <div style={{ fontSize: '36px', fontWeight: '700', color: '#D97706', marginBottom: '12px' }}>2,850</div>
                <p style={{ fontSize: '13px', color: '#94a3b8', lineHeight: '1.6' }}>
                  太妃榛果糖浆断层第一，不仅是糖浆，更是"风味资产"。具有强季节性和强风味偏好特征。
                </p>
                <div style={{ marginTop: '12px', padding: '10px', background: 'rgba(217,119,6,0.1)', borderRadius: '6px', fontSize: '12px', color: '#fbbf24' }}>
                  💡 可延展至 Cold Foam 冷云、Drizzle 淋酱等形态
                </div>
              </div>

              {/* 潜力风味 */}
              <div style={{ ...cardStyle, borderLeft: '4px solid #F59E0B' }}>
                <h3 style={{ margin: '0 0 16px', fontSize: '16px', color: '#F59E0B' }}>⭐ 潜力风味：焦糖布丁</h3>
                <div style={{ fontSize: '36px', fontWeight: '700', color: '#F59E0B', marginBottom: '12px' }}>1,580</div>
                <p style={{ fontSize: '13px', color: '#94a3b8', lineHeight: '1.6' }}>
                  Creme Brulee 焦糖布丁风味增长迅速，属于甜点系风味，与美国用户偏好匹配。
                </p>
                <div style={{ marginTop: '12px', padding: '10px', background: 'rgba(245,158,11,0.1)', borderRadius: '6px', fontSize: '12px', color: '#fbbf24' }}>
                  💡 建议开发焦糖布丁系列新品
                </div>
              </div>

              {/* 季节限定 */}
              <div style={{ ...cardStyle, borderLeft: '4px solid #F97316' }}>
                <h3 style={{ margin: '0 0 16px', fontSize: '16px', color: '#F97316' }}>🎃 季节爆款：南瓜+肉桂</h3>
                <div style={{ fontSize: '36px', fontWeight: '700', color: '#F97316', marginBottom: '12px' }}>2,330</div>
                <p style={{ fontSize: '13px', color: '#94a3b8', lineHeight: '1.6' }}>
                  南瓜+肉桂组合在秋冬季表现强劲，验证了季节限定策略的有效性。
                </p>
                <div style={{ marginTop: '12px', padding: '10px', background: 'rgba(249,115,22,0.1)', borderRadius: '6px', fontSize: '12px', color: '#fb923c' }}>
                  💡 持续深耕季节限定产品线
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ========== 健康矩阵 Tab ========== */}
        {activeTab === 'health' && (
          <div>
            <h2 style={{ fontSize: '20px', fontWeight: '700', marginBottom: '24px', color: '#e2e8f0' }}>
              📊 SOP健康度矩阵 · SPU Health Matrix
            </h2>

            <div style={{ ...cardStyle, marginBottom: '24px' }}>
              <h3 style={{ margin: '0 0 8px', fontSize: '16px', color: '#e2e8f0' }}>产品定位散点图</h3>
              <p style={{ margin: '0 0 20px', fontSize: '12px', color: '#64748b' }}>X轴: 销量 | Y轴: 客制化率 | 气泡大小: 销量</p>
              <ResponsiveContainer width="100%" height={400}>
                <ScatterChart>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.08)" />
                  <XAxis type="number" dataKey="sales" name="销量" stroke="#64748b" fontSize={12} />
                  <YAxis type="number" dataKey="customRate" name="客制化率" stroke="#64748b" fontSize={12} unit="%" domain={[0, 100]} />
                  <Tooltip content={<CustomTooltip />} />
                  <Scatter name="产品" data={DATA.spuHealth}>
                    {DATA.spuHealth.map((entry, index) => (
                      <Cell 
                        key={index} 
                        fill={
                          entry.status === 'excellent' ? '#10B981' :
                          entry.status === 'healthy' ? '#3B82F6' :
                          entry.status === 'warning' ? '#F59E0B' : '#EF4444'
                        }
                      />
                    ))}
                  </Scatter>
                </ScatterChart>
              </ResponsiveContainer>
              <div style={{ display: 'flex', gap: '20px', marginTop: '16px', flexWrap: 'wrap' }}>
                {[
                  { label: '优秀 <30%', color: '#10B981', desc: 'SOP成熟' },
                  { label: '健康 30-50%', color: '#3B82F6', desc: '配方成功' },
                  { label: '关注 50-70%', color: '#F59E0B', desc: '需优化' },
                  { label: '警报 >70%', color: '#EF4444', desc: '急需迭代' },
                ].map((item, idx) => (
                  <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: item.color }} />
                    <span style={{ fontSize: '12px', color: '#94a3b8' }}>{item.label} - {item.desc}</span>
                  </div>
                ))}
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '20px' }}>
              {/* 红榜 */}
              <div style={{ ...cardStyle, borderTop: '4px solid #EF4444' }}>
                <h3 style={{ margin: '0 0 16px', fontSize: '16px', color: '#EF4444' }}>🚨 红榜 High Alert · SOP需迭代</h3>
                {DATA.spuHealth.filter(p => p.status === 'alert').slice(0, 4).map((product, idx) => (
                  <div key={idx} style={{
                    display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                    padding: '12px', marginBottom: '8px',
                    background: 'rgba(239,68,68,0.1)', borderRadius: '8px'
                  }}>
                    <div>
                      <div style={{ fontSize: '13px', color: '#e2e8f0', fontWeight: '500' }}>{product.name}</div>
                      <div style={{ fontSize: '11px', color: '#64748b' }}>销量: {product.sales}</div>
                    </div>
                    <div style={{ fontSize: '20px', fontWeight: '700', color: '#EF4444' }}>{product.customRate}%</div>
                  </div>
                ))}
                <div style={{ marginTop: '12px', padding: '10px', background: 'rgba(239,68,68,0.05)', borderRadius: '6px', fontSize: '12px', color: '#fca5a5' }}>
                  ⚠️ 这些产品客制化率过高，说明标准SOP不受欢迎，急需配方迭代
                </div>
              </div>

              {/* 绿榜 */}
              <div style={{ ...cardStyle, borderTop: '4px solid #10B981' }}>
                <h3 style={{ margin: '0 0 16px', fontSize: '16px', color: '#10B981' }}>✅ 绿榜 Healthy · 配方成功</h3>
                {DATA.spuHealth.filter(p => p.status === 'healthy' || p.status === 'excellent').slice(0, 4).map((product, idx) => (
                  <div key={idx} style={{
                    display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                    padding: '12px', marginBottom: '8px',
                    background: 'rgba(16,185,129,0.1)', borderRadius: '8px'
                  }}>
                    <div>
                      <div style={{ fontSize: '13px', color: '#e2e8f0', fontWeight: '500' }}>{product.name}</div>
                      <div style={{ fontSize: '11px', color: '#64748b' }}>销量: {product.sales}</div>
                    </div>
                    <div style={{ fontSize: '20px', fontWeight: '700', color: '#10B981' }}>{product.defaultRate}%</div>
                  </div>
                ))}
                <div style={{ marginTop: '12px', padding: '10px', background: 'rgba(16,185,129,0.05)', borderRadius: '6px', fontSize: '12px', color: '#6ee7b7' }}>
                  ✨ 这些产品大部分用户直接下单默认款，说明配方成功，可作为标杆
                </div>
              </div>
            </div>
          </div>
        )}

      </main>

      {/* Footer */}
      <footer style={{
        borderTop: '1px solid rgba(255,255,255,0.05)',
        padding: '20px 32px',
        textAlign: 'center',
        color: '#475569',
        fontSize: '12px'
      }}>
        <p>北美瑞幸产品客制化分析 · 饮品研发数据洞察平台</p>
        <p style={{ marginTop: '4px' }}>© 2025 Luckin Coffee North America</p>
      </footer>
    </div>
  )
}

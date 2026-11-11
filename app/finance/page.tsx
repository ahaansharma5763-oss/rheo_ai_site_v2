'use client'

import { useState, useEffect } from 'react'

// ── Types ──────────────────────────────────────────────────────────────────

type TxType = 'income' | 'expense'

interface Transaction {
  id: string
  date: string
  description: string
  amount: number
  type: TxType
  category: string
  paymentMethod: string
}

// ── Constants ──────────────────────────────────────────────────────────────

const INCOME_CATS = [
  'Client Revenue',
  'Retainer',
  'Project Payment',
  'Consulting',
  'Other Income',
]

const EXPENSE_CATS = [
  'Cloud / Hosting',
  'Software / SaaS',
  'Marketing & Ads',
  'Domain / Web',
  'Freelancer Pay',
  'Transport',
  'Food & Meals',
  'Office Supplies',
  'Miscellaneous',
]

const PAYMENT_METHODS = ['Bank Transfer', 'UPI', 'Cash', 'Card']

// ── Brand colours ──────────────────────────────────────────────────────────

const C = {
  bg:       '#07101E',
  surface:  '#0D1A2E',
  border:   '#1A2E48',
  text:     '#EEE8E0',
  muted:    '#5A7080',
  gold:     '#C4A25A',
  green:    '#4ADE80',
  red:      '#F87171',
  blue:     '#60A5FA',
}

// ── Helpers ────────────────────────────────────────────────────────────────

function useLocalStorage<T>(key: string, init: T) {
  const [val, setVal] = useState<T>(init)

  useEffect(() => {
    try {
      const s = localStorage.getItem(key)
      if (s) setVal(JSON.parse(s))
    } catch {}
  }, [])

  const set = (v: T | ((p: T) => T)) => {
    setVal(prev => {
      const next = typeof v === 'function' ? (v as (p: T) => T)(prev) : v
      localStorage.setItem(key, JSON.stringify(next))
      return next
    })
  }

  return [val, set] as const
}

function fmt(n: number) {
  return '₹' + Math.abs(n).toLocaleString('en-IN', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })
}

function monthLabel(m: string) {
  const [y, mo] = m.split('-')
  const d = new Date(Number(y), Number(mo) - 1)
  return d.toLocaleString('en-IN', { month: 'short', year: 'numeric' })
}

// ── Sub-components ─────────────────────────────────────────────────────────

function StatCard({ label, value, color }: { label: string; value: number; color: string }) {
  return (
    <div style={{ background: C.surface, border: `1px solid ${C.border}`, borderRadius: 8, padding: '16px 20px' }}>
      <p style={{ margin: '0 0 6px', fontSize: 11, color: C.muted, textTransform: 'uppercase', letterSpacing: '0.08em' }}>
        {label}
      </p>
      <p style={{ margin: 0, fontSize: 22, fontWeight: 700, color, fontFamily: 'DM Sans, system-ui, sans-serif' }}>
        {value < 0 ? '−' : ''}{fmt(value)}
      </p>
    </div>
  )
}

function Row({ children, style }: { children: React.ReactNode; style?: React.CSSProperties }) {
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 0', borderBottom: `1px solid ${C.border}`, ...style }}>
      {children}
    </div>
  )
}

// ── Input styles ───────────────────────────────────────────────────────────

const inp: React.CSSProperties = {
  width: '100%',
  background: '#071018',
  border: `1px solid ${C.border}`,
  color: C.text,
  padding: '8px 12px',
  borderRadius: 6,
  fontSize: 13,
  fontFamily: 'DM Sans, system-ui, sans-serif',
  boxSizing: 'border-box',
  outline: 'none',
}

// ── Main Component ─────────────────────────────────────────────────────────

export default function FinancePage() {
  const [txns, setTxns] = useLocalStorage<Transaction[]>('rheo-finance-txns', [])
  const [tab, setTab] = useState<'txns' | 'pl' | 'bs'>('txns')
  const [showForm, setShowForm] = useState(false)
  const [filterMonth, setFilterMonth] = useState('')

  // Form
  const blank = {
    date: new Date().toISOString().split('T')[0],
    description: '',
    amount: '',
    type: 'income' as TxType,
    category: INCOME_CATS[0],
    paymentMethod: PAYMENT_METHODS[0],
  }
  const [form, setForm] = useState(blank)

  // Derived
  const months = [...new Set(txns.map(t => t.date.slice(0, 7)))].sort().reverse()

  const visible = filterMonth
    ? txns.filter(t => t.date.startsWith(filterMonth))
    : txns

  const income  = visible.filter(t => t.type === 'income').reduce((s, t) => s + t.amount, 0)
  const expense = visible.filter(t => t.type === 'expense').reduce((s, t) => s + t.amount, 0)
  const net     = income - expense

  // All-time cash (not filtered)
  const cash = txns.reduce((s, t) => s + (t.type === 'income' ? t.amount : -t.amount), 0)

  // Category breakdowns (filtered)
  const incomeBycat  = INCOME_CATS.map(c => ({ c, v: visible.filter(t => t.type === 'income' && t.category === c).reduce((s,t)=>s+t.amount,0) })).filter(x=>x.v>0)
  const expenseBycat = EXPENSE_CATS.map(c => ({ c, v: visible.filter(t => t.type === 'expense' && t.category === c).reduce((s,t)=>s+t.amount,0) })).filter(x=>x.v>0)

  function add() {
    if (!form.description.trim() || !form.amount) return
    const tx: Transaction = {
      id: Date.now().toString(),
      date: form.date,
      description: form.description.trim(),
      amount: parseFloat(form.amount),
      type: form.type,
      category: form.category,
      paymentMethod: form.paymentMethod,
    }
    setTxns(p => [tx, ...p])
    setForm(blank)
    setShowForm(false)
  }

  function del(id: string) {
    if (confirm('Delete this transaction?')) setTxns(p => p.filter(t => t.id !== id))
  }

  function setType(t: TxType) {
    setForm(f => ({ ...f, type: t, category: t === 'income' ? INCOME_CATS[0] : EXPENSE_CATS[0] }))
  }

  // ── Render ───────────────────────────────────────────────────────────────

  return (
    <div style={{ background: C.bg, minHeight: '100vh', color: C.text, fontFamily: 'DM Sans, system-ui, sans-serif', position: 'relative', zIndex: 10 }}>

      {/* ── Header ── */}
      <div style={{ borderBottom: `1px solid ${C.border}`, padding: '18px 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: C.surface }}>
        <div>
          <h1 style={{ fontSize: 16, fontWeight: 600, margin: 0, letterSpacing: '0.12em', textTransform: 'uppercase', fontFamily: 'DM Sans, system-ui', color: C.gold }}>
            Rheo Finance
          </h1>
          <p style={{ fontSize: 11, color: C.muted, margin: '3px 0 0', letterSpacing: '0.04em' }}>Business Financial Tracker</p>
        </div>
        <div style={{ textAlign: 'right' }}>
          <p style={{ fontSize: 11, color: C.muted, margin: '0 0 3px', letterSpacing: '0.04em', textTransform: 'uppercase' }}>Cash Position</p>
          <p style={{ fontSize: 22, fontWeight: 700, color: cash >= 0 ? C.green : C.red, margin: 0 }}>
            {cash < 0 ? '−' : ''}{fmt(cash)}
          </p>
        </div>
      </div>

      {/* ── Nav ── */}
      <div style={{ display: 'flex', borderBottom: `1px solid ${C.border}`, background: C.surface, padding: '0 24px' }}>
        {([['txns', 'Transactions'], ['pl', 'P&L Statement'], ['bs', 'Balance Sheet']] as const).map(([key, label]) => (
          <button key={key} onClick={() => setTab(key)} style={{
            padding: '12px 16px',
            background: 'none',
            border: 'none',
            borderBottom: tab === key ? `2px solid ${C.gold}` : '2px solid transparent',
            color: tab === key ? C.gold : C.muted,
            fontSize: 13,
            fontWeight: tab === key ? 500 : 400,
            cursor: 'pointer',
            marginBottom: -1,
            letterSpacing: '0.04em',
            fontFamily: 'DM Sans, system-ui',
          }}>
            {label}
          </button>
        ))}
      </div>

      {/* ── Content ── */}
      <div style={{ maxWidth: 760, margin: '0 auto', padding: '24px 24px' }}>

        {/* Stat cards */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 12, marginBottom: 20 }}>
          <StatCard label="Revenue" value={income} color={C.green} />
          <StatCard label="Expenses" value={expense} color={C.red} />
          <StatCard label="Net Profit" value={net} color={net >= 0 ? C.green : C.red} />
        </div>

        {/* Toolbar */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
          <select value={filterMonth} onChange={e => setFilterMonth(e.target.value)} style={{ ...inp, width: 'auto', padding: '7px 12px' }}>
            <option value=''>All time</option>
            {months.map(m => <option key={m} value={m}>{monthLabel(m)}</option>)}
          </select>
          {tab === 'txns' && (
            <button onClick={() => setShowForm(v => !v)} style={{
              background: showForm ? C.surface : C.gold,
              color: showForm ? C.muted : C.bg,
              border: `1px solid ${showForm ? C.border : C.gold}`,
              padding: '8px 18px',
              borderRadius: 6,
              fontSize: 13,
              fontWeight: 600,
              cursor: 'pointer',
              letterSpacing: '0.04em',
            }}>
              {showForm ? 'Cancel' : '+ Add Transaction'}
            </button>
          )}
        </div>

        {/* ── Add Form ── */}
        {showForm && tab === 'txns' && (
          <div style={{ background: C.surface, border: `1px solid ${C.border}`, borderRadius: 8, padding: 20, marginBottom: 20 }}>
            <p style={{ margin: '0 0 14px', fontSize: 12, color: C.gold, letterSpacing: '0.1em', textTransform: 'uppercase' }}>New Transaction</p>

            {/* Type toggle */}
            <div style={{ display: 'flex', gap: 8, marginBottom: 14 }}>
              {(['income', 'expense'] as const).map(t => (
                <button key={t} onClick={() => setType(t)} style={{
                  padding: '6px 20px',
                  borderRadius: 6,
                  border: 'none',
                  cursor: 'pointer',
                  fontSize: 13,
                  fontWeight: 500,
                  background: form.type === t ? (t === 'income' ? C.green : C.red) : C.border,
                  color: form.type === t ? C.bg : C.muted,
                  textTransform: 'capitalize',
                }}>
                  {t}
                </button>
              ))}
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
              <div>
                <label style={{ display: 'block', fontSize: 11, color: C.muted, marginBottom: 4, letterSpacing: '0.06em' }}>DATE</label>
                <input type="date" value={form.date} onChange={e => setForm(f => ({ ...f, date: e.target.value }))} style={inp} />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: 11, color: C.muted, marginBottom: 4, letterSpacing: '0.06em' }}>AMOUNT (₹)</label>
                <input
                  type="number"
                  placeholder="0.00"
                  value={form.amount}
                  onChange={e => setForm(f => ({ ...f, amount: e.target.value }))}
                  style={inp}
                  onKeyDown={e => e.key === 'Enter' && add()}
                />
              </div>
              <div style={{ gridColumn: 'span 2' }}>
                <label style={{ display: 'block', fontSize: 11, color: C.muted, marginBottom: 4, letterSpacing: '0.06em' }}>DESCRIPTION</label>
                <input
                  type="text"
                  placeholder="e.g. Hostinger renewal, Ascend Arena M1 payment"
                  value={form.description}
                  onChange={e => setForm(f => ({ ...f, description: e.target.value }))}
                  style={inp}
                  onKeyDown={e => e.key === 'Enter' && add()}
                  autoFocus
                />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: 11, color: C.muted, marginBottom: 4, letterSpacing: '0.06em' }}>CATEGORY</label>
                <select value={form.category} onChange={e => setForm(f => ({ ...f, category: e.target.value }))} style={inp}>
                  {(form.type === 'income' ? INCOME_CATS : EXPENSE_CATS).map(c => <option key={c}>{c}</option>)}
                </select>
              </div>
              <div>
                <label style={{ display: 'block', fontSize: 11, color: C.muted, marginBottom: 4, letterSpacing: '0.06em' }}>PAYMENT METHOD</label>
                <select value={form.paymentMethod} onChange={e => setForm(f => ({ ...f, paymentMethod: e.target.value }))} style={inp}>
                  {PAYMENT_METHODS.map(m => <option key={m}>{m}</option>)}
                </select>
              </div>
            </div>

            <button onClick={add} style={{
              marginTop: 16,
              background: C.gold,
              color: C.bg,
              border: 'none',
              padding: '9px 24px',
              borderRadius: 6,
              fontSize: 13,
              fontWeight: 700,
              cursor: 'pointer',
              letterSpacing: '0.06em',
            }}>
              SAVE
            </button>
          </div>
        )}

        {/* ── TRANSACTIONS TAB ── */}
        {tab === 'txns' && (
          <div>
            {visible.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '56px 0', color: C.muted }}>
                <p style={{ fontSize: 14 }}>No transactions{filterMonth ? ' in this period' : ' yet'}.</p>
                {!filterMonth && <p style={{ fontSize: 12, marginTop: 6 }}>Click &quot;+ Add Transaction&quot; to get started.</p>}
              </div>
            ) : (
              <div style={{ border: `1px solid ${C.border}`, borderRadius: 8, overflow: 'hidden' }}>
                {[...visible].sort((a, b) => b.date.localeCompare(a.date)).map((tx, i) => (
                  <div key={tx.id} style={{
                    background: i % 2 === 0 ? C.surface : C.bg,
                    padding: '11px 16px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    borderBottom: `1px solid ${C.border}`,
                  }}>
                    <div style={{ display: 'flex', gap: 12, alignItems: 'center', minWidth: 0 }}>
                      <div style={{ width: 7, height: 7, borderRadius: '50%', background: tx.type === 'income' ? C.green : C.red, flexShrink: 0 }} />
                      <div style={{ minWidth: 0 }}>
                        <p style={{ margin: 0, fontSize: 13, fontWeight: 500, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                          {tx.description}
                        </p>
                        <p style={{ margin: '2px 0 0', fontSize: 11, color: C.muted }}>
                          {tx.date} · {tx.category} · {tx.paymentMethod}
                        </p>
                      </div>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 14, flexShrink: 0, marginLeft: 12 }}>
                      <span style={{ fontSize: 14, fontWeight: 600, color: tx.type === 'income' ? C.green : C.red }}>
                        {tx.type === 'income' ? '+' : '−'}{fmt(tx.amount)}
                      </span>
                      <button onClick={() => del(tx.id)} style={{ background: 'none', border: 'none', color: C.muted, cursor: 'pointer', fontSize: 16, padding: '0 4px', lineHeight: 1 }}>
                        ×
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* ── P&L TAB ── */}
        {tab === 'pl' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>

            {/* Revenue */}
            <div style={{ background: C.surface, border: `1px solid ${C.border}`, borderRadius: 8, padding: 20 }}>
              <p style={{ margin: '0 0 12px', fontSize: 11, color: C.green, letterSpacing: '0.1em', textTransform: 'uppercase' }}>Revenue</p>
              {incomeBycat.length === 0
                ? <p style={{ color: C.muted, fontSize: 13 }}>No income recorded{filterMonth ? ' this period' : ''}.</p>
                : incomeBycat.map(x => (
                  <Row key={x.c}>
                    <span style={{ fontSize: 13, color: C.text }}>{x.c}</span>
                    <span style={{ fontSize: 13, color: C.green }}>{fmt(x.v)}</span>
                  </Row>
                ))
              }
              <div style={{ display: 'flex', justifyContent: 'space-between', paddingTop: 12, marginTop: 4 }}>
                <span style={{ fontSize: 13, fontWeight: 600 }}>Total Revenue</span>
                <span style={{ fontSize: 14, fontWeight: 700, color: C.green }}>{fmt(income)}</span>
              </div>
            </div>

            {/* Expenses */}
            <div style={{ background: C.surface, border: `1px solid ${C.border}`, borderRadius: 8, padding: 20 }}>
              <p style={{ margin: '0 0 12px', fontSize: 11, color: C.red, letterSpacing: '0.1em', textTransform: 'uppercase' }}>Expenses</p>
              {expenseBycat.length === 0
                ? <p style={{ color: C.muted, fontSize: 13 }}>No expenses recorded{filterMonth ? ' this period' : ''}.</p>
                : expenseBycat.map(x => (
                  <Row key={x.c}>
                    <span style={{ fontSize: 13, color: C.text }}>{x.c}</span>
                    <span style={{ fontSize: 13, color: C.red }}>{fmt(x.v)}</span>
                  </Row>
                ))
              }
              <div style={{ display: 'flex', justifyContent: 'space-between', paddingTop: 12, marginTop: 4 }}>
                <span style={{ fontSize: 13, fontWeight: 600 }}>Total Expenses</span>
                <span style={{ fontSize: 14, fontWeight: 700, color: C.red }}>{fmt(expense)}</span>
              </div>
            </div>

            {/* Net */}
            <div style={{
              background: net >= 0 ? 'rgba(74,222,128,0.07)' : 'rgba(248,113,113,0.07)',
              border: `1px solid ${net >= 0 ? 'rgba(74,222,128,0.2)' : 'rgba(248,113,113,0.2)'}`,
              borderRadius: 8,
              padding: '20px 24px',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}>
              <span style={{ fontSize: 15, fontWeight: 700, letterSpacing: '0.04em' }}>Net Profit / (Loss)</span>
              <span style={{ fontSize: 26, fontWeight: 800, color: net >= 0 ? C.green : C.red }}>
                {net < 0 ? '−' : ''}{fmt(net)}
              </span>
            </div>
          </div>
        )}

        {/* ── BALANCE SHEET TAB ── */}
        {tab === 'bs' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            <p style={{ fontSize: 11, color: C.muted, letterSpacing: '0.06em', margin: '0 0 4px' }}>
              As at: {filterMonth ? monthLabel(filterMonth) : 'all time'} — based on recorded transactions
            </p>

            {/* Assets */}
            <div style={{ background: C.surface, border: `1px solid ${C.border}`, borderRadius: 8, padding: 20 }}>
              <p style={{ margin: '0 0 12px', fontSize: 11, color: C.blue, letterSpacing: '0.1em', textTransform: 'uppercase' }}>Assets</p>
              <Row>
                <span style={{ fontSize: 13 }}>Cash &amp; Bank (running net)</span>
                <span style={{ fontSize: 13, color: cash >= 0 ? C.green : C.red }}>{cash < 0 ? '−' : ''}{fmt(cash)}</span>
              </Row>
              <div style={{ display: 'flex', justifyContent: 'space-between', paddingTop: 12, marginTop: 4 }}>
                <span style={{ fontSize: 13, fontWeight: 600 }}>Total Assets</span>
                <span style={{ fontSize: 14, fontWeight: 700 }}>{cash < 0 ? '−' : ''}{fmt(cash)}</span>
              </div>
            </div>

            {/* Equity */}
            <div style={{ background: C.surface, border: `1px solid ${C.border}`, borderRadius: 8, padding: 20 }}>
              <p style={{ margin: '0 0 12px', fontSize: 11, color: C.gold, letterSpacing: '0.1em', textTransform: 'uppercase' }}>Owner&apos;s Equity</p>
              <Row>
                <span style={{ fontSize: 13 }}>Retained Earnings (cumulative net profit)</span>
                <span style={{ fontSize: 13, color: cash >= 0 ? C.green : C.red }}>{cash < 0 ? '−' : ''}{fmt(cash)}</span>
              </Row>
              <div style={{ display: 'flex', justifyContent: 'space-between', paddingTop: 12, marginTop: 4 }}>
                <span style={{ fontSize: 13, fontWeight: 600 }}>Total Equity</span>
                <span style={{ fontSize: 14, fontWeight: 700 }}>{cash < 0 ? '−' : ''}{fmt(cash)}</span>
              </div>
            </div>

            {/* Balanced check */}
            <div style={{
              background: 'rgba(96,165,250,0.06)',
              border: '1px solid rgba(96,165,250,0.2)',
              borderRadius: 8,
              padding: '16px 20px',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}>
              <div>
                <p style={{ margin: 0, fontSize: 13, fontWeight: 600 }}>Assets = Liabilities + Equity</p>
                <p style={{ margin: '4px 0 0', fontSize: 11, color: C.muted }}>
                  No external liabilities recorded. Add liability tracking as your business scales.
                </p>
              </div>
              <span style={{ fontSize: 18, fontWeight: 700, color: C.blue }}>{cash < 0 ? '−' : ''}{fmt(cash)}</span>
            </div>
          </div>
        )}

      </div>
    </div>
  )
}

import { useState } from 'react'
import { supabaseAuth as supabase } from '../lib/supabase'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [remember, setRemember] = useState(true)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  async function handleLogin(e) {
    e.preventDefault()
    setLoading(true)
    setError('')
    const { error } = await supabase.auth.signInWithPassword({ email, password })
    if (error) {
      setError('Email o contraseña incorrectos')
      setLoading(false)
    } else {
      window.location.href = '/demo/'
    }
  }

  return (
    <>
      <style>{`
        * { box-sizing: border-box; margin: 0; padding: 0; }
        body { font-family: 'Manrope', sans-serif; }
        .login-page {
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          background: #F1F5F9;
        }
        .login-card {
          background: white;
          border-radius: 16px;
          box-shadow: 0 4px 24px rgba(0,0,0,0.08);
          padding: 40px 36px;
          width: 100%;
          max-width: 420px;
        }
        .login-logo {
          display: block;
          margin: 0 auto 16px;
          height: 56px;
          width: 56px;
          border-radius: 12px;
        }
        .login-title {
          text-align: center;
          font-size: 22px;
          font-weight: 700;
          color: #0F172A;
          margin-bottom: 4px;
        }
        .login-subtitle {
          text-align: center;
          font-size: 14px;
          color: #64748B;
          margin-bottom: 28px;
        }
        .login-label {
          display: block;
          font-size: 13px;
          font-weight: 600;
          color: #374151;
          margin-bottom: 6px;
        }
        .login-field {
          margin-bottom: 16px;
        }
        .login-input-wrap {
          position: relative;
        }
        .login-input {
          width: 100%;
          padding: 11px 14px;
          border: 1.5px solid #E2E8F0;
          border-radius: 8px;
          font-size: 15px;
          font-family: 'Manrope', sans-serif;
          color: #0F172A;
          outline: none;
          transition: border-color 0.15s;
          background: white;
        }
        .login-input:focus {
          border-color: #16255C;
        }
        .login-input.has-toggle {
          padding-right: 44px;
        }
        .toggle-pw {
          position: absolute;
          right: 12px;
          top: 50%;
          transform: translateY(-50%);
          background: none;
          border: none;
          cursor: pointer;
          color: #94A3B8;
          padding: 0;
          display: flex;
          align-items: center;
        }
        .login-btn {
          width: 100%;
          padding: 13px;
          background: #16255C;
          color: white;
          border: none;
          border-radius: 8px;
          font-size: 15px;
          font-weight: 600;
          font-family: 'Manrope', sans-serif;
          cursor: pointer;
          margin-top: 8px;
          transition: opacity 0.15s;
        }
        .login-btn:hover { opacity: 0.9; }
        .login-btn:disabled { opacity: 0.6; cursor: not-allowed; }
        .login-remember {
          display: flex;
          align-items: center;
          gap: 8px;
          margin-top: 14px;
          font-size: 13px;
          color: #475569;
          cursor: pointer;
        }
        .login-remember input[type="checkbox"] {
          accent-color: #16255C;
          width: 15px;
          height: 15px;
          cursor: pointer;
        }
        .login-error {
          background: #FEF2F2;
          border: 1px solid #FECACA;
          color: #DC2626;
          border-radius: 8px;
          padding: 10px 14px;
          font-size: 13px;
          margin-bottom: 16px;
        }
      `}</style>

      <div className="login-page">
        <div className="login-card">
          <img src="/assets/logo.png" alt="StockDrive" width={56} height={56} className="login-logo" />
          <h1 className="login-title">StockDrive</h1>
          <p className="login-subtitle">Bienvenido de nuevo</p>

          {error && <div className="login-error">{error}</div>}

          <form onSubmit={handleLogin}>
            <div className="login-field">
              <label className="login-label">Email</label>
              <div className="login-input-wrap">
                <input
                  className="login-input"
                  type="email"
                  placeholder="tu@email.com"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  required
                  autoComplete="email"
                />
              </div>
            </div>

            <div className="login-field">
              <label className="login-label">Contraseña</label>
              <div className="login-input-wrap">
                <input
                  className={`login-input has-toggle`}
                  type={showPassword ? 'text' : 'password'}
                  placeholder="••••••••"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  required
                  autoComplete="current-password"
                />
                <button
                  type="button"
                  className="toggle-pw"
                  onClick={() => setShowPassword(!showPassword)}
                  tabIndex={-1}
                >
                  {showPassword ? (
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94"/><path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19"/><line x1="1" y1="1" x2="23" y2="23"/></svg>
                  ) : (
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
                  )}
                </button>
              </div>
            </div>

            <button className="login-btn" type="submit" disabled={loading}>
              {loading ? 'Entrando...' : 'Iniciar sesión'}
            </button>

            <label className="login-remember">
              <input
                type="checkbox"
                checked={remember}
                onChange={e => setRemember(e.target.checked)}
              />
              Recordar sesión
            </label>
          </form>
        </div>
      </div>
    </>
  )
}

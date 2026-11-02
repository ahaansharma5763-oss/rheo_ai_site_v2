export default function NotFound() {
  return (
    <main style={{ minHeight: '100svh', display: 'grid', placeContent: 'center', gap: 16, padding: 24, textAlign: 'center' }}>
      <h1 style={{ margin: 0, fontSize: 32, fontWeight: 600, letterSpacing: '-0.02em' }}>This page has moved.</h1>
      <p style={{ margin: 0, color: '#C6BCA3' }}>Everything we do is one click away.</p>
      <p style={{ margin: 0 }}><a href="/" style={{ color: '#8FDCF8' }}>Go to the home page</a></p>
    </main>
  )
}

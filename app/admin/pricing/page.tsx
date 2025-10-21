export const dynamic = "force-static"; // simplest for debugging

export default function AdminPricingTest() {
  return (
    <main style={{maxWidth: 720, margin: "40px auto", padding: 20}}>
      <h1 style={{fontSize: 28, fontWeight: 800}}>Admin Pricing (test)</h1>
      <p style={{marginTop: 12}}>
        If you can see this, the <code>/admin/pricing</code> route is deployed.
      </p>
    </main>
  );
}

export default function AdminPricing(){return (<div className='p-6'>Admin pricing editor placeholder</div>);}
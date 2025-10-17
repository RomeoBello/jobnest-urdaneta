'use client'
export default function Logo({ className='w-16 h-16' }: { className?: string }) {
  return (
    <div className={`relative ${className}`}>
      <img src="/logo-jobnest-urdaneta.png" alt="JobNest Urdaneta City Logo"
        className="w-full h-full object-contain drop-shadow"
        onError={(e)=>{ const img=e.currentTarget as HTMLImageElement; img.style.display='none'; (img.nextElementSibling as HTMLElement)?.style.setProperty('display','flex'); }} />
      <div className="hidden items-center justify-center rounded-full border-2 text-brandGold" style={{borderColor:'#D9A441'}}>
        <div className="text-center p-2">
          <div className="text-[10px] tracking-[0.2em]">JOBNEST</div>
          <div className="mx-auto my-1 w-9 h-9 bg-brandNavy rounded-full" />
          <div className="text-[9px] tracking-[0.12em]">URDANETA CITY</div>
        </div>
      </div>
    </div>
  )
}

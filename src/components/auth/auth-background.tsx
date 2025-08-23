interface AuthBackgroundProps {
  children: React.ReactNode
}

export function AuthBackground({ children }: AuthBackgroundProps) {
  return (
    <div className='bg-gradient-cosmic flex min-h-screen items-center justify-center p-4'>
      {/* Background Stars Animation */}
      <div className='pointer-events-none fixed inset-0 overflow-hidden'>
        <div className='animate-twinkle absolute top-1/4 left-1/4 h-2 w-2 rounded-full bg-white' />
        <div
          className='bg-space-gold animate-twinkle absolute top-1/3 right-1/4 h-1 w-1 rounded-full'
          style={{ animationDelay: '1s' }}
        />
        <div
          className='animate-twinkle absolute bottom-1/4 left-1/3 h-1.5 w-1.5 rounded-full bg-white'
          style={{ animationDelay: '2s' }}
        />
        <div
          className='bg-space-gold animate-twinkle absolute top-1/2 right-1/3 h-1 w-1 rounded-full'
          style={{ animationDelay: '0.5s' }}
        />
        <div
          className='animate-twinkle absolute right-1/5 bottom-1/3 h-2 w-2 rounded-full bg-white'
          style={{ animationDelay: '1.5s' }}
        />
        <div
          className='bg-space-gold animate-twinkle absolute top-3/4 left-1/5 h-1 w-1 rounded-full'
          style={{ animationDelay: '2.5s' }}
        />
        <div
          className='animate-twinkle absolute top-1/6 right-1/2 h-1.5 w-1.5 rounded-full bg-white'
          style={{ animationDelay: '3s' }}
        />
      </div>

      {children}
    </div>
  )
}

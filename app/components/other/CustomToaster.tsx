import { useTheme } from 'next-themes'
import { Toaster as SonnerToaster } from 'sonner'

export function Toaster() {
  const { theme } = useTheme()

  return <SonnerToaster richColors position='top-center' theme={theme as any} />
}

const inlineCode = () => {
  enum Theme {
    DARK = 'dark',
    LIGHT = 'light',
    SYSTEM = 'system',
  }

  // Setting initial theme
  const html = document.documentElement.classList
  const localTheme = localStorage.getItem('theme')

  if (
    !localTheme ||
    !Object.values(Theme).includes(localTheme as Theme) ||
    localTheme === Theme.SYSTEM
  ) {
    html.add(Theme.SYSTEM)
    window.matchMedia('(prefers-color-scheme: dark)').matches && html.add(Theme.DARK)
  } else {
    html.add(localTheme)
  }

  // Handle system theme change
  const handleSchemeChange = (e: MediaQueryListEvent) => {
    const html = document.documentElement.classList
    if (!html.contains(Theme.SYSTEM)) return

    const newTheme = e.matches ? Theme.DARK : Theme.LIGHT

    html.remove(Theme.DARK, Theme.LIGHT)
    html.add(newTheme)
  }

  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', handleSchemeChange)
}

export const getClientTheme = `(${inlineCode})();`

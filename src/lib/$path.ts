export const pagesPath = {
  "$404": {
    $url: (url?: { hash?: string }) => ({ pathname: '/404' as const, hash: url?.hash })
  },
  _path: (path: string | number) => ({
    $url: (url?: { hash?: string }) => ({ pathname: '/[path]' as const, query: { path }, hash: url?.hash })
  }),
  "learning_path": {
    "courses": {
      _course_id: (course_id: string | number) => ({
        $url: (url?: { hash?: string }) => ({ pathname: '/learning-path/courses/[course_id]' as const, query: { course_id }, hash: url?.hash })
      })
    },
    "paths": {
      _path_id: (path_id: string | number) => ({
        $url: (url?: { hash?: string }) => ({ pathname: '/learning-path/paths/[path_id]' as const, query: { path_id }, hash: url?.hash })
      })
    },
    "steps": {
      _step_id: (step_id: string | number) => ({
        $url: (url?: { hash?: string }) => ({ pathname: '/learning-path/steps/[step_id]' as const, query: { step_id }, hash: url?.hash })
      })
    },
    $url: (url?: { hash?: string }) => ({ pathname: '/learning-path' as const, hash: url?.hash })
  },
  "login": {
    $url: (url?: { hash?: string }) => ({ pathname: '/login' as const, hash: url?.hash })
  },
  "playground": {
    $url: (url?: { hash?: string }) => ({ pathname: '/playground' as const, hash: url?.hash })
  },
  "profile": {
    $url: (url?: { hash?: string }) => ({ pathname: '/profile' as const, hash: url?.hash })
  },
  "signup": {
    $url: (url?: { hash?: string }) => ({ pathname: '/signup' as const, hash: url?.hash })
  },
  $url: (url?: { hash?: string }) => ({ pathname: '/' as const, hash: url?.hash })
}

export type PagesPath = typeof pagesPath

export const staticPath = {
  favicon_ico: '/favicon.ico',
  favicons: {
    android_chrome_192x192_png: '/favicons/android-chrome-192x192.png',
    android_chrome_384x384_png: '/favicons/android-chrome-384x384.png',
    apple_touch_icon_png: '/favicons/apple-touch-icon.png',
    browserconfig_xml: '/favicons/browserconfig.xml',
    favicon_16x16_png: '/favicons/favicon-16x16.png',
    favicon_32x32_png: '/favicons/favicon-32x32.png',
    favicon_ico: '/favicons/favicon.ico',
    mstile_150x150_png: '/favicons/mstile-150x150.png',
    safari_pinned_tab_svg: '/favicons/safari-pinned-tab.svg',
    site_webmanifest: '/favicons/site.webmanifest'
  },
  icons: {
    box_multiple_svg: '/icons/box-multiple.svg',
    list_svg: '/icons/list.svg'
  },
  img: {
    logo: {
      logo_png: '/img/logo/logo.png',
      logo_caption_png: '/img/logo/logo_caption.png',
      logo_caption_gray_png: '/img/logo/logo_caption_gray.png',
      logo_gray_png: '/img/logo/logo_gray.png'
    }
  },
  vercel_svg: '/vercel.svg'
} as const

export type StaticPath = typeof staticPath

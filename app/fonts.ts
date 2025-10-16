import localFont from 'next/font/local'

export const cooperBT = localFont({
  src: [
    {
      path: '../public/fonts/CooperBT-Medium.woff2',
      weight: '500',
      style: 'normal',
    }
  ],
  variable: '--font-cooper-bt'
})

export const geist = localFont({
  src: [
    {
      path: '../public/fonts/Geist-Regular.woff2',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../public/fonts/Geist-Medium.woff2',
      weight: '500',
      style: 'normal',
    },
    {
      path: '../public/fonts/Geist-SemiBold.woff2',
      weight: '600',
      style: 'normal',
    }
  ],
  variable: '--font-geist'
})
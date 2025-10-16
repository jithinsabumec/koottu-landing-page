import localFont from 'next/font/local'

export const cooper = localFont({
  src: [
    {
      path: './fonts/CooperLtBTLight.woff2',
      weight: '300',
      style: 'normal',
    },
    {
      path: './fonts/CooperLtBTLightItalic.woff2',
      weight: '300',
      style: 'italic',
    },
    {
      path: './fonts/cooper-bt-medium.woff2',
      weight: '500',
      style: 'normal',
    },
    {
      path: './fonts/CooperLtBTBold.woff2',
      weight: '700',
      style: 'normal',
    }
  ],
  variable: '--font-cooper',
  display: 'swap',
  preload: true,
})

export const geist = localFont({
  src: './fonts/Geist-VariableFont_wght.woff2',
  variable: '--font-geist',
  fallback: ['system-ui', 'arial'],
  display: 'swap',
  preload: true,
  weight: '100 900', // Specify the weight range supported by the variable font
})
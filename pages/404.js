import DefaultErrorPage from 'next/error'

export default function Error() {
  return (
    <DefaultErrorPage statusCode={404} />
  )
}
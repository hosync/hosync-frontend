import { NextPage } from 'next'

// TODO: Fix this
// type Props = {
//   searchParams: {
//     error: string
//     email: string
//   }
// }

const ErrorPage: NextPage<any> = async ({ searchParams }) => {
  const { error = '', email = '' } = await searchParams
  console.log('EMAIL====>', email)
  return (
    <div>
      Error Page {error} {email}
    </div>
  )
}

export default ErrorPage

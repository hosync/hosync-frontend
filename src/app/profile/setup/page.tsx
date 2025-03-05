import { NextPage } from 'next'

import * as UserActions from '@/actions/auth/user'
import { ProfileSetupFormWrapper } from '@/components/form/profile-setup/form-wrapper'
import { Header } from '@/components/layout/header'
import { NotFound } from '@/components/ui/not-found'
import * as cookies from '@/lib/utils/cookies'

// type Props = {
//   searchParams: {
//     code: string
//   }
// }

const Page: NextPage<any> = async ({ searchParams }) => {
  const { code } = await searchParams

  const loggedFromProfileSetup = await cookies.get(
    'loggedFromProfileSetup',
    false
  )

  const user = await UserActions.getUserByCode(code)

  if (!user || (user.active && !loggedFromProfileSetup)) {
    return <NotFound />
  }

  return (
    <>
      <Header page="profile" />
      <ProfileSetupFormWrapper user={user} />
    </>
  )
}

export default Page

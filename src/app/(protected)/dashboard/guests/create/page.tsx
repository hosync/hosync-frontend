import { NextPage } from 'next'

import * as UserActions from '@/actions/auth/user'
import CreateGuestForm from '@/app/(protected)/dashboard/components/Guests/Form'
import * as cookies from '@/lib/utils/cookies'

const GuestsCreatePage: NextPage = async () => {
  const connectedUser = await UserActions.getConnectedUser(
    await cookies.get('at')
  )

  return (
    <div className="min-h-screen flex bg-gray-100 dark:bg-gray-900 flex-col">
      <CreateGuestForm
        action="save"
        data={{
          businessSlug: connectedUser.businessSlug,
          businessId: connectedUser.businessId
        }}
      />
    </div>
  )
}

export default GuestsCreatePage

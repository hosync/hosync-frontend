import { NextPage } from 'next'

// import * as cookies from '@/lib/utils/cookies'

// import * as SettingActions from '@/actions/setting'
// import * as UserActions from '@/actions/user'

import Settings from './components/Settings'

const SettingsPage: NextPage = async () => {
  // TODO: Fix this page
  // const connectedUser = await UserActions.getConnectedUser(await cookies.get('at'))

  // const settings = await SettingActions.getBy(connectedUser.id)
  // console.log('SETTINGS ====>', settings)
  return (
    <div className="min-h-screen flex bg-gray-100 dark:bg-gray-900 flex-col">
      <Settings />
    </div>
  )
}

export default SettingsPage

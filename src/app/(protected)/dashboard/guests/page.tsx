import { NextPage } from 'next'

// import * as GuestActions from '@/actions/guest'

// import Results from './Results'

const GuestsPage: NextPage = async () => {
  // const { checksum, items: guests, connectedUser } = await GuestActions.getAll()
  // TODO: Fix this page
  return (
    <div className="min-h-screen flex bg-gray-100 dark:bg-gray-900 flex-col">
      {/* <Results
        data={{ checksum, data: guests }}
        connectedUser={connectedUser}
        refetch={GuestActions.getAll}
        deleteServerAction={GuestActions.del}
      /> */}
    </div>
  )
}

export default GuestsPage

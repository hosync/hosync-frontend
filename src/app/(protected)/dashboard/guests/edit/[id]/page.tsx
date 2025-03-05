// @ts-nocheck
// import { NextPage } from 'next'

// import { redirect } from 'next/navigation'

// import EditGuestForm from '@/app/(protected)/dashboard/components/Guests/Form'
// import * as cookies from '@/lib/utils/cookies'
// import core from '@/lib/utils/core'

// import * as GuestActions from '@/actions/guest'
// import * as UserActions from '@/actions/user'

// type Props = {
//   params: {
//     id: string
//   }
// }

const GuestEditPage: any = async ({ params: { id = null } }) => {
  // const formData = core.formData.set(new FormData(), { id })
  // const response = await GuestActions.getOne(formData)
  // const connectedUser = await UserActions.getConnectedUser(
  //   await cookies.get('at')
  // )
  console.log('id:', id)
  return <h1>Fix this page</h1>

  // if (response.ok && response.data.items) {
  //   const [guest] = response.data.items

  //   return (
  //     <div className="min-h-screen flex bg-gray-100 dark:bg-gray-900 flex-col">
  //       <EditGuestForm
  //         action="edit"
  //         data={{ ...guest, businessId: connectedUser.businessId }}
  //       />
  //     </div>
  //   )
  // } else {
  //   redirect('/404')
  // }
}

export default GuestEditPage

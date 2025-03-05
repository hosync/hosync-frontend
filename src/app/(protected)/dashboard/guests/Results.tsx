'use client'

import { FC, useState } from 'react'

import GuestForm from '@/app/(protected)/dashboard/components/Guests/Form'
import ResultsTable from '@/app/(protected)/dashboard/components/ResultsTable'
import { SVG } from '@/components/svg'
import core from '@/lib/utils/core'
import files from '@/lib/utils/files'

type Props = {
  data: any
  refetch: any
  connectedUser: any
  deleteServerAction: any
}

const viewLink = (id: string) => `/dashboard/guests/profile/${id}`

const Results: FC<Props> = ({
  data: { checksum, data: rawData = [] },
  refetch,
  deleteServerAction,
  connectedUser
}) => {
  // Initial states
  const [key, setKey] = useState<string>(checksum)
  const [parentData, setParentData] = useState(rawData)
  const [isEditModalOpen, setIsEditModalOpen] = useState<boolean>(false)
  const [itemToEdit, setItemToEdit] = useState({})
  const [fileStatus, setFileStatus] = useState<any>([])

  // Methods
  const handleDelete = async (id: string) => {
    const formData = core.formData.set(new FormData(), {
      id
    })

    const response = await deleteServerAction(formData)

    if (response.ok) {
      const filteredData = parentData.filter((item: any) => item.id !== id)

      setKey(Math.random().toString())
      setParentData(filteredData)
    }
  }

  const handleEdit = (item: any) => {
    setIsEditModalOpen(true)
    setItemToEdit(item)
    setFileStatus(item.photo ? [{ url: item.photo, action: 'show' }] : [])
  }

  const onCloseModal = async () => {
    await files.deleteFilesFromServer(fileStatus, files.deleteFile)
    setFileStatus([])
    setIsEditModalOpen(false)
  }

  const renderRow = (item: any) => [
    <a key={`name-${item.id}`} href={viewLink(item.id)}>
      {item.fullName}
    </a>,
    item.email,
    item.phone,
    item.website,
    item.gender,
    item.birthday,
    <div className="flex" key={`Actions-${item.id}`}>
      <a key={`edit-${item.id}`} onClick={() => handleEdit(item)}>
        <SVG.Edit color="#333" />
      </a>{' '}
      <a
        key={`delete-${item.id}`}
        href="#"
        onClick={() => handleDelete(item.id)}
      >
        <SVG.Trash color="#333" />
      </a>
    </div>
  ]

  return (
    <div className="min-h-screen flex bg-gray-100 dark:bg-gray-900 flex-col">
      <ResultsTable
        label="Guests"
        createModalTitle="Add New Guest"
        editModalTitle="Edit Guest"
        headers={[
          'Full Name',
          'Email',
          'Phone',
          'Website',
          'Gender',
          'Birthday',
          'Actions'
        ]}
        data={{ checksum: key, data: parentData }}
        setParentData={setParentData}
        refetch={refetch}
        renderRow={renderRow}
        CreateFormComponent={
          <GuestForm
            action="save"
            data={{
              businessSlug: connectedUser.businessSlug,
              businessId: connectedUser?.businessId
            }}
          />
        }
        EditFormComponent={
          <GuestForm
            action="edit"
            data={{
              businessSlug: connectedUser.businessSlug,
              businessId: connectedUser?.businessId,
              ...itemToEdit
            }}
          />
        }
        isEditModalOpen={isEditModalOpen}
        onCloseModal={onCloseModal}
      />
    </div>
  )
}

export default Results

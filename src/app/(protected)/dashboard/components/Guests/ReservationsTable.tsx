'use client'

import { FC } from 'react'

import Table from '@/components/ui/table'

// import { ReservationFields } from '~/server/db/schemas/reservation'

type Props = {
  reservations: any[]
}

const ReservationsTable: FC<Props> = ({ reservations }) => {
  const headers = [
    'Photo',
    'Name',
    'Paid',
    'Pending',
    'Total',
    'Discount',
    'Booking date',
    'Check out date'
  ]

  const rows = reservations.map((reservation) => [
    <img
      key={'property.photo'}
      src={
        'https://images.pexels.com/photos/803975/pexels-photo-803975.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
      }
      alt={'property.name'}
      className="rounded-lg max-w-[196px]"
    />,
    'property.name',
    reservation.paidAmount,
    reservation.pendingAmount,
    reservation.totalAmount,
    reservation.discount,
    reservation.startDate,
    reservation.endDate
  ])

  return <Table headers={headers} rows={rows} label="Reservation history" />
}

export default ReservationsTable

'use client'

import React, { FC, useState } from 'react'

// import * as UserActions from '@/actions/user'
import { RenderBlockIf } from '@/components/helpers/render-block-if'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Notification } from '@/components/ui/notification'
import core from '@/lib/utils/core'
import is from '@/lib/utils/is'

type Props = {
  action: 'save' | 'edit'
  data?: any
}
const dateRegex = /^.*[0-1]{1}[0-9]{1}[\/]{1}[0-3]{1}[0-9]{1}[\/]{1}[0-9]{4}/

const Form: FC<Props> = ({
  data: {
    id = '',
    tier = '',
    role = '',
    email = '',
    password = '',
    fullName = '',
    phone = '',
    avatar = '',
    birthday = '',
    website = '',
    active = ''
  },
  action = 'save'
}) => {
  const initialValues = {
    id,
    tier,
    role,
    email,
    password,
    fullName,
    phone,
    avatar,
    birthday,
    website,
    active
  }

  const [showNotification, setShowNotification] = useState(false)

  const [errors, setErrors] = useState({
    tier: '',
    role: '',
    fullName: '',
    email: '',
    password: '',
    phone: '',
    avatar: '',
    birthday: '',
    website: ''
  })

  const validations = {
    tier: (value: string) => {
      if (!value) {
        return 'Please enter a tier'
      }

      if (value.length < 2) {
        return 'Please enter a valid tier'
      }

      return ''
    },
    role: (value: string) => {
      if (!value) {
        return 'Please enter a role'
      }

      if (value.length < 2) {
        return 'Please enter a valid role'
      }

      return ''
    },
    fullName: (value: string) => {
      if (!value) {
        return 'Please enter a fullname'
      }

      if (value.length < 2) {
        return 'Please enter a valid fullname'
      }
      return ''
    },
    email: (value: string) => {
      if (action === 'save' && !value) {
        return 'Please enter a email'
      }
      if (action === 'save' && !is(value).email()) {
        return 'Please enter a valid email'
      }
      return ''
    },
    phone: (value: string) => {
      if (!value) {
        return 'Please enter a phone number'
      }
      if (!is(value).phone()) {
        return 'Please enter a valid phone number'
      }
      return ''
    },
    avatar: (value: string) => {
      if (value && !is(value).url()) {
        return 'Please enter a valid avatar'
      }
      return ''
    },
    birthday: (value: string) => {
      if (value && !value.match(dateRegex)) {
        return 'Please enter a valid birthday'
      }
      return ''
    },
    website: (value: string) => {
      if (value && !is(value).url()) {
        return 'Please enter a valid website'
      }
      return ''
    }
  }

  const validate = (values: any) => {
    const newErrors = {
      ...errors,
      tier: validations.tier(values.tier),
      role: validations.role(values.role),
      fullName: validations.fullName(values.fullName),
      email: validations.email(values.email),
      phone: validations.phone(values.phone),
      avatar: validations.avatar(values.avatar),
      birthday: validations.birthday(values.birthday),
      website: validations.website(values.website)
    }
    setErrors(newErrors)
    return (
      !newErrors.avatar &&
      !newErrors.role &&
      !newErrors.fullName &&
      !newErrors.email &&
      !newErrors.phone &&
      !newErrors.avatar &&
      !newErrors.birthday &&
      !newErrors.website
    )
  }
  const handleSubmit = async (e: any) => {
    e.preventDefault()
    const formData = new FormData(e.target)
    const values = core.formData.get(formData)
    const isValidForm = validate(values)

    if (isValidForm) {
      // const response =
      //   action === 'save'
      //     ? await UserActions.create(formData)
      //     : await UserActions.update(formData)

      // TODO: Fix this
      const response = { status: 200 }

      if (response.status === 200) {
        setShowNotification(true)
      }
    }
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <RenderBlockIf isTrue={showNotification}>
          <Notification
            message={
              action == 'save'
                ? 'User saved successfully'
                : 'User edited successfully'
            }
            type="success"
          />
        </RenderBlockIf>

        <RenderBlockIf isTrue={action === 'edit'}>
          <input type="hidden" name="id" value={initialValues.id} />
        </RenderBlockIf>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <Input
              value={fullName}
              label="Full name"
              name="fullName"
              className={
                errors.fullName ? 'border-red-500 dark:border-red-500' : ''
              }
              required
            />
            <p className="text-red-500 mb-4 text-xs ml-4 break-words">
              {errors.fullName}
            </p>
          </div>
          <div>
            <Input
              value={tier}
              label="Tier"
              name="tier"
              className={
                errors.tier ? 'border-red-500 dark:border-red-500' : ''
              }
              required
            />
            <p className="text-red-500 mb-4 text-xs ml-4 break-words">
              {errors.tier}
            </p>
          </div>
          <div>
            <Input
              value={role}
              label="Role"
              name="role"
              className={
                errors.role ? 'border-red-500 dark:border-red-500' : ''
              }
              required
            />
            <p className="text-red-500 mb-4 text-xs ml-4 break-words">
              {errors.role}
            </p>
          </div>
          <div>
            <Input
              value={phone}
              label="Phone"
              name="phone"
              placeholder="+525534567890"
              className={
                errors.role ? 'border-red-500 dark:border-red-500' : ''
              }
            />
            <p className="text-red-500 mb-4 text-xs ml-4 break-words">
              {errors.phone}
            </p>
          </div>
          <div>
            <Input
              value={avatar}
              label="Avatar"
              name="avatar"
              placeholder="https://"
              className={
                errors.avatar ? 'border-red-500 dark:border-red-500' : ''
              }
            />
            <p className="text-red-500 mb-4 text-xs ml-4 break-words">
              {errors.avatar}
            </p>
          </div>
          <div>
            <Input
              value={birthday}
              label="Birthday"
              name="birthday"
              placeholder="MM/DD/YYYY"
              className={
                errors.birthday ? 'border-red-500 dark:border-red-500' : ''
              }
            />
            <p className="text-red-500 mb-4 text-xs ml-4 break-words">
              {errors.birthday}
            </p>
          </div>
          <div>
            <Input
              value={website}
              label="Website"
              name="website"
              placeholder="https://"
              className={
                errors.website ? 'border-red-500 dark:border-red-500' : ''
              }
            />
            <p className="text-red-500 mb-4 text-xs ml-4 break-words">
              {errors.website}
            </p>
          </div>
          <RenderBlockIf isTrue={action === 'save'}>
            <div>
              <Input
                value={email}
                label="Email"
                name="email"
                className={
                  errors.email ? 'border-red-500 dark:border-red-500' : ''
                }
                required
              />
              <p className="text-red-500 mb-4 text-xs ml-4 break-words">
                {errors.email}
              </p>
            </div>
            <div>
              <Input
                value={password}
                label="Password"
                name="password"
                className={
                  errors.password ? 'border-red-500 dark:border-red-500' : ''
                }
                required
              />
              <p className="text-red-500 mb-4 text-xs ml-4 break-words">
                {errors.password}
              </p>
            </div>
          </RenderBlockIf>
        </div>
        <div className="flex justify-center">
          <Button type="submit" shape="square" size="large" fullWidth>
            Save
          </Button>
        </div>
      </form>
    </>
  )
}

export default Form

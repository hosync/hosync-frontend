'use client'

import { SVG } from '@/components/svg'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useRegistrationForm } from '@/hooks/forms/useRegistrationForm'
import { constants } from '@/lib/utils/constants'

interface RegistrationFormProps {
  columns?: 1 | 2
  email?: string
}

const RegistrationForm: React.FC<RegistrationFormProps> = ({
  columns = 2,
  email
}) => {
  const { state, onChange, submitForm } = useRegistrationForm()
  const disabledEmail = !!email

  return (
    <>
      <div
        className={`grid gap-4 mt-4 grid-cols-1 ${columns === 2 ? 'lg:grid-cols-2' : 'lg:grid-cols-1'}`}
      >
        <div className="relative">
          <Input
            id="fullName"
            leftIcon={<SVG.User />}
            label="Full Name: *"
            name="fullName"
            placeholder="e.g. John Smith"
            value={state.values.fullName}
            required
            errorText={state.errors.error.fullName}
            onChange={onChange}
          />
        </div>

        <div className="relative">
          <Input
            id="businessName"
            name="businessName"
            label="Business name: *"
            leftIcon={<SVG.Cabin />}
            placeholder="e.g. Cabañas San Pancho"
            required
            onChange={onChange}
            value={state.values.businessName}
            errorText={state.errors.error.businessName}
          />
        </div>

        <div className="relative">
          <Input
            name="businessEmail"
            label="Email: *"
            leftIcon={<SVG.Email />}
            placeholder="e.g. mail@example.com"
            required
            onChange={onChange}
            value={state.values.businessEmail}
            disabled={disabledEmail}
            errorText={
              state.errors.error.businessEmail ||
              state.errors.error.responseError
            }
          />
        </div>

        <div className="relative">
          <Input
            name="businessPhone"
            label="Phone: *"
            leftIcon={<SVG.Phone />}
            placeholder="e.g. +1 234 5677"
            required
            value={state.values.businessPhone}
            onChange={onChange}
            errorText={state.errors.error.businessPhone}
          />
        </div>

        <div className="relative">
          <Input
            name="businessWebsite"
            label="Website *"
            leftIcon={<SVG.Link />}
            placeholder="e.g. yourdomain.com"
            required
            value={state.values.businessWebsite}
            onChange={onChange}
            errorText={state.errors.error.businessWebsite}
          />
        </div>

        <div className="relative">
          <Input
            name="country"
            label="Country: *"
            leftIcon={<SVG.World />}
            placeholder="e.g. Mexico"
            dropdownItems={constants.countries}
            required
            value={state.values.country}
            onChange={onChange}
            errorText={state.errors.error.country}
          />
        </div>
      </div>

      <div className="flex justify-center mb-6 mt-6">
        <Button color="primary" onClick={submitForm} type="submit" fullWidth>
          Get Started
        </Button>
      </div>

      <div
        className="flex justify-center mb-6 text-center dark:text-white p-2"
        style={{ fontSize: '10px' }}
      >
        We are committed to your privacy. hosgu.com uses the information you
        provide to us to contact you about our relevant content, products, and
        services. You may unsubscribe at any time.
      </div>

      <div
        className="text-center mt-4 text-gray-500 dark:text-gray-300 toggle-text-dark-mode"
        data-testid="create-account"
      >
        Already have an account?{' '}
        <a
          href="/auth/login"
          className="text-green-500 dark:text-green-500 font-medium hover:underline"
        >
          Login
        </a>
      </div>
    </>
  )
}

export { RegistrationForm }

'use client'

import { initialSignup } from '@/actions/auth/user'
import { RegistrationForm } from '@/components/form/registration/form'
import { RenderBlockIf } from '@/components/helpers/render-block-if'
import { Link } from '@/components/ui/link'
import { useRegistrationForm } from '@/hooks/forms/useRegistrationForm'
import cx from '@/lib/utils/cx'
import { RegistrationFormProvider } from '@/providers/registration'
import { registrationValidator } from '@/validators/registration'

interface RegistrationFormProps {
  area: string
  error?: string
  email?: string
}

const initialValues = {
  businessEmail: '',
  fullName: '',
  businessName: '',
  businessPhone: '',
  businessWebsite: '',
  country: ''
}

const FormContent: React.FC<RegistrationFormProps> = ({
  area,
  error,
  email
}) => {
  const { state } = useRegistrationForm()

  const SuccessMessage = () => (
    <div className="flex min-h-[519px] flex-col text-black dark:text-white justify-center m-auto p-1 text-center">
      <h2 className="text-black dark:text-white">
        Just One More Step to Get Started!
      </h2>
      <p className="w-11/12" style={{ margin: '0 auto' }}>
        Thank you for registering! Please check your email to complete your
        profile setup and activate your account.
      </p>

      <RenderBlockIf isTrue={area !== 'hero'}>
        <p>
          <Link
            href="/"
            className="text-green-500 dark:text-green-500 font-medium hover:underline"
          >
            Back to home
          </Link>
        </p>
      </RenderBlockIf>
    </div>
  )

  const className = {
    'w-[90%]': area === 'hero',
    'w-full': area === 'register',
    'md:w-1/2': area === 'hero',
    'bg-white': true,
    'dark:bg-black': true,
    'p-8': true,
    'rounded-md': true,
    'shadow-md': area === 'hero',
    'mb-20': true
  }

  return (
    <div className={cx.join(className)}>
      <RenderBlockIf isTrue={!!state.isSuccess}>
        <SuccessMessage />
      </RenderBlockIf>

      <RenderBlockIf isTrue={!!error && !state.isSuccess}>
        <div className="text-red-500 text-center">
          You must register an account first with the same email that you use at
          Google
        </div>
      </RenderBlockIf>

      <RenderBlockIf isFalse={!!state.isSuccess}>
        <RegistrationForm columns={area === 'hero' ? 2 : 1} email={email} />
      </RenderBlockIf>
    </div>
  )
}

const RegistrationFormWrapper: React.FC<RegistrationFormProps> = ({
  area = 'hero',
  error = '',
  email = ''
}) => {
  if (email) {
    initialValues.businessEmail = email
    initialValues.businessWebsite = 'https://'
  }

  return (
    <RegistrationFormProvider
      initialValues={initialValues}
      singleValidator={registrationValidator}
      onSubmit={initialSignup}
    >
      <FormContent area={area} error={error} email={email} />
    </RegistrationFormProvider>
  )
}

export { RegistrationFormWrapper }

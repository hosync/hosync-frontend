'use client'

import { setupProfile } from '@/actions/profile/profile'
import { RenderBlockIf } from '@/components/helpers/render-block-if'
import { useProfileSetupForm } from '@/hooks/forms/useProfileSetupForm'
import cx from '@/lib/utils/cx'
import { ProfileSetupFormProvider } from '@/providers/profile-setup'
import { profileSetupValidator } from '@/validators/profile-setup'

import { StepNavigation } from './components/step-navigation'
import { StepRenderer } from './components/step-renderer'
import { StepTitle } from './components/step-title'

interface ProfileSetupFormProps {
  user: any
}

const initialValues = {
  propertyName: '',
  email: '',
  password: '',
  googleMapsUrl: '',
  location: {
    country: '',
    state: '',
    city: '',
    address1: '',
    address2: '',
    zipCode: ''
  },
  propertyType: '' as '' | 'cabin' | 'hotel',
  capacity: {
    guests: 1,
    bathrooms: 1,
    bedrooms: 1,
    beds: 1
  },
  amenities: {
    ac: false,
    bedSheets: false,
    coffeeMachine: false,
    extraBed: false,
    freeParking: false,
    garden: false,
    glassesPlates: false,
    hotWater: false,
    kitchen: false,
    laundry: false,
    oven: false,
    petFriendly: false,
    pool: false,
    refrigerator: false,
    smoking: false,
    towels: false,
    tv: false,
    wifi: false
  },
  pricing: {
    price: 0,
    currency: 'USD' as const,
    checkInHour: '03',
    checkInMinute: '00',
    checkInPeriod: 'PM' as const,
    checkOutHour: '12',
    checkOutMinute: '00',
    checkOutPeriod: 'PM' as const
  },
  images: []
}

const ProfileSetupFormContent: React.FC<ProfileSetupFormProps> = ({ user }) => {
  const { state, previousStep, nextStep } = useProfileSetupForm()
  const { currentStep = 1, values } = state
  return (
    <div className="min-h-screen flex justify-center bg-white dark:bg-black w-full">
      <div className="p-6 dark:text-white w-full">
        <div
          className={cx.join(
            'flex justify-center w-full min-h-screen overflow-hidden',
            'desktop-height-80vh desktop-overflow-visible'
          )}
        >
          <div className="p-0 rounded-lg h-full overflow-hidden">
            <div
              className="inner-scroll-content px-1"
              style={{
                overflowY: 'auto',
                height: 'calc(100% - 20px)'
              }}
            >
              <StepTitle
                currentStep={state.currentStep}
                propertyType={values.propertyType}
              />

              <StepRenderer currentStep={state.currentStep} />
            </div>
          </div>
        </div>

        <RenderBlockIf isTrue={currentStep < 8}>
          <StepNavigation
            previousStep={previousStep}
            nextStep={() => nextStep()}
            onSubmit={setupProfile}
            currentStep={currentStep}
            user={user}
          />
        </RenderBlockIf>
      </div>
    </div>
  )
}

type Props = {
  user: any
}

const ProfileSetupFormWrapper: React.FC<Props> = ({ user }) => {
  initialValues.email = user.email
  initialValues.location.country = 'Mexico'
  // TODO: Remove this hardcoded values when the form is ready
  initialValues.location.state = 'Jalisco'
  initialValues.location.city = 'Guadalajara'
  initialValues.location.address1 = 'Av. Revolución 123'
  initialValues.location.address2 = 'Col. Centro'
  initialValues.location.zipCode = '44100'
  initialValues.propertyName = 'Casa de la Abuela'
  initialValues.googleMapsUrl = 'https://www.google.com/maps/place/...'
  initialValues.password = 'Abc123456$'

  return (
    <ProfileSetupFormProvider
      initialValues={initialValues}
      validator={profileSetupValidator}
      totalSteps={8}
    >
      <ProfileSetupFormContent user={user} />
    </ProfileSetupFormProvider>
  )
}

export { ProfileSetupFormWrapper }

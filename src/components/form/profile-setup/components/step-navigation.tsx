import { RenderBlockIf } from '@/components/helpers/render-block-if'
import { Button } from '@/components/ui/button'
import { useProfileSetupForm } from '@/hooks/forms/useProfileSetupForm'
import { APIResponse } from '@/types/api'

import { StepIndicator } from './step-indicator'

const StepNavigation = ({
  previousStep,
  nextStep,
  onSubmit,
  currentStep,
  user
}: {
  previousStep: () => void
  nextStep: () => void
  onSubmit: (values: any, user: any) => Promise<APIResponse<any>>
  currentStep: number
  user: any
}) => {
  const { state } = useProfileSetupForm()
  const { values } = state

  const ammenities = Object.values(values.amenities)
  const hasAmenities =
    ammenities.filter((amenity) => amenity === true).length > 0

  const disabled =
    (currentStep === 4 && !hasAmenities) ||
    (currentStep === 5 && values.pricing.price === 0)
  const handleSubmit = () => {
    if (currentStep === 7) {
      onSubmit(values, user)
      nextStep()
    } else {
      nextStep()
    }
  }

  return (
    <div className="sticky h-20 mt-3 bg-white dark:bg-black z-50 pt-4 border-t border-gray-100 dark:border-gray-800">
      <div className="flex items-center h-full">
        <div className="flex w-full justify-between items-center">
          <RenderBlockIf isTrue={currentStep > 1}>
            <Button color="dark" onClick={previousStep} className="mr-4 h-12">
              Back
            </Button>
          </RenderBlockIf>

          <StepIndicator steps={8} currentStep={currentStep} />

          <RenderBlockIf isTrue={currentStep !== 2}>
            <Button
              color="primary"
              onClick={handleSubmit}
              className="h-12"
              disabled={disabled}
            >
              {currentStep < 7 ? 'Next' : 'Finish'}
            </Button>
          </RenderBlockIf>
        </div>
      </div>
    </div>
  )
}

export { StepNavigation }

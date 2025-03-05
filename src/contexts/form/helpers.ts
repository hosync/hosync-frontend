import { useCallback } from 'react'

import { ValidatorResult } from '@/lib/utils/validations'

export type FormStep = number
export type FormDirection = 'forward' | 'back'

export interface FormContextType<T> {
  state: FormState<T>
  dispatch: React.Dispatch<FormAction<T>>
  nextStep: () => void
  previousStep: () => void
  setFormValues: (values: Partial<T>) => void
  validate: (step: number) => ValidatorResult
  onChange: (
    e?: React.ChangeEvent<HTMLInputElement | HTMLSelectElement> | null,
    manual?: { name: string; value: any }
  ) => void
  submitForm: () => Promise<void>
}

export type FormAction<T> =
  | { type: 'SET_VALUES'; payload: Partial<T> }
  | { type: 'SET_ERRORS'; payload: ValidatorResult }
  | { type: 'NEXT_STEP' }
  | { type: 'PREVIOUS_STEP' }
  | { type: 'SET_SUBMITTED'; payload: any }
  | { type: 'SET_SUBMITTING' }

export interface FormState<T> {
  values: T
  initialValues: T
  currentStep: FormStep
  direction?: FormDirection
  errors: ValidatorResult
  isSubmitted: boolean
  isSubmitting: boolean
  isSuccess: boolean
  isSingleForm?: boolean
  responseData?: any
}

export function createFormReducer<T>() {
  return (state: FormState<T>, action: FormAction<T>): FormState<T> => {
    switch (action.type) {
      case 'SET_VALUES':
        return {
          ...state,
          values: { ...state.values, ...action.payload }
        }
      case 'SET_ERRORS':
        return {
          ...state,
          errors: {
            ...action.payload
          }
        }
      case 'NEXT_STEP':
        return {
          ...state,
          currentStep: state.currentStep + 1,
          direction: 'forward'
        }
      case 'PREVIOUS_STEP':
        return {
          ...state,
          currentStep: Math.max(1, state.currentStep - 1),
          direction: 'back'
        }
      case 'SET_SUBMITTED':
        return {
          ...state,
          ...action.payload
        }
      case 'SET_SUBMITTING':
        return {
          ...state,
          isSubmitting: true
        }
      default:
        return state
    }
  }
}

export function createInitialState<T>(
  initialValues: T,
  totalSteps = 1
): FormState<T> {
  return {
    values: initialValues,
    initialValues,
    currentStep: 1,
    direction: 'forward',
    errors: {
      isSuccess: false,
      error: {},
      safeValues: {}
    },
    isSubmitted: false,
    isSubmitting: false,
    isSuccess: false,
    isSingleForm: totalSteps === 1
  }
}

export function createStepValidate<T>(
  state: FormState<T>,
  dispatch: React.Dispatch<FormAction<T>>,
  validator?: (values: T, step: number) => any
) {
  return useCallback(
    (step: number): ValidatorResult => {
      if (!validator) {
        return {
          isSuccess: true,
          error: {},
          safeValues: {}
        }
      }

      const errors = validator(state.values, step)
      const hasErrors = Object.keys(errors).length > 0

      dispatch({
        type: 'SET_ERRORS',
        payload: {
          isSuccess: !hasErrors,
          error: errors,
          safeValues: {}
        }
      })

      return {
        isSuccess: !hasErrors,
        error: errors,
        safeValues: {}
      }
    },
    [state.values, validator, dispatch]
  )
}

export function createValidate<T>(
  state: FormState<T>,
  dispatch: React.Dispatch<FormAction<T>>,
  validator?: (values: T) => ValidatorResult
) {
  return useCallback(
    (values: T): ValidatorResult => {
      if (!validator) {
        return {
          isSuccess: true,
          error: {},
          safeValues: {}
        }
      }

      const errors = validator(values)
      const hasErrors = Object.keys(errors.error).length > 0

      dispatch({
        type: 'SET_ERRORS',
        payload: {
          isSuccess: !hasErrors,
          error: errors.error,
          safeValues: errors.safeValues
        }
      })

      return {
        isSuccess: !hasErrors,
        error: errors.error,
        safeValues: errors.safeValues
      }
    },
    [state.values, validator, dispatch]
  )
}

export function createNextStep<T>(
  state: FormState<T>,
  dispatch: React.Dispatch<FormAction<T>>,
  totalSteps: number,
  validate?: (step: number) => ValidatorResult
) {
  return useCallback(() => {
    const validation = validate?.(state.currentStep)

    if (state.currentStep < totalSteps && validation?.isSuccess) {
      dispatch({ type: 'NEXT_STEP' })
    }
  }, [state.currentStep, totalSteps, validate, dispatch])
}

export function createPreviousStep<T>(
  state: FormState<T>,
  dispatch: React.Dispatch<FormAction<T>>
) {
  return useCallback(() => {
    const step = state.currentStep

    if (step > 1) {
      dispatch({ type: 'PREVIOUS_STEP' })
      dispatch({
        type: 'SET_ERRORS',
        payload: {
          isSuccess: false,
          error: {},
          safeValues: {}
        }
      })
    }
  }, [state.currentStep, dispatch])
}

export function createSubmitForm<T>(
  state: FormState<T>,
  dispatch: React.Dispatch<FormAction<T>>,
  validate: (values: T) => ValidatorResult,
  onSubmit?: (values: T) => Promise<any> | any
) {
  return useCallback(async () => {
    const validation = validate(state.values)

    if (validation.isSuccess) {
      if (onSubmit) {
        dispatch({ type: 'SET_SUBMITTING' })

        try {
          const response = await onSubmit(state.values)

          if (response.ok) {
            dispatch({
              type: 'SET_SUBMITTED',
              payload: {
                isSuccess: true,
                isSubmitted: true,
                responseData: response
              }
            })
          } else {
            dispatch({
              type: 'SET_SUBMITTED',
              payload: {
                isSubmitted: false,
                responseData: null
              }
            })
            dispatch({
              type: 'SET_ERRORS',
              payload: {
                isSuccess: false,
                error: {
                  ...state.errors.error,
                  responseError: response.error.message
                },
                safeValues: {}
              }
            })
          }
        } catch (error) {
          console.error(error)
          dispatch({
            type: 'SET_SUBMITTED',
            payload: {
              isSubmitted: false,
              responseData: null
            }
          })
        }
      } else {
        dispatch({
          type: 'SET_SUBMITTED',
          payload: {
            isSubmitted: false,
            responseData: null
          }
        })
      }
    }
  }, [
    state.currentStep,
    state.isSingleForm,
    state.values,
    validate,
    dispatch,
    onSubmit
  ])
}

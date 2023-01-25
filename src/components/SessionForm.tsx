import {
  FC,
  useReducer,
  useRef,
  useEffect,
  ReactElement,
  SyntheticEvent,
  ChangeEvent,
  // ElementRef,
} from 'react'
import './SessionForm.css'

const SessionForm: FC = (): ReactElement => {
  interface State {
    title: string
    description: string
    format: string
    level: string
    titleError: string
    descriptionError: string
    formatError: string
    levelError: string
  }

  type StateKeys = keyof State

  const initialState: State = {
    title: '',
    description: '',
    format: '',
    level: '',
    titleError: '',
    descriptionError: '',
    formatError: '',
    levelError: '',
  }

  type Action = {
    type: 'onChange' | 'onBlur'
    payload: { name: StateKeys; value: string }
  }

  const formReducer = (state: State, action: Action) => {
    switch (action.type) {
      case 'onChange':
        return { ...state, [action.payload.name]: action.payload.value }
      case 'onBlur':
        return { ...state, [action.payload.name]: action.payload.value }
      default:
        return state
    }
  }

  const [formValues, dispatch] = useReducer(formReducer, initialState)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    inputRef.current?.focus()
  }, [])

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault()
    const { titleError, descriptionError, formatError, levelError } = formValues
    if (titleError || descriptionError || formatError || levelError) return
    else console.log('You succesfully submited the form!')
  }

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const target = e.currentTarget

    dispatch({
      type: 'onChange',
      payload: {
        name: target.name as StateKeys,
        value: target.value,
      },
    })
  }

  const handleBlur = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const target = e.currentTarget
    if (!target.value) {
      dispatch({
        type: 'onBlur',
        payload: {
          name: `${target.name}Error` as StateKeys,
          value: `${target.name.toUpperCase()} field is required!`,
        },
      })
    } else {
      dispatch({
        type: 'onBlur',
        payload: {
          name: `${target.name}Error` as StateKeys,
          value: '',
        },
      })
    }
  }

  return (
    <div className='session-wrapper'>
      <form onSubmit={handleSubmit}>
        <h3>Submit a Session!</h3>
        <div className='form-element'>
          <label htmlFor='title'>Title</label>
          <input
            type='text'
            name='title'
            id='title'
            value={formValues.title}
            onChange={handleChange}
            ref={inputRef}
            onBlur={handleBlur}
          />
          {formValues.titleError && <p className='form-error'>{formValues.titleError}</p>}
        </div>
        <div className='form-element'>
          <label htmlFor='description'>Description</label>
          <textarea
            name='description'
            id='description'
            cols={10}
            rows={10}
            value={formValues.description}
            onChange={handleChange}
            onBlur={handleBlur}
          ></textarea>
          {formValues.descriptionError && (
            <p className='form-error'>{formValues.descriptionError}</p>
          )}
        </div>
        <div className='form-element'>
          <label htmlFor='format'>Format</label>
          <input
            type='text'
            name='format'
            id='format'
            value={formValues.format}
            onChange={handleChange}
            onBlur={handleBlur}
          />
        </div>
        {formValues.formatError && <p className='form-error'>{formValues.formatError}</p>}
        <div className='form-element'>
          <label htmlFor='level'>Level</label>
          <input
            type='text'
            name='level'
            id='level'
            value={formValues.level}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          {formValues.levelError && <p className='form-error'>{formValues.levelError}</p>}
        </div>
        <input
          type='submit'
          value='Submit'
          disabled={
            !!(
              formValues.titleError ||
              formValues.descriptionError ||
              formValues.levelError ||
              formValues.formatError
            )
          }
        />
      </form>
    </div>
  )
}

export default SessionForm

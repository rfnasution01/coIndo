import { StylesConfig } from 'react-select'

export const customStyles: StylesConfig = {
  control: (base, state) => {
    return {
      ...base,
      background: state.isDisabled ? '#f2f2f2' : 'white',
      opacity: state.isDisabled ? '0.5' : base.opacity,
      cursor: state.isDisabled ? 'not-allowed' : base.cursor,
      pointerEvents: state.isDisabled ? 'auto' : base.pointerEvents,
    }
  },
}

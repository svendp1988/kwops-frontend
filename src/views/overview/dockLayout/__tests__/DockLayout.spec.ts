// import { getByText, render } from '@testing-library/react'
// import { JSX } from 'react'
//
// import DockLayout from '../DockLayout'
// import { CELL_DEFAULTS } from '../DockLayout.consts'
// import { CellType } from '../DockLayout.types'
//
// describe('DockLayout test suite', () => {
//
//   const defaultProps = {}
//
//   const createComponent = (props = defaultProps): JSX.Element => withProvider(DockLayout, props)
//
//   test('initial render', () => {
//     const { container } = render(createComponent())
//     expect(container.querySelector('.dockview-theme-abyss')).toBeInTheDocument()
//
//     Object.keys(CELL_DEFAULTS).forEach((c) => {
//         expect(getByText(container, 'Type: ' + CellType[c as unknown as number])).toBeInTheDocument()
//     })
//   })
//
// })

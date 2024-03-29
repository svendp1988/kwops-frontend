// import { getByText, render } from '@testing-library/react'
// import { JSX } from 'react'
//
// import { CellType } from '../../DockLayout.types'
// import PanelHeader from '../PanelHeader'
// import { PanelHeaderProps } from '../PanelHeader.types'
//
// describe('PanelHeader test suite', () => {
//
//   const defaultProps: PanelHeaderProps = {
//     title: 'DUMMY_TITLE',
//     type: CellType.DEV_OPS
//   }
//
//   const createComponent = (props = defaultProps): JSX.Element => withProvider(PanelHeader, props)
//
//   describe('initial render', () => {
//
//     test('default', () => {
//       const { container } = render(createComponent())
//       expect(getByText(container, defaultProps.title)).toBeInTheDocument()
//       expect(container.querySelector('#expand-button')).toBeInTheDocument()
//       expect(container.querySelector('#externalize-button')).not.toBeInTheDocument()
//     })
//
//     test('with externalize button', () => {
//       const { container } = render(createComponent({ ...defaultProps, canExternalize: true }))
//       expect(getByText(container, defaultProps.title)).toBeInTheDocument()
//       expect(container.querySelector('#expand-button')).toBeInTheDocument()
//       expect(container.querySelector('#externalize-button')).toBeInTheDocument()
//     })
//
//   })
//
// })

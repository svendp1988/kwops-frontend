// import { render, waitFor } from '@testing-library/react'
// import { JSX } from 'react'
// import { CellType } from '../../DockLayout.types'
// import Panel from '../Panel'
// import { PanelProps } from '../Panel.types'
//
// describe('Panel test suite', () => {
//
//   const cases: [string, CellType, string][] = [
//     [CellType[CellType.DEV_OPS], CellType.DEV_OPS, '.count-view'],
//     [CellType[CellType.HUMAN_RESOURCES], CellType.HUMAN_RESOURCES, '.flight-view']
//   ]
//
//   describe.each(cases)('rendering %s', (title, type, className) => {
//
//     const defaultProps: PanelProps = { type }
//
//     const createComponent = (props = defaultProps): JSX.Element => withProvider(Panel, props)
//
//     test('default', async () => {
//       const { container } = render(createComponent(defaultProps))
//       expect(container.querySelector(className)).toBeInTheDocument()
//     })
//
//     test('externalized', async () => {
//       const { container } = render(createComponent({ ...defaultProps, isExternalized: true }))
//       expect(container.querySelector(className)).toBeInTheDocument()
//     })
//
//   })
//
//   describe('rendering ' + CellType[CellType.MAP], () => {
//
//     const defaultProps: PanelProps = { type: CellType.MAP }
//
//     const { getStore, waitForMapView } = addMapViewSupport(STATE)
//
//     const createComponent = (props = defaultProps): JSX.Element => withProvider(Panel, props, undefined, getStore)
//
//     test('default', async () => {
//       const { container } = render(createComponent(defaultProps))
//       await waitFor(waitForMapView)
//       expect(container.querySelector('.map-view')).toBeInTheDocument()
//     })
//
//     test('externalized', async () => {
//       const { container } = render(createComponent({ ...defaultProps, isExternalized: true }))
//       await waitFor(waitForMapView)
//       expect(container.querySelector('.map-view')).toBeInTheDocument()
//     })
//
//   })
//
// })

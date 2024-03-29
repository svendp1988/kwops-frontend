// import { act, fireEvent, getByRole, render } from '@testing-library/react'
// import { JSX } from 'react'
//
// import { CellType, MoveDirection } from '../../../DockLayout.types'
//
// import ExpandButton from '../ExpandButton'
// import { ExpandButtonProps } from '../ExpandButton.types'
// import { DockLayoutContextType } from "../../../provider/DockLayout.Provider.types";
// import { DockLayoutProvider } from "../../../provider/DockLayout.Provider";
//
// describe('ExpandButton test suite', () => {
//
//   const defaultProps: ExpandButtonProps = {
//     type: CellType.DEV_OPS
//   }
//
//   const _getIcon = (container: HTMLElement, isExpanded: boolean): HTMLElement => getByRole(container, 'img', { name: isExpanded ? /caret-down/ : /caret-up/ })
//
//   const createContext = (isExpanded: boolean): DockLayoutContextType => ({
//     addApi: jest.fn(),
//     getPanel: jest.fn().mockReturnValue({
//       api: { isExpanded, onDidExpansionChange: jest.fn().mockReturnValue({ dispose: jest.fn() }) }
//     }),
//     movePanel: jest.fn()
//   })
//
//   const createComponent = (props = defaultProps): JSX.Element => withProvider(ExpandButton, props)
//
//   let useDockLayoutContextSpy: jest.SpyInstance
//
//   beforeEach(() => {
//     useDockLayoutContextSpy = jest.spyOn(DockLayoutProvider, 'useDockLayoutContext')
//   })
//
//   const useCases: [string, boolean][] = [['collapse', false], ['expand', true]]
//
//   describe('initial render', () => {
//
//     test.each(useCases)('state is %s', (title, isExpanded) => {
//       useDockLayoutContextSpy.mockReturnValue(createContext(isExpanded))
//
//       const { container } = render(createComponent())
//       expect(container.querySelector('.panel-header-expand')).toBeInTheDocument()
//       expect(_getIcon(container, isExpanded)).toBeInTheDocument()
//     })
//
//   })
//
//   test('should throw error when no context available', () => {
//     expect(() => render(createComponent())).toThrowError('No context available yet...')
//   })
//
//   describe('handle onClick', () => {
//
//     test.each(useCases)('state is %s', (title, isExpanded) => {
//       const context = createContext(isExpanded)
//       useDockLayoutContextSpy.mockReturnValue(context)
//
//       const { container } = render(createComponent())
//       expect(context.movePanel).not.toBeCalled()
//       fireEvent.click(_getIcon(container, isExpanded))
//       expect(context.movePanel).toBeCalledWith(defaultProps.type, MoveDirection.EXPAND, !isExpanded)
//     })
//
//   })
//
//   describe('handle outside events', () => {
//
//     test.each(useCases)('state is %s', (title, isExpanded) => {
//       const context = createContext(isExpanded)
//       useDockLayoutContextSpy.mockReturnValue(context)
//
//       const { container } = render(createComponent())
//       expect(_getIcon(container, isExpanded)).toBeInTheDocument()
//       act(() => {
//         const onDidExpansionChange = context.getPanel(defaultProps.type).api.onDidExpansionChange as jest.Mock
//         onDidExpansionChange.mock.calls[0][0]({ isExpanded: !isExpanded })
//       })
//       expect(_getIcon(container, !isExpanded)).toBeInTheDocument()
//     })
//
//   })
//
// })

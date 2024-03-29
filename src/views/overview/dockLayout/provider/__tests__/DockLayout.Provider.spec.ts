// import { act, fireEvent, render, screen } from '@testing-library/react'
// import { IPaneviewPanel, PaneviewApi } from 'dockview'
// import { JSX } from 'react'
// import { CellType, MoveDirection } from '../DockLayout.types'
// import { createPanePanelId } from '../DockLayout.utils'
//
// import { withDockLayoutProvider } from './TestUtils'
//
// jest.mock('react-new-window', () => jest.requireActual('../__mocks__/NewWindow'))
//
// const DUMMY_TYPE = CellType.DEV_OPS
//
// const createPanel = (type = DUMMY_TYPE, isExpanded?: boolean): IPaneviewPanel => {
//   const api = { isExpanded, setExpanded: jest.fn() }
//   return { api, params: { type } } as unknown as IPaneviewPanel
// }
//
// const createApi = (panels: IPaneviewPanel[]): PaneviewApi => {
//   const api = {
//     addPanel: (panel: IPaneviewPanel): void => { panels.push(createPanel(panel.params?.type)) },
//     getPanel: (id: string): IPaneviewPanel | undefined => panels.filter((p) => createPanePanelId(p.params?.type) === id)[0],
//     movePanel: jest.fn(),
//     panels: panels,
//     removePanel: (panel: IPaneviewPanel): void => { panels.splice(panels.indexOf(panel), 1) }
//   }
//   return api as unknown as PaneviewApi
// }
//
// describe('DockLayoutProvider test suite', () => {
//
//   const createComponent = (callback: () => void): JSX.Element => withDockLayoutProvider(createHook(callback))
//
//   test('initial render', () => {
//     render(createComponent(() => {
//       const context = useDockLayoutContext()
//       expect(context).toBeDefined()
//     }))
//   })
//
//   describe('getPanel', () => {
//
//     const panel = createPanel()
//     let context: DockLayoutContextType
//
//     beforeEach(() => {
//       render(createComponent(() => {
//         context = useDockLayoutContext() as DockLayoutContextType
//       }))
//     })
//
//     test('should find panel', () => {
//       act(() => {
//         context.addApi(createApi([panel]))
//       })
//       expect(context.getPanel(DUMMY_TYPE)).toBe(panel)
//     })
//
//     describe('should throw error', () => {
//
//       test('if not found', () => {
//         expect(() => context.getPanel(DUMMY_TYPE)).toThrowError('Panel not found for ' + DUMMY_TYPE)
//       })
//
//       test('if many found', () => {
//         act(() => {
//           context.addApi(createApi([panel]))
//           context.addApi(createApi([panel]))
//         })
//         expect(() => context.getPanel(DUMMY_TYPE)).toThrowError('Panel not found for ' + DUMMY_TYPE)
//       })
//
//     })
//
//   })
//
//   describe('movePanel', () => {
//
//     let context: DockLayoutContextType
//
//     beforeEach(() => {
//       render(createComponent(() => {
//         context = useDockLayoutContext() as DockLayoutContextType
//       }))
//     })
//
//     describe(MoveDirection[MoveDirection.EXPAND], () => {
//
//       const useCases: [string, boolean][] = [['collapse', false], ['expand', true]]
//
//       describe.each(useCases)('state is %s', (title, isExpanded) => {
//
//         beforeEach(() => {
//           act(() => {
//             context.addApi(createApi([createPanel(undefined, isExpanded)]))
//           })
//         })
//
//         test('should use panel state', () => {
//           context.movePanel(DUMMY_TYPE, MoveDirection.EXPAND)
//           expect(context.getPanel(DUMMY_TYPE).api.setExpanded).toBeCalledWith(!isExpanded)
//         })
//
//         describe('should use flag', () => {
//
//           test.each([true, false])('%s', (flag) => {
//             context.movePanel(DUMMY_TYPE, MoveDirection.EXPAND, flag)
//             expect(context.getPanel(DUMMY_TYPE).api.setExpanded).toBeCalledWith(flag)
//           })
//
//         })
//
//       })
//
//     })
//
//     describe(MoveDirection[MoveDirection.EXTERNALIZE], () => {
//
//       let api: PaneviewApi
//
//       beforeEach(() => {
//         api = createApi([createPanel(CellType.COUNT), createPanel(), createPanel(CellType.FLIGHT)])
//
//         act(() => {
//           context.addApi(api)
//         })
//       })
//
//       test('externalize panel', () => {
//         act(() => {
//           context.movePanel(DUMMY_TYPE, MoveDirection.EXTERNALIZE)
//         })
//         expect(api.getPanel(createPanePanelId(DUMMY_TYPE))).toBeFalsy()
//       })
//
//       test('close externalized panel', () => {
//         act(() => {
//           context.movePanel(DUMMY_TYPE, MoveDirection.EXTERNALIZE)
//         })
//
//         fireEvent.click(screen.getByText('onUnload'))
//         expect(api.getPanel(createPanePanelId(DUMMY_TYPE))).toBeTruthy()
//         expect(api.movePanel).toBeCalledWith(2, 1)
//       })
//
//     })
//
//   })
//
// })

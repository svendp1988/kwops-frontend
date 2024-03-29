import { fireEvent, getByRole, render } from '@testing-library/react'
import { JSX } from 'react'
// @ts-expect-error no-implicit-any
import { withProvider } from '../../../../../../__tests__/TestUtil.js'
import { CellType, MoveDirection } from '../../../DockLayout.types'
import * as DockLayoutProvider from '../../../DockLayoutProvider'
import { DockLayoutContextType } from '../../../DockLayoutProvider.types'
import ExternalizeButton from '../ExternalizeButton'
import { ExternalizeButtonProps } from '../ExternalizeButton.types'

describe('ExternalizeButton test suite', () => {

  const defaultProps: ExternalizeButtonProps = {
    type: CellType.LOAD_MONITOR
  }

  const _getIcon = (container: HTMLElement): HTMLElement => getByRole(container, 'img', { name: /export/ })

  const createContext = (): DockLayoutContextType => ({
    addApi: jest.fn(),
    getPanel: jest.fn(),
    movePanel: jest.fn()
  })

  const createComponent = (props = defaultProps): JSX.Element => withProvider(ExternalizeButton, props)

  let useDockLayoutContextSpy: jest.SpyInstance

  beforeEach(() => {
    useDockLayoutContextSpy = jest.spyOn(DockLayoutProvider, 'useDockLayoutContext')
  })

  test('initial render', () => {
    useDockLayoutContextSpy.mockReturnValue(createContext())

    const { container } = render(createComponent())
    expect(container.querySelector('.panel-header-externalize')).toBeInTheDocument()
    expect(_getIcon(container)).toBeInTheDocument()
  })

  test('should throw error when no context available', () => {
    expect(() => render(createComponent())).toThrowError('No context available yet...')
  })

  test('handle onClick', () => {
    const context = createContext()
    useDockLayoutContextSpy.mockReturnValue(context)

    const { container } = render(createComponent())
    expect(context.movePanel).not.toBeCalled()
    fireEvent.click(_getIcon(container))
    expect(context.movePanel).toBeCalledWith(defaultProps.type, MoveDirection.EXTERNALIZE, true)
  })

})
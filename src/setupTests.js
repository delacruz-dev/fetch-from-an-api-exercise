import "@testing-library/jest-dom/extend-expect";
import MutationObserver from '@sheerun/mutationobserver-shim'
window.MutationObserver = MutationObserver

afterEach(() => jest.resetAllMocks())
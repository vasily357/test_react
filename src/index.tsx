import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'

import { App } from './App'

const container = document.getElementById('root')
const root = createRoot(container || document.body)
import store from './store'

root.render(
    <Provider store={store}>
        <App />
    </Provider>
)

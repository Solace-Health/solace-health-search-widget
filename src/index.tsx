import * as React from 'react'
import * as ReactDOM from 'react-dom/client'
import Widget from './Widget'

const root = ReactDOM.createRoot(
  document.getElementById('solaceEntryWidget')
)
root.render(
  <React.StrictMode>
    <Widget />
  </React.StrictMode>
)

import App from './App.svelte'
import '@material/typography/mdc-typography.scss'
import fakerServer from 'app/fakedb'

fakerServer()

const app = new App({ target: document.body })

export default app

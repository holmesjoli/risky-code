import { useState, useEffect } from 'react';
import { usePython, PythonProvider } from 'react-py';
// import pyFile from "../services/model/main.py"

// const moduleCode = `def add(a, b):
//   result = a + b
//   return result`

const inputCode = `from cowsay import cowsay
message = """
The most remarkable thing about my mother is that for thirty years she served
the family nothing but leftovers.  The original meal has never been found.
		-- Calvin Trillin
""".strip()
print(cowsay(message))
`

function Codeblock({packages, items}) {
    // const [module, setModule] = useState(moduleCode)
    const [input, setInput] = useState(inputCode)
    const [showOutput, setShowOutput] = useState(false)
    const [message, setMessage] = useState()
  
    const {
        runPython,
        stdout,
        stderr,
        isLoading,
        isRunning,
        interruptExecution,
        writeFile,
        watchModules,
        unwatchModules
    } = usePython()

    function run() {
        runPython(input)
        setMessage(undefined)
        setShowOutput(true)
    }

    function stop() {
        interruptExecution()
        setShowOutput(false)
    }

    function reset() {
        setShowOutput(false)
        // setModule(moduleCode)
        setInput(inputCode)
    }

    function write() {
        setShowOutput(false)
        writeFile('utils.py', module)
        setMessage('File written')
    }

    function watch() {
        setShowOutput(false)
        watchModules(['utils'])
        setMessage('Watching file')
    }

    function unwatch() {
        setShowOutput(false)
        unwatchModules(['utils'])
        setMessage('Not watching file')
    }

    useEffect(() => {
         if(!isLoading) {
            run()
        }
    }, [isLoading])

    return (
      <>
        {isLoading ? <p>Loading...</p> : <p>Loaded</p>}
        {isRunning ? <p>Running...</p> : <p>not Running...</p>}
        {/* {run()} */}
        {message && (
        <pre className="mt-4 text-left text-blue-500">
          <code>{message}</code>
        </pre>
        )}
        {showOutput && (
            <pre className="mt-4 text-left">
            <p>Output</p>
            <code>{stdout}</code>
            <p>Error</p>
            <code className="text-red-500">{stderr}</code>
            </pre>
        )}
      </>
    )
  }

export default function Regression({items}) {

    const packages = {
        official: ['scikit-learn', 'pandas', 'numpy'],
        micropip: ['python-cowsay']
    }

    return (
        <PythonProvider packages={packages}>
          <Codeblock packages={packages} items={items}/>
        </PythonProvider>
    )
}
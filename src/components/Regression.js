import { PythonProvider } from 'react-py';
import { useState } from 'react';
import { usePython } from 'react-py';

function Codeblock({packages}) {
    const [input, setInput] = useState('')
  
    // Use the usePython hook to run code and access both stdout and stderr
    const { runPython, stdout, stderr, isLoading, isRunning } = usePython(packages)
  
    return (
      <>
        {isLoading ? <p>Loading...</p> : <p>Ready!</p>}
        <form>
          <textarea
            onChange={(e) => setInput(e.target.value)}
            placeholder="Enter your code here"
          />
          <input
            type="submit"
            value={!isRunning ? 'Run' : 'Running...'}
            disabled={isLoading || isRunning}
            onClick={(e) => {
              e.preventDefault()
              runPython(input)
            }}
          />
        </form>
        <p>Output</p>
        <pre>
          <code>{stdout}</code>
        </pre>
        <p>Error</p>
        <pre>
          <code>{stderr}</code>
        </pre>
      </>
    )
  }

export default function Regression() {

    const packages = {
        official: ['scikit-learn', 'pandas']
      }

    return (
        // Add the provider to your app
        <PythonProvider packages={packages}>
          <Codeblock packages={packages}/>
        </PythonProvider>
    )

}
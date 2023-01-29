import { useState } from 'react';
import { usePython, PythonProvider } from 'react-py';

function Codeblock({packages, items}) {
    const [input, setInput] = useState('print("hellow world")')
  
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

export default function Regression({items}) {

    const packages = {
        official: ['scikit-learn', 'pandas', 'numpy']
    }

    console.log(items)

    return (
        <PythonProvider packages={packages}>
          <Codeblock packages={packages} items={items}/>
        </PythonProvider>
    )
}
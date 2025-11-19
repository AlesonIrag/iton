import { useState } from 'react'
import { db } from '../firebase'
import { ref, set, get } from 'firebase/database'

export default function FirebaseTest() {
  const [status, setStatus] = useState('Not tested')
  const [testData, setTestData] = useState(null)

  const testFirebase = async () => {
    setStatus('Testing...')
    try {
      // Test 1: Write data
      console.log('Test 1: Writing to Firebase...')
      await set(ref(db, 'test/connection'), {
        message: 'Hello Firebase!',
        timestamp: new Date().toISOString()
      })
      console.log('✅ Write successful')

      // Test 2: Read data
      console.log('Test 2: Reading from Firebase...')
      const snapshot = await get(ref(db, 'test/connection'))
      
      if (snapshot.exists()) {
        const data = snapshot.val()
        console.log('✅ Read successful:', data)
        setTestData(data)
        setStatus('✅ Firebase is connected and working!')
      } else {
        console.log('❌ No data found')
        setStatus('❌ Write succeeded but read failed')
      }
    } catch (error) {
      console.error('❌ Firebase test failed:', error)
      setStatus(`❌ Error: ${error.message}`)
    }
  }

  return (
    <div className="fixed bottom-4 right-4 bg-gray-800 p-4 rounded-lg shadow-lg z-50 max-w-sm">
      <h3 className="text-lg font-bold mb-2">Firebase Connection Test</h3>
      <p className="text-sm mb-3">{status}</p>
      {testData && (
        <div className="text-xs bg-gray-700 p-2 rounded mb-3">
          <pre>{JSON.stringify(testData, null, 2)}</pre>
        </div>
      )}
      <button
        onClick={testFirebase}
        className="w-full bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded font-semibold"
      >
        Test Firebase Connection
      </button>
    </div>
  )
}

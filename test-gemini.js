// Simple test script to verify Gemini API connectivity
require('dotenv').config({ path: '.env.local' })
const { GoogleGenerativeAI } = require('@google/generative-ai')

async function testGemini() {
  try {
    console.log('Testing Gemini API connectivity...')
    console.log('API Key exists:', !!process.env.GEMINI_API_KEY)
    
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY)
    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-pro' })
    
    const prompt = "Say hello in Bengali and provide the English translation."
    
    console.log('Sending test prompt...')
    const result = await model.generateContent(prompt)
    const response = await result.response
    const text = response.text()
    
    console.log('✅ Success! Gemini API is working')
    console.log('Response:', text)
    
  } catch (error) {
    console.error('❌ Error testing Gemini API:', error)
    
    if (error.message.includes('API_KEY_INVALID')) {
      console.error('The API key is invalid')
    } else if (error.message.includes('models/gemini-1.5-pro')) {
      console.error('Model gemini-1.5-pro not available, trying fallback...')
      
      // Try fallback model
      try {
        const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY)
        const fallbackModel = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' })
        
        const result = await fallbackModel.generateContent("Hello")
        console.log('✅ Fallback model gemini-1.5-flash works!')
      } catch (fallbackError) {
        console.error('❌ Fallback model also failed:', fallbackError)
      }
    }
  }
}

testGemini()

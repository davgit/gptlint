// Example 10: Creating a user profile from various input forms
interface UserProfileInput {
  name: string
  age: number | string
  email?: string
}

interface UserProfile {
  name: string
  age: number
  email: string
}

function createUserProfile(input: UserProfileInput): UserProfile {
  // Accepts a broader input type but ensures a strict UserProfile output
  return {
    name: input.name,
    age: typeof input.age === 'string' ? parseInt(input.age, 10) : input.age,
    email: input.email || 'N/A' // Provide a default value for optional fields
  }
}

// Generated by gpt-4-0125-preview
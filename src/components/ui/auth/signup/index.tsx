
import { Shield, User } from 'lucide-react';
import { SignupForm } from './SignupForm';
import Container from '@/components/shared/Container/Container';
const Signup = () => {
  return (
    <div className='min-h-screen flex items-center justify-center "'>
      <Container>
      <div className="flex md:flex-row flex-col items-center gap-5 p-5">        
        <SignupForm />
      </div>
      </Container>
    </div>
  )
}

export default Signup
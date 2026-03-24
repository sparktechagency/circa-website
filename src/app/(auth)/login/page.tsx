
import { LoginForm } from '@/components/ui/auth/login/LoginForm';
const page = () => {
  return (
    <div className='min-h-screen flex items-center justify-center "'>
      <div className="flex md:flex-row flex-col items-center gap-5 p-5">        
        <LoginForm />
      </div>
    </div>
  )
}

export default page
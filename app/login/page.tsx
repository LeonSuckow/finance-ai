import { SignInButton } from '@clerk/nextjs'
import { LogInIcon } from 'lucide-react'
import Image from 'next/image'
import { redirectUserLooged } from '../_actions/auth'
import { Button } from '../_components/ui/button'

const LoginPage = async () => {
  redirectUserLooged()

  return (
    <div className="grid h-full grid-cols-2">
      <div className="mx-auto flex h-full w-full max-w-[550px] flex-col justify-center p-8">
        <Image
          src="/logo.svg"
          alt="Logo finance.ai"
          width={173}
          height={39}
          className="mb-8"
        />
        <h1 className="mb-3 text-4xl font-bold">Bem-vindo</h1>
        <p className="text-muted-foreground mb-8">
          A Finance AI é uma plataforma de gestão financeira que utiliza IA para
          monitorar suas movimentações, e oferecer insights personalizados,
          facilitando o controle do seu orçamento.
        </p>
        <SignInButton>
          <Button variant="outline">
            <LogInIcon className="mr-2" />
            Entrar com Google
          </Button>
        </SignInButton>
      </div>
      <div className="relative h-full w-full">
        <Image
          src="/bg-login.png"
          fill
          alt="Login background"
          className="object-cover"
        />
      </div>
    </div>
  )
}

export default LoginPage

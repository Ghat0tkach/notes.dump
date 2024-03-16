import { SignUp} from "@clerk/nextjs"

export default function Page(){
    console.log("hello")
   
    return (
        <SignUp path="/sign-up" routing="path" signInUrl="/sign-in" />
    )
}
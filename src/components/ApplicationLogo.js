import Image from "next/image"

const ApplicationLogo = props => (


    <div className="h-12 w-40 relative">
        <Image alt="Isalam Logo" src={'/isalam-light.png'} sizes={40} priority fill className="object-contain" />
    </div>
)

export default ApplicationLogo

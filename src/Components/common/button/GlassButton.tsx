interface GlassButtonProps {
    text: string | React.ReactElement
    className?: string
    onClick?: (e?: React.MouseEvent) => void
}

const GlassButton = ({text, className,onClick}:GlassButtonProps) => {
    return <button  type="button" onClick={onClick} className={'glassmorphism ' + className}>
        {text}
    </button>
}

export default GlassButton
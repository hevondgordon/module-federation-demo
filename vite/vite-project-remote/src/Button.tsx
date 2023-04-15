interface ButtonProps {
    text: string
}
export default function Button (props: ButtonProps){
    const {
        text
    } = props
    return <button>{text}</button>
}
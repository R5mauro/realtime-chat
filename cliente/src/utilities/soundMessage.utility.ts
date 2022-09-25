import beep from "../assets/newMessage.mp3"

export const soundNewMessage = () => {
    const sound = new Audio(beep)
    sound.play();
}
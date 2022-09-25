
import { FirebaseMessage, Message } from '../../types/types'
import Loader from '../Loader/LoaderMessage'
import MessageComponent from './Message/Message'


interface Props {
    messages: Message[] | FirebaseMessage[]
    type: "principal" | "temporal"
}

const Messages = ({ messages, type }: Props) => {

    return (
        <div className='messages'>
            <div className="messages-content">
                {type === "principal" ? messages.length > 0 ?
                    messages.map((msg: any, index) => (
                        <MessageComponent key={index} msg={msg.content} type={type} />
                    ))
                    : <Loader />
                    : messages.map((msg: any, index) => (
                        <MessageComponent key={index} msg={msg} type={type} />
                    ))

                }
            </div>
        </div>
    )
}

export default Messages
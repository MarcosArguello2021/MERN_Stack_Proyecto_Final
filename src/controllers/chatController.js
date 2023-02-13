import ChatService from '../services/chatServices.js'

const showChatByEmail = async (req, res) => {
    const { email } = req.params

    try {
        const allChatsInfo = await chatService.readChat()
        const chatsEmail = allChatsInfo.filter(data => data.email == email)
        res.render('chatsEmail', { chatsEmail })
    } catch (error) {
        throw new Error('Error al mostrar chat por email', error)
    }
}

module.exports = { showChatByEmail }
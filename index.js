const { Telegraf, Markup } = require('telegraf')
require('dotenv').config()
const text = require('./commands')

const bot = new Telegraf(process.env.BOT_TOKEN)
// bot.start((ctx) => ctx.reply('👉🏼 Para obtener un préstamo, debe seguir uno de los enlaces a continuación y completar un formulario en el sitio. En 5 minutos, el dinero llegará a su tarjeta.'))
// bot.help((ctx) => ctx.reply(text.commands))

bot.start(/*'countries',*/ async (ctx) => {
    try {
        await ctx.replyWithHTML('👉🏼 Seleccionar países:', Markup.inlineKeyboard(
            [
                [Markup.button.callback('🇪🇸ESPAÑA🇪🇸', 'btn_1'), Markup.button.callback('🇲🇽MÉXICO🇲🇽', 'btn_2'),
                 Markup.button.callback('🇨🇴COLOMBIA🇨🇴', 'btn_3'), Markup.button.callback('🇦🇷ARGENTINA🇦🇷', 'btn_4'),
                 Markup.button.callback('🇧🇷BRASIL🇧🇷', 'btn_5')]
            ]
        )).resize()
    } catch (e) {
        console.error(e)
    }
})

function addActionBot(name, text) {
    bot.action(name, async (ctx) => {
        try {
            await ctx.answerCbQuery()
            await ctx.replyWithHTML(text, {
                disable_web_page_preview: true
            })
        } catch (e) {
            console.error(e)
        }
    })
}
addActionBot('btn_1', text.text1)
addActionBot('btn_2', text.text2)
addActionBot('btn_3', text.text3)
addActionBot('btn_4', text.text4)
addActionBot('btn_5', text.text5)

bot.launch()

// Enable graceful stop
process.once('SIGINT', () => bot.stop('SIGINT'))
process.once('SIGTERM', () => bot.stop('SIGTERM'))
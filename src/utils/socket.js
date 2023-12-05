import { showNotify } from '@nutui/nutui'
import store from '../store'
let ws = null
let heartTimer = null

export const sockets = {
    openWs: () => {
        if (ws != null) return
        ws = new WebSocket(`wss://hotbrl.com/common/websocket`)
        ws.onopen = (res) => {
            ws.send(JSON.stringify({
                uuid: store.state.permission.user_infos.uuid
            }))
            sockets.heartCheck()
        }

        ws.onmessage = (res) => {
            showNotify.text(JSON.parse(res.data).content, {
                color: "#fff",
                background: "#A0C4FD",
            });
        }

        ws.onclose = (e) => {
            console.log('WebSocket close！')
        }

        ws.onerror = (err) => {
            sockets.closeWs()
            sockets.reOpen()
        }
    },
    closeWs: () => {
        if (heartTimer != null) {
            clearInterval(heartTimer)
            heartTimer = null
        }
        if (ws) {
            ws.close()
            ws = null
        }
    },
    reOpen: () => {
        sockets.openWs()
    },
    heartCheck: () => {
        heartTimer = setInterval(() => {
            ws.send(JSON.stringify({
                heartbeat: 'heartbeat'
            }))
        }, 30000)
    }
}


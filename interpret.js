#!/usr/bin/env node

// https://i3wm.org/docs/userguide.html#list_of_commands
// https://github.com/rgtk/node-i3wm

//////////////////////////////////////////////
async function action(command, i3) {
  const act = getAction(command)
  if (act) {
    console.log(`> ${act} (${JSON.stringify(command.slots)})`)
    const result = await i3.command(act)
    console.log(`${JSON.stringify(result)}`)
  }
}
function getAction(command) {
  //console.log('> understood ', command.intent)
  switch(command.intent.name) {
    case 'Test': return 'exec firefox https://duckduckgo.com/?t=ffab&q=jusqu%27ici+tout+va+bien&ia=web'
    case 'OpenApp':
      return `exec ${ command.entities[0].value }`
    case 'WinFullscreen':
      return `fullscreen toggle`
    case 'WinClose':
      return `fullscreen toggle`
    case 'WinMove':
      return `move ${ command.entities[0].value }`
    case 'WinFocus':
      return `focus ${ command.entities[0].value }`
    case 'WorkspaceFocus':
      return `workspace ${ command.entities[0].value }`
    case 'TabUp':
      return `exec xdotool key alt+Up`
    case 'TabDown':
      return `exec xdotool key alt+Down`
    case 'TabNext':
      return `exec xdotool key ctrl+Tab`
    case 'TabPrev':
      return `exec xdotool key ctrl+shift+Tab`
  }
}

//////////////////////////////////////////////
function startVoice2Json(cbk) {
  var stdin = process.openStdin();

  var data = "";

  stdin.on('data', function(chunk) {
    try {
      const command = JSON.parse(chunk.toString())
      cbk(command)
    } catch(e) {
      console.error('Exec command error', e)
    }
  });

  stdin.on('end', function() {
    console.log("DATA:\n" + data + "\nEND DATA");
  });
}

//////////////////////////////////////////////
const i3wm = require('i3wm')

async function startI3Client(action) {
  const client = await i3wm.Client.connect()
  startVoice2Json(command => action(command, client))
  
	// client.subscribe('window', 'workspace')
  // client.on('window', async msg => {
  //   if (msg.change === 'focus') {
  //     console.log('Jumping around')
  //   }
  // })
}
startI3Client(action)

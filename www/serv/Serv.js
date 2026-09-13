// import Acts	from "../shared/Acts.js"
import newSS from './newServSend.js'
import on	from "./on.js"

import Gr from '../maps/Ground.js'
import Canopy from '../maps/Trees.js'
import Pl from "../player/Player.js"
import Loc from "../shared/Loc.js"

// import Hands	from "./player/Hands.js"
// import newJR	from "../shared/newJsonRevivr.js"
import JRev from "../JsonRevivr.js"



/**********************************************
 * 
 * The root for handling communication to game server.
 * 
 * Custom methods for receiving and sending are split into
 * on.js and emit.js
 * 
 * Reminder that main communication happens in the format of
 * @typedef {[ fnk ,arg]}	Msg
 * @property {str}	0 -Which method to call in on.js?
 * @property {*}	1 -If there are multiple arguments put
 *   into an array or a dict, the fnk should handle it.
 *
 * **************************************************/



export default newSS( class Server
{
	/** @prop {Client} */
	cl

	/** @return {Console} */
	con()	{ return this.cl.ui.con }

	url	="ws://127.0.0.1:8043"

	/** @prop {WebSocket} */
	ws

	/** @prop {JsonRevivr} */
	jrev	=new JRev()

	/** @prop {Buf} */
	buf	=new Buf( this)


	///////////////////////////////////////////////////////////////////////////



	constructor( client)
	{
		// super()

		this.cl	=client

		this.jrev.add(
		{
			key	:"pl"
			,
			fromJSON	:( val )=> typeof val==="string" ? 

				val	: new Pl.Vis(val,client)
		})
	}


	///////////////////////////////////////////////////////////////////////////


	/**@return {Promise<boolean>} */

	async test()
	{
		return fetch(`http://${this.url}/ping`).then( r =>r.ok).catch( ()=>false)
	}


	/** @arg {{name}} o	 	- whatever is sent to server */

	sendlogin( o)
	{
		try
		{
			this.ws	=new WebSocket(`ws://${this.url}`)
		}
		catch(err)
		{
			this.con().write(`WebSocket error: ${err}`)

			return
		}
		const ws	=this.ws

		ws.binaryType	="arraybuffer"

		ws.onerror	=(ev)=>
		{
			this.con().write(`WebSocket error! ${ev.code}`)

			this.cl.ui.html.ks.login?.reset()
		}
		ws.onopen	=this.sendjson. bind(this, ["login" ,o])

		ws.onmessage	=this.onmsg. bind(this)

		ws.onclose	=(ev)=>
		{
			// console.log(`Connection closed:`,ev)

			this.cl.ui.con.write(

				`Connection closed: ${ev.code} ${ev.reason}`
			)
			this.cl.ui.html.ks.login?.reset()
		}
	}


	/** @todo Get rid of "em_"
	 * Function can return an array: [ val ,replcr]	*/

	send( fn, ...args)
	{
		const res	=this["em_"+fn]( ...args)

		if( res )	this.sendjson([ fn ,res[0]] ,res[1])
	}


	/** Send an Action to the server */

	senda( nav ,actk ,arg)
	{
		this.sendjson([ "act" ,[ nav ,actk ,arg]])
	}


	///////////////////////////////////////////////////////////////////////////////


	/** The most basic sending method.
	 * @arg {*}	msg -The message to send to the server.
	 * @arg {function}	[replcr] -Optional replacer function for JSON.stringify. */

	sendjson( msg, replcr )
	{
		this.ws.send(JSON.stringify( msg, replcr ))
	}


	/** Root receiving method for handling incoming WebSocket messages.
	 * Data can come in two forms: ArrayBuffer or string.
	 * Look inside for more comments info.
	 * @arg {MessageEvent} ev - The WebSocket message event. */

	onmsg( ev )
	{	
		const msg	=ev.data

		// console.log( 'Recvd: '+msg)

		const{ cl }	=this

		/** If msg is binary, at the moment it can only be map data.
		 * So it's sent to a custom class which collects all map data
		 * and sends it further once it's complete. */

		if(msg instanceof ArrayBuffer)
		{
			// debugger

			const code	=Gr.Bin.getcode( msg )

			switch( code )
			{
				case Gr.Bin.code :

				case Gr.MapShiftBo.Bin.code :
			
					this.buf.addbinbuf( msg, code )
			}
		}
		/** If msg is a string, it's expected to be JSON-encoded in
		 * {Msg} format. Just call appropriate method in "on.js"
		 * Also, message is revived first before sent on. */
		 
		else if(typeof msg === 'string')
		{
			const[ act ,arg]	=JSON.parse( ev.data ,this.jrev.fn)

			console.log( act ,arg)

			on[act].call( this ,arg)
		}
	}
})


///////////////////////////////////////////////////////////////////////////////



class Buf
{
	a	=[]

	srv

	
	constructor( srv )
	{
		this.srv	=srv
	}
}


/** @todo Check what's happening with the array. Can it fill up? */

Buf.prototype. addbinbuf	=function( bbuf, code )
{
	var id	=Gr.Bin.getid( bbuf )

	for(var Class of [Gr, Canopy] )
	{
		if( Class.Bin.id === id )	break
	}

	var Bins	=[ Class.Bin, Class.MapShiftBo.Bin ]

	for(var Bin of Bins )
	{
		if( Bin.code === code )	break
	}

	var bin	=new Bin(bbuf)

	var loc	=bin.getloc(new Loc())

	var r	=bin.get("r")

	var dir	=code === Bins[1].code ? bin.get("dir") : -1

	for(var i=0,len= this.a.length ;i<len;i++)
	{
		var buf	=this.a[i]

		if( loc.eq(buf.loc) && r === buf.r && dir === buf.dir )
		{
			buf[Class.name]	=bin

			return this.iscomplete( i, buf )
		}
	}
	this.a.push({ loc, r, dir, [Class.name] : bin })
}



Buf.prototype. addobj	=function( obj, loc, r, dir )
{
	dir	??=-1

	for(var i=0,len= this.a.length ;i<len;i++)
	{
		var buf	=this.a[i]

		if( loc.eq(buf.loc) && r === buf.r && dir === buf.dir )
		{
			buf.obj	=obj

			return this.iscomplete( i, buf )
		}
	}
	this.a.push({ loc, r, dir, obj })
}



Buf.prototype. iscomplete	=function( i, buf )
{
	// const{ cl }	=this.srv

	if( buf.Gr && buf.Tr && buf.obj )
	{
		if( buf.dir >= 0 )
		{
			this.srv.cl.shiftmap( buf.dir ,[ buf.Gr ,buf.obj.gr ,buf.Tr ,buf.obj.tr ])
		}
		else
		{
			this.srv.cl.setmaps( buf.Gr ,buf.obj.gr ,buf.Tr ,buf.obj.tr )
		}
		this.a.splice( i, 1 )
	}
}


///////////////////////////////////////////////////////////////////////////////



function ofore( o, fun )
{
	for(var key in o )	fun(o[key])

	return o
}
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
 * @property {str}	0 -Which method to call in on.js
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
	buf	=new InBufAss( this)


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


/** Input Buffer for single map data transfer.
 * @typedef {Object} InBuf
 * @property {Loc} loc
 * @property {number} r
 * @property {number} dir	--1 if not directional map
 * @property {Gr.Bin} Gr
 * @property {Canopy.Bin} Canopy
 * @property {Object} obj	-Cell data object */


/** Input Buffer Assembler.
 * This class knows how to collect map data and determine when it's complete. */

class InBufAss
{
	/** @type {InBuf[]} */
	inbufs	=[]

	srv


	static InBuf	=class
	{
		loc	=null
		r	=0
		dir	=-1
		gr	=null
		tr	=null
		obj	=null

		constructor( loc ,r ,dir)
		{
			Object.assign( this, { loc ,r ,dir })
		}

		ismatch( loc ,r ,dir)
		{
			return this.loc.eq( loc) && this.r === r && this.dir === dir
		}

		iscomplete()
		{
			return this.gr && this.tr && this.obj
		}
	}
	static maptps	=new Map([
		[Gr ,"gr"],
		[Canopy ,"tr"]
	])

	
	constructor( srv )
	{
		this.srv	=srv
	}


	/**
	 * @arg bbuf	-The full binary buffer.
	 * @arg code	-Is given because it's already calculated by the caller. 
	 * @todo Check what's happening with the array. Can it fill up? */

	addbinbuf( bbuf, code )
	{
		const id	=Gr.Bin.getid( bbuf)

		const{ maptps ,InBuf }	=this.constructor

		for( var[ MapTp ,mapkey] of maptps)
		{
			if( MapTp.Bin.id === id)	break
		}
		const Bins	=[ MapTp.Bin ,MapTp.MapShiftBo.Bin]

		for( var Bin of Bins)
		{
			if( Bin.code === code)	break
		}
		const bin	=new Bin( bbuf)

		const loc	=bin.getloc( new Loc())

		const r	=bin.get( "r")

		const dir	=code === Bins[1].code	? bin.get("dir")	: -1

		for(var i=0,len= this.inbufs.length ;i<len;i++)
		{
			const inbuf	=this.inbufs[i]

			if( inbuf.ismatch( loc ,r ,dir))
			{
				inbuf[mapkey]	=bin

				return this.iscomplete( i ,inbuf)
			}
		}
		const inbuf	=new InBuf( loc ,r ,dir)
		
		inbuf[mapkey]	=bin

		this.inbufs.push( inbuf)
	}



	addobj( obj ,loc ,r ,dir)
	{
		dir	??=-1

		for(var i=0,len= this.inbufs.length ;i<len;i++)
		{
			const inbuf	=this.inbufs[i]

			if( inbuf.ismatch( loc ,r ,dir))
			{
				inbuf.obj	=obj

				return this.iscomplete( i ,inbuf)
			}
		}
		const inbuf	=new this.constructor.InBuf( loc ,r ,dir)

		inbuf.obj	=obj

		this.inbufs.push( inbuf)
	}



	iscomplete( i, inbuf)
	{
		// const{ cl }	=this.srv

		if( inbuf.iscomplete())
		{
			if( inbuf.dir >= 0 )
			{
				this.srv.cl.shiftmap( inbuf.dir ,[ inbuf.gr ,inbuf.obj.gr ,inbuf.tr ,inbuf.obj.tr])
			}
			else
			{
				this.srv.cl.setmaps( inbuf.gr ,inbuf.obj.gr ,inbuf.tr ,inbuf.obj.tr)
			}
			this.inbufs.splice( i, 1 )
		}
	}
}


///////////////////////////////////////////////////////////////////////////////



function ofore( o, fun )
{
	for(var key in o )	fun(o[key])

	return o
}
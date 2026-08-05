import newClS	from "./newClientSend.js"

import V from '../../www/shared/Vec.js'

import on from './newClientGet.js'

import MapG	from "../maps/Ground.js"

import JRev from '../JsonRevivr.js'




export default class Client extends newClS()
{
	ws

	pl

	srv

	get game()	{return this.ggame() }

	ggame()	{return this.srv.game }

	tc	=new Timecode( MapG.Bin.timecodelen )

	rtcstate	=new Map()
	// 1:	master
	// 2:	slave
	// BDSM

	
	static jrev	=new JRev()



	constructor(ws, pl, srv )
	{
		super()

		Object.assign(this,{ srv, ws, pl })

		if( pl && ws )
		{
			let cl	=this

			pl.cl	=cl

			cl.send("setclpl")

			cl.send("setmap")

			srv.sendplvis( pl ,"plconn" ,pl ,true )
		}
		ws.removeAllListeners( 'message' )

		ws.on( 'message', this.onmsg. bind(this))

		ws.on('close', this.onclose. bind(this))

		// this.jsonrev	=json.newrevivr()
	}



	///////////////////////////////////////////////////////////////////////////



	send( fnk, ...args )
	{
		const fun	=this["em_"+fnk]

		const res	=fun.apply( this, args )

		if( res )	this.sendjson([ fnk, res[0] ], res[1] )
	}



	sendactyes( id ,args )
	{
		this.sendjson( args ?[ "actyes" ,id ,args ] :[ "actyes" ,id ])
	}

	sendactrej( id ,arg )
	{
		this.sendjson( arg ?[ "actrej" ,id ,arg ] :[ "actrej" ,id ])
	}


///////////////////////////////////////////////////////////////////////////////


	/** @todo Can shorten comm by responding with "act" code instead of
	 * entire action. Obviously needs unique code implementation at client. */

	onmsg( data, isbin )
	{
		console.log(`${this.pl.name}: WS msg: ${data.toString()}`)

		const[ act ,arg ]	=JSON.parse( data.toString(), this.constructor.jrev.fn )

		const fun	=on[act]

		if( fun )	fun.call( this, arg )

		else
		{
			console.error( `${this.pl.name} Msg: not found: ${act}`)
		}
	}



	onclose( code, reason /*, wsclosed =false*/ )
	{
		var pl	=this.pl

		console.log( `Client ${pl.name} disconnected: code=${code}, reason=${reason}.` )

		this.srv.cls.del( pl.name )

		pl.cl	=null

		this.srv.sendplvis( pl ,"plconn" ,[ pl, false ])

		for(var cl2 of this.rtcstate)
		{
			cl2.rtcstate.delete(this)
		}
	}


	///////////////////////////////////////////////////////////////////////////////


	sendjson( o, replcr )
	{
		this.ws.send( JSON.stringify( o, replcr ) )
	}

	sendbin( buf )
	{
		this.ws.send( buf, {binary: true})
	}


	///////////////////////////////////////////////////////////////////////////////



	toJSON()
	{
		return 1
	}



/*
Client.prototype. onsucclogin	=function( pl, isnew )
{
	var cl	=this

	pl.cl	=cl
	
	cl.pl	=pl
	
	cl.s.setpl( pl )
	
	cl.s.map()
	
	cl.s.units()

	pl.forisseencls(( cl2 )=>
	{
		if( isnew )	cl2.s.newpl( pl )

		else	cl2.s.plconn( pl.name, true )
	})
}
*/
}

///////////////////////////////////////////////////////////////////////////////


class Timecode
{
	val	=0

	bits

	
	constructor( bits )
	{
		this.bits	=bits
	}
}


Timecode.prototype. next	=function()
{
	var val	=this.val + 1

	if( val >> this.bits )	val	=1

	this.val	=val

	return val
}
import newClS	from "./newClientSend.js"

import V from '../../www/game/shared/Vec.js'

import newClG from './newClientGet.js'

import MapG	from "../maps/Ground.js"

import JRev from '../JsonRevivr.js'




export default class Client extends newClG( newClS() )
{
	ws

	pl

	srv

	get game()	{ return this.srv.game }

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
			pl.conncl( this )
		}

		ws.removeAllListeners( 'message' )

		ws.on( 'message', this.onmsg. bind(this))

		ws.on('close', this.onclose. bind(this))

		// this.jsonrev	=json.newrevivr()
	}



	///////////////////////////////////////////////////////////////////////////



	send( fnk, ...args )
	{
		var methk	="em_"+fnk

		/** @todo remove in production */
		if( ! this[methk] )
		{
			console.error( `Client.${fnk} doesn't exist` )

			return
		}
		var[ outa, rep ]	=this[methk]( ...args )

		if( outa )	this.sendjson([ fnk, outa ], rep )
	}


///////////////////////////////////////////////////////////////////////////////



	onmsg( data, isbin )
	{
		console.log(`${this.pl.name}: WS msg: ${data.toString()}`)

		var[ act, args ]	=JSON.parse( data.toString(), this.constructor.jrev.fn )

		this["on_"+act]?.( ...args )

		// this["on_"+act]?.(...args)
		
		// console.error( `Client Msg: not found: ${prop}`)
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
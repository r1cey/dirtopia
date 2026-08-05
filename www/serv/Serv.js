// import Acts	from "../shared/Acts.js"
import newSS from './newServSend.js'
import on	from "./newServGet.js"

import Gr from '../maps/Ground.js'
import Tr from '../maps/Trees.js'
import Pl from "../player/Player.js"
import Loc from "../shared/Loc.js"

// import Hands	from "./player/Hands.js"
import JRev from "../JsonRevivr.js"

import Acts	from "./Acts.js"


///////////////////////////////////////////////////////////////////////////////



export default newSS( class Server
{
	cl

	con()	{ return this.cl.ui.con }

	url	="ws://127.0.0.1:8043"

	ws

	jrev	//json reviver

	buf	=new Buf(this)

	acts	=new Acts( this )



	constructor(client)
	{
		// super()

		this.cl	=client

		this.jrev	=new JRev().add(
			{
				key	:"pl"
				,
				fromJSON	:( val )=> typeof val==="string" ? 

					val	: new Pl.Vis(val,client)
			}
		)
		this.jrev.root	=( key ,val )=>
		{
			if( val?.pl && typeof val.pl === "string" )
			{
				client.maps.jsonlocs.pl[val.pl]	=new Loc().setvstr( key ,0 )
			}
		}
	}


///////////////////////////////////////////////////////////////////////////////



	test()
	{

	}


	/** @arg	o	- whatever is sent to server */

	sendlogin( o )
	{
		try
		{
			this.ws	=new WebSocket(this.url)
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
		ws.onopen	=this.sendjson. bind(this, o )

		ws.onmessage	=this.onmsg. bind(this)

		ws.onclose	=(ev)=>
		{
			// console.log(`Connection closed:`,ev)

			this.cl.ui.con.write
				(`Connection closed: ${ev.code} ${ev.reason}`)
			
			this.cl.ui.html.ks.login?.reset()
		}
	}



	send( fn, ...args )
	{
		const res	=this["em_"+fn]( ...args )

		if( res )	this.sendjson([ fn, res[0] ], res[1] )
	}


	senda( nav ,actk ,...args )
	{
		const id	=this.acts.add([ nav ,actk ,...args ])

		this.sendjson([ "act" ,[ id ,nav ,actk ,args ]])
	}


	///////////////////////////////////////////////////////////////////////////////



	sendjson( o, replcr )
	{
		this.ws.send(JSON.stringify( o, replcr ))
	}



	onmsg( ev )
	{	
		let msg	=ev.data

		// console.log( 'Recvd: '+msg)

		var cl	=this.cl

		if(msg instanceof ArrayBuffer)
		{
			// debugger

			let code	=Gr.Bin.getcode( msg )

			switch( code )
			{
				case Gr.Bin.code :

				case Gr.MapShiftBo.Bin.code :
			
					this.buf.addbinbuf( msg, code )
			}
		}
		else if(typeof msg === 'string')
		{
			const[ act, ...args ]	=JSON.parse(ev.data, this.jrev.fn )

			on[act].apply( this, args )

			console.log( act ,...args )
		}
	}
})

	///////////////////////////////////////////////////////////////////////////////




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



Buf.prototype. addbinbuf	=function( bbuf, code )
{
	var id	=Gr.Bin.getid( bbuf )

	for(var Class of [Gr, Tr] )
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
			this.srv.cl.movclpl( buf.dir ,[ buf.Gr ,buf.obj.gr ,buf.Tr ,buf.obj.tr ])
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
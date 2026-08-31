import { WebSocketServer, WebSocket } from "ws"
// import * as fs from './Files.js'
// import Col from '../www/shared/Color.js'
// import Vec from '../www/shared/Vec.js'
// import Player from './Player.js'
import Cls from "./Clients.js"
import out from './newServSend.js'

import newJRev from "../../www/shared/newJsonRevivr.js"
import JRev	from "../JsonRevivr.js"


/** WebSocket based communication.
 * Add client to this.cls only after full login. */

export default class Server
{
	game

	conf	=
	{
		port	:8043
		,
		maxcls	:1000
	}

	wss

	cls	=new Cls(this)

	// g	=new Get(this)

	// send	=new Send(this)

	static out	=out //new ServSend()

	static jrev	=new (newJRev(JRev))()


	constructor( game ,port)
	{
		// super()

		this.game	=game

		// this.start(port)
	}


	toJSON()	{return undefined }


	///////////////////////////////////////////////////////////////////////////



	start( port)
	{	
		if( port)	this.conf.port	=port

		const srv	=this
		
		srv.wss	=new WebSocketServer(
			{
				port :this.conf.port
				,
				clientTracking :false
				,
				maxPayload :1024 *10
			})
		srv.wss.on( 'connection' ,srv.onconn .bind( srv))
		
		console.log(`WS server started on ${this.conf.port} port...`)
	}



	stop()
	{
		console.log(`Server shutting down.`)

		for(const cl of this.wss.clients)
		{
			cl.close( 4801)
		}
		this.wss.close()
	}


	///////////////////////////////////////////////////////////////////////////////



	send( fnk ,...args)
	{
		// Server.out[fnk]. apply(this, args )

		this["em_"+fnk]( ...args )
	}



	sendvis( loc ,funk ,arg ,replcr)
	{
		const dict	=this.cls.o

		for(var n in dict )
		{
			var cl	=dict[n]

			if( cl.pl.sees(loc) )
			{
				cl.send( funk ,arg ,replcr )
			}
		}
	}


	sendplvis( pl ,fnk ,...args)
	{
		var dict	=this.cls.o

		for(var n in dict )
		{
			var cl	=dict[n]

			if( cl.pl.seespl(pl) )
			{
				cl.send( fnk ,...args )
			}
		}
	}

	sendvis2( loc1, loc2 ,fnk ,arg)
	{
		var dict	=this.cls.o

		for(var n in dict )
		{
			var cl	=dict[n]

			if( cl.pl.sees(loc1) || cl.pl.sees(loc2) )
			{
				cl.send( fnk ,arg )
			}
		}
	}

	sendplvis2( loc1 ,loc2 ,pl ,fnk ,arg)
	{
		const dict	=this.cls.o

		for(var n in dict )
		{
			var cl	=dict[n]

			var pl2	=cl.pl

			if( pl2 !== pl &&( pl2.sees(loc1) || pl2.sees(loc2) ))
			{
				cl.send( fnk ,arg )
			}
		}
	}

	sendplvis3( loc1 ,loc2 ,loc3 ,pl ,fnk ,arg)
	{
		const dict	=this.cls.o

		for(var n in dict )
		{
			var cl	=dict[n]

			var pl2	=cl.pl

			if( pl2 !== pl &&( pl2.sees(loc1) || pl2.sees(loc2) || pl2.sees(loc3) ))
			{
				cl.send( fnk ,arg )
			}
		}
	}


	senditemmoved( from ,item ,to ,mover)
	{
		var cls	=new Set()

		var dict	=this.cls.o

		for(var n in dict )
		{
			var cl	=dict[n]

			var pl	=cl.pl

			if( pl.seesnavf( from ))	cls.add(cl)

			if( pl.seesnavf( to ))	cls.add( cl )
		}
		for(var cl of cls )
		{
			cl.send("itemmoved" ,[ from ,item ,len ,to ,mover ])
		}
	}


	///////////////////////////////////////////////////////////////////////////


	/** Fires on new WebSocket connection request. */

	onconn( ws ,req)
	{
		// 1. DOS PROTECTION: Attach Auth Timeout
  		// If the client does not complete auth within 5 seconds,
		// drop the connection.
		const connTimeout	=

		const ip	=req.socket.remoteAddress

		console.log( `Client connected from ${ip}`)

		const g	=this.game

	/*	if(this.wss.clients.size > this.conf.maxcls)
		{
			console.error( 'Too many clients!')

			ws.close( 4808 )

			return
		}*/
		const conn	=
			{
				ws	:ws
				,
				ip	:ip
				,
				isAlive	:true
				,
				timeoutid	:0
			}
		ws.on( 'message' ,this.onmsg .bind(this ,ws ,ip))

		ws.on( 'error' ,console.warn)

		ws.on( 'close' ,( code ,reason)=>
		{
			console.log(`Client ${ip} disconnected: code-${code}, reason-${reason}.`)
		})
	}


	///////////////////////////////////////////////////////////////////////////


	/** Server handles messages here until player fully logs in. Then the
	 * new created Client instance takes over.
	 * So far the only messages have [action ,arg] structure.
	 * 
	 * @todo Add trying to read player data if player isn't found and
	 * before requesting to create a new one. */

	onmsg( ws, ip, data, isbin)
	{
		const str	=data.toString()

		console.log(`Srv msg from ${ip}: ${str}`)

		try
		{
			var msg	=JSON.parse( str ,this.constructor.jrev.fn)
		}
		catch( err)
		{
			return
		}
		if( !( Array.isArray( msg) &&msg.length >1))
		{
			ws.close( 1678 ,'Invalid message format.')

			return
		}
		switch( msg[0])
		{
			case "login":

				const pln	=msg[1].name

				if(	this.cls.o[pln])
				{
					ws.close( 4123, 'Player already connected!' )

					return
				}
				let pl	=this.game.pls.g( pln)

				if( pl)
				{
					console.log("Connecting player: " +pln)

					this.cls.new( ws ,pl)
				}
				else if( this.game.pls.rem() <=0)
				{
					console.log("Too many players on server :(")

					ws.close( 4124 ,"Too many players on server :(")
				}
				else
				{
					console.log(`No ${pln} player found. Create new.`)

					ws.send( `["createpl","${pln}"]`)
				}
			break
			case "createpl":

				const plmsg	=msg[1]
		
				this.cls.new( ws ,this.game.pls.new( plmsg))
		}
	}


///////////////////////////////////////////////////////////////////////////////





///////////////////////////////////////////////////////////////////////////////





///////////////////////////////////////////////////////////////////////////////



/*Server.prototype. clclose	=function( cl )
{
	var pl	=this.game.disconpl( cl.loc )

	var i	=this.getcli( pl.name )

	this.cls.splice( i, 1 )

	return pl
}*/


///////////////////////////////////////////////////////////////////////////////


/*

Server. json	=function( data, ip )
{
	var str	=data.toString()

	console.log(`${ip}: ${str}`)

	return JSON.parse( str, function( key, value )
		{
			switch(key)
			{
				case 'col':

					return new Col().setj( value )
				break;
				case 'loc':

					return new Vec().setj( value )
				break;
			}
			return value
		})
}




Server.prototype. remcls	=function()
{
	return this.conf.maxpls - this.wss.clients.size
}

Server.prototype. getcli	=function( name )
{
	var glb	=this.game

	for(var i=0; i<this.cls.length; i++ )
	{
		if( glb.getpl(cl.loc).name === name )
		{
			return i
		}
	}
}

Server.prototype. getcl	=function( name )
{
	return this.cls[this.getcli(name) ]
}


Server.prototype. ismaxips	=function( ip )
{
	return this.ips[ip] >= this.conf.maxips
}
Server.prototype. addip	=function( ip )
{
	var ips	=this.ips

	ips[ip]	??= 0

	ips[ip] ++
}
Server.prototype. delip	=function( ip )
{
	var ips	=this.ips

	ips[ip] --

	if( ips[ip] <= 0 )	delete ips[ip]
}
/*
	var errs	=srv.g.errs

	let connid	=srv.cls.length

	if( connid >= srv.conf.maxcls )
	{
		let err	=808

		ws.close(err, errs[err])
		
		console.log( errs[err], srv.conf.maxcls )
		
		return
	}

	let ip	=req.socket.remoteAddress

	if( srv.ismaxips( ip ) )
	{
		let err	=809

		ws.close(err, errs[err])

		console.log(errs[err], ip)

		return
	}
	
	srv.addip( ip )

	srv.cls.push(new Client(ws, connid, ip , this))

	console.log( `New client added at ${connid} id.`)
}
*/
/*
Server.prototype. delcl	=function( id )
{
	var srv	=this

	var{ cls }	=srv

	var cl	=cls[id]

	var cllast	=cls.pop()

	if( cllast !== cl )
	{
		cls[id]	=cllast

		cllast.setevs(srv, id)
	}

	srv.delip( cl.ip )
}

Server.prototype. clclose	=function( id, code, reason )
{
	var srv	=this
	
	var cl	=srv.cls[id]

	cl.ws.removeAllListeners( 'close' )

	srv.delcl( id )

	if( code != 8001 )
	{
		if( code < 4000)	code += 4000 

		cl.ws.close(code, reason)
	}

	if( cl.pln )
	{
		let pln	=cl.pln

		let pl	=srv.g.pls[pln]

		pl.cl	=0

		srv.forseencls( pln, (cl2id)=>
		{
			srv.s.plconn( cl2id, pln, false )
		})

		let pl2n, cl2

		for( pl2n in cl.rtcstate )
		{
			cl2	=srv.cls[srv.g.pls[pl2n].cl-1]

			if( !cl2 )	console.error(`Player ${pl2n} should have a client!`)

			delete cl2.rtcstate[cl.pln]
		}
	}
}

Server.prototype. onmsg	=function( clid, data, isbin )
{
	var str	=data.toString()

	console.log(`${this.idstr(clid)}: WS msg: ${str}`)

	var msg	=JSON.parse( str )

	var acts	=this.g.acts

	for(var prop in msg )
	{
		if( acts[prop] )
		{
			acts[prop]( clid.pln, this.g.pls.g[clid.plid], msg[prop] )

			return
		}
	}
	console.error( `Action not found!!!`)
}

Server.prototype. forseencls	=function( pln )
{
	var pls	=this.g.pls

	var pl	=pls[pln]

	var pl2

	this.forcls(( cl2id, cl2 )=>
	{
		pl2	=pls[cl2.pln]

		if( pl2.seespl( pl ) )
		{
			fun( cl2id, pl2, pln, pl )
		}
	})
}
*
Server.prototype. succlogin	=function( pl, ws, ip )
{
	var cl	=this.cls[clid]

	var pl	=this.g.pls[pln]

	pl.cl	=clid+1
	
	cl.pln	=pln



	pl.cl	=ws

	ws.removeAllListeners( 'msg' )
	ws.removeAllListeners( 'close' )
	ws.on('msg', )

	g.srv_send_setpl( pl )

	g.pl_cl_setpl(pl)
	
	pl.cl_setpl()

	pl.cl_map()

	pl.cl_units()



	this.game.maps.forseen( pl.loc, (pl ))

	this.forseencls(( cl2id )=>
	{
		if( isnew )	this.s.newpl( cl2id, pln, pl )

		else	this.s.plconn( cl2id, pln, true )
	})
}
/*
Server.prototype. plmoving	=function( pln, newloc, pl )
{
	var srv	=this

	var pl2

	srv.fore(( pl2n, pl2 )=>
	{
		if( pl === pl2 )	return

		seesoldloc	=pl2.sees(pl.loc)

		if( pl2.sees(newloc) || seesoldloc)
		{
			srv.s.plmov( pl2n, pln, newloc, seesoldloc , pl )
		}
	}
	, true)
}
*/
}

///////////////////////////////////////////////////////////////////////////////